# Gaps in specification

## Technical/Architectural concerns
* Specification mentions "minimal backend", but other communication suggests production-grade code
  * Minimal would assume using simplest possibile structure with business logic enclosed in nest services, validation and database constraints
    * It would allow to keep all sensitive operations atomic, without concern about maintainability of this code
  * Production grade, would assume unit-testable separate domain layer, potentially CQRS to enforce gathering of proper audit trails
    * It requires careful consideration, how chosen architecture affects other requirements - like security, performance and keeping business processes out of database as explained in [ADD-race-conditions.md](ADD-race-conditions.md)  
* Should project take into account and handle odds api credits/rate limits?
  * I assume no
* Should project include a way to manage i.e. accounts, account balances
  * I will assume no - command creating fixtures is enough ATM
* Should project include proper logging?
  * Proper logging means more-or-less RFC compliant JSON logs with authentication, business and correlation context - which is complex task on its own 
  * Basic logging means winston configured to spew JSON logs as they are 
* Should project include proper configuration management? 
  * Proper, means with full validation, transparent when it comes to source to the business/infra code 
  * Basic, means directly accessing env variables or simplistic use of NestJS default configuration module.  

## Security
* It seems to be implied, that `bets` service should also handle customer account and balance
    * If so, I will also assume, that user management (not to be confused with consumer management), authentication/authorization is out of scope for the project
* Should project take precautions, when it comes to concurrency management?
    * Yes, I assume it is in scope - even demo project should not allow for double-spend, withdraw-and-spend etc. vulnerabilities
* No requirements when it comes to simulated outcome randomness 
  * Not a code run in prod, therefore pseudo-randomness is not a problem 

## Domain concerns 
* I would assume that, customer can put only one bet per event 
  * As long there is not compound bets in the scope
* How we should determine, which odds are authoritative when they are provided from multiple sources/bookmakers?
    * Differences between bookmakers are vast and cannot be explained only by time since last update
        * Should we take the latest known odds regardless of bookmaker?
        * Should we stick to odds provided by chosen bookmaker when registering an event?
        * Are our trust to bookmakers should be based on whitelist and weighted, or we do not care? 
* What markets (bet type) should be supported?
    * I will assume only h2h for now
* Does supported markets include outrights?
    * I will assume not at this time
* Should project take into account possibility of implementing compound bets? (i.e. bet for particular team winning next two games in tournament)
    * It influences how we express constraints i.e. limiting customer to one bet per event.
        * I assume it is out of scope
* Should project suport live bets? Or only pre-event bets?
    * I assume the latter - so live betting during event is out of scope
        * Odds source seems to depend on what was scraped, fetched from api on unclear schedule
            * It does not seem like reliable source of odds during live events
* How should project handle suspended or voided bets?
    * i.e. game was canceled or postponed
      * Cancel and issue a refound?
      * I will assume that is out of scope
* What currencies (or only one?) should be supported?
    * In case of multiple currencies, do customer is limited to one or can maintain multiple balances?
    * I will assume, one currency
* Should we take into account currency exchange risks?
    * If target market is Africa - with unstable currencies, it might be an important factor
    * If using crypto for betting is a possibility - it might be a requirement for risk management
    * Problem might be solvable by adjusting Vig/Juice?
      * but probably should be taken into account in reporting at some point
    * I assume it is out of scope
* PRD mentions limits, bot does not elaborate 
  * Does it mean bet size limits?
  * Per customer limits? (individual limits different for i.e. whales vs rank-and-file customers?)
  * Legal limits per regulation environment? 
    * Would imply, that we in some way gather and have at hand information about customer residence
      * For now out of scope 
* Fee structure 
  * I assume it is out of scope
* Taxation of winnings 
  * I assume it is out of scope 
* Handling of promotions/sign in bonuses etc.
  * Out of scope
    * Have many security considerations to take into account 

## Legal/compliance concerns (assumed out of scope)
* AML, KYC compliance
* Data privacy requirements (GDPR, etc.)
* Gambling regulations compliance
* Age verification requirements
* Responsible gambling features
* What are the audit requirements?
    * Should we preserve change history for odds for tracked events?
        * I assume it is out of the scope of this project
    * Do they justify heavier solutions like CQRS?
        * IMHO yes, but I assume it is our of scope for this project
