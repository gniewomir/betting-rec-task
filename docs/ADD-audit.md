# ADD

## Audit trails

### Assumptions 
* Considering domain, operations should leave audit trail 
    * If i.e. customer changed self-imposed betting limits we need to be easily able to produce convincing proof of that
    * Every financial operation should leave solid trace 
        * Logs can be used in the same capacity, but are not well fit to track domain events 
            * they are more-or-less unstructured by default
              * which can be mitigated, but it is a separate problem
            * logs retention policy does not have to match audit trail retention policy
* CQRS is an option 
    * CQRS does not equal Event Sourcing, just enforcing that every mutation is expressed as command, that is stored in audit log
    * In this context it means mostly one entrypoint allowing to store audit trail using single middleware for both reporting and compliance
* Regardless of solution, it should be built in, not depending on developer or review of his peers 
