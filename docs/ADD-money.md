# ADD

## Handling money

### Assumptions 
* If production solution have to cover multiple markets, we can make reasonable assumption is that project will be handling multiple currencies
    * Therefore, storing monetary values should be always done with the currency
        * Therefore, Fowler's Money Pattern (immutable value objects representing money as amount of smallest unit with currency) seems like a must
    * Therefore, as stated in [ADD-race-conditions.md](ADD-race-conditions) it is even more important, to keep domain logic out of database - as we won't be operation on primitive values. 
* Operations on monetary values represented as numbers are notoriously imprecise and fragile
    * Therefore, Fowler's Money Pattern seems like a must
        * There are alternatives, but all require basically reimplementing already established good practices