# ADD - Race Conditions

### Vocabulary
* Distinction between "whole business process" and "update" 
  * Business process is understood as all the operations performed on domain object since it retrieval until persisting it back to the database - which might contain interactions with other systems, i/o operations etc.
  * Update is used to describe process of persisting changed domain object back to database after going through whole buisness process 

## Problem Statement

The betting domain enforces constraints on how we mutate our database:

### Core Requirements
* **Atomicity**: Placing the bet or any other financial operation has to be Atomic
  * Therefore, placing the bet fails or passes - no in between like account balance was changed, but bet was not placed
* **Data Freshness**: Placing the bet or any other financial operation cannot be made based on stale data
* **Security**: As both mobile and web applications can be a subject of tampering by malicious actors, guarantees when it comes to preventing race conditions must be provided by backend

## Race Condition Analysis

### The Problem
There is always space for race conditions between database read, operations being performed on domain/database model and database write and transactions does not solve it by default. For example - we might handle two identical requests concurrently in two separate transactions which may be an attempt by malicious actor to double spend. Similar problems will affect founds deposits and withdrawals. Online hazard sites are obvious and often exploited targets for malicious actors, therefore precations have to be made upfront. 

Ref: [A Race to the Bottom - Database Transactions Undermining Your AppSec](https://blog.doyensec.com/2024/07/11/database-race-conditions.html)

### Race Condition Scenario
So, without any precautions there is space for situation: 
* Request A reads account balance 1000$ (before bet A or B was placed/commited and balance updated)
* Request B reads account balance 1000$ (before bet A or B was placed/commited and balance updated)
* Request A decides that bet of 1000$ can be placed as account balance is sufficient
* Request B decides that bet of 1000$ can be placed as account balance is sufficient
* A commits update creating new bet (A) and updating account balance to 0$.
* B also (!) commits update creating new bet (B) and updating account balance to 0$ based on at this point stale data read previously from the database.
* User just placed bets worth 2000\$ while spending only 1000\$ from his account

The same goes for withdrawal, deposits, bets - or any combination of thereof. 

## Possibile safeguards 

### (not relevant) Idempotency key

As typically it is provided by client - it cannot be relied upon, as it can be spoofed by malicious actor. So, for our stated problem it is useless. 

### (not relevant) Idempotent requests 

If we can make assumption, that there can be only one bet on one game per user, we can utilize PUT http method and make bet endpoint idempotent and returning existing bet, if i.e. combination of customer uuid and game uuid, are found in bets table. But it is in fact not relevant, as this safeguard still depends on how we isolate concurrent database transactions underneath/do we use locking/if whole process is enclosed in transaction or only persisting changes etc. So, nice to have, but it has to be built on top of actual solution to stated problem. 

### (not relevant) Balance constraints on database level

We can put constraint enforcing non-negative balance on database level, which can prevent overdraft. But on its own, it does not solve problem of double spending within balance. 

### (relevant) the highest transaction isolation level for financial operations - serializable

What database is per spec required to do on SERIALIZABLE transaction isolation level, is to produce the same effect as if concurrent transactions was executed serially - one after another to completion. 

Which, solves our problem IF WE CAN GUARANTEE that all relevant reads and writes are in fact enclosed in the same transaction. Otherwise, update might be based on the stale data provided from outside transaction and our problem persists. 

But, as there is no free lunches, SERIALIZABLE transaction effectively introduce locks underneath which introduce heavy performance overhead (establishing multiple locks, waiting queries), additional complexity (serialization conflicts needs to be resolved).

It leads to the architectural problem, as if our business proces is complex and hits i.e. other services, ours or vendor (I recall that at least one country in EU that has regulations requiring checking public api for gamblers that are banned from engaging with online hazard), we get a long-running SERIALIZABLE transaction. Which compounds problems related to both. 

### (relevant) atomic updates

In our case, atomic update (either single statement or single transaction enclosing multiple statements) can be archived:  
* by using SERIALIZABLE transaction that contains both relevant reads and writes. (heaviest performance overhead, both reads and writes have to be enclosed in one transaction, safety guarantees depend on the convention)
* by using pessimistic locking inside transaction (lower performance overhead, but notorious source of db deadlocks, both reads and writes have to be enclosed in one transaction, safety guarantees depend on the competence of developer not convention)
* by using optimistic locking, which means check before update if data in database was modified using i.e. version field. (low performance overhead, no risk of deadlocks, no requirement that whole process have to be fit into one transaction, safety guarantees depend on the competence of developer not convention)

### (relevant) pessimistic locking 

You acquire exclusive lock for the both reads and writes for the relevant fields at the start of the transaction. If other transaction tries to do the same (for same fields in the same order) it will fail. If other transaction tries to do the same (same fields in different order) you get the deadlock. Requires manual management - which is error-prone and hard to test and in practice is a lightweight replacement for SERIALIZABLE isolation level. 

### (relevant) optimistic locking 

It is not a lock. It is a check if underlying data changed in the meantime using timestamp, version field or similar. Can be solid safeguard that do not require whole business process to be enclosed in single transaction - only final update. Which prevents problems with long-running transactions and does not require SERIALIZABLE isolation level as long operation is atomic. 

## Solution

### Assumptions
* We do solve stated problem of possibility of multiple concurrent requests in context of ONE CUSTOMER. 
* If in doubt fail - when it comes to financial operations, not doing potentially wrong thing, and allowing customer service to handle potential problems manually is much safer than alternatives - we do not consider retries
* We do want to keep our business logic in the code and avoid moving it to the database, which makes it harder to test, iterate over and maintain. 
* We do not want to be limited when it comes to how complex logic will be run before any financial operation - which might i.e. require external api call 
  * This means, that we *do not* want to enclose whole business process in transaction
    * As this have potential to create long-running transactions
      * any transaction open for the duration of external http call can be considered long-running  
      * long-running transactions + pessimistic locking or SERIALIZABLE transactions = exponentially more problems to deal with
  * This means, that we want to run only final update in transaction - not whole business process preceding it
    * This means, that we need a way to ensure our update is not based on stale data
      * This means, that optimistic locking is a way to go 
        * But, as i.e. placing a bet requires multiple write operations (i.e. adding a bet, updating account balance, adding an audit trail?) update itself still needs to be atomic 
          * So:
            * final update wrapped in transaction to preserve atomicity of operation 
            * optimistic locking to prevent updates based on a stale data 
            * random uuid as version - as integer ids create additional edge cases
            * business process do not have to be wrapped in transaction
            * default isolation level (read commited) should be sufficient considering we depend on version field, which produces result similar to SERIALIZABLE transactions. 

Example illustrating concept
```sql
BEGIN; --- isolation level read-commited, pgsql default
  UPDATE accounts 
  SET balance = $updated_balance, version = $new_version_uuid
  WHERE id = $1 AND version_uuid = $expected_version_uuid;
  
  -- Check if exactly 1 row was updated
  IF ROW_COUNT() = 1 THEN
    INSERT INTO bets (account_id, game_id, amount, ...);
    COMMIT;
  ELSE
    ROLLBACK; -- Either insufficient funds or version mismatch
  END IF;
```
