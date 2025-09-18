# ADD 

## NestJS monorepo mode

### Assumptions 
* Microservices make sense either, if org/domain is so big teams need to specialize in their bounded-context or if there are performance bottlenecks that needs to be scaled separately 
* There are multiple overheads related to running microservice architecture, that we want to limit to the minimum, as long circumstances won't force our hand
* For the purpose of this recruitment task, I assume lean org with scaling needs 

### Option #1 
Separate projects for each service 

### Option #2 
NestJS monorepo mode

### Option #3
Non-NestJS monorepo tools 

### Why NestJS monorepo?
* In assumed context we want,
  * stick to one technology - NestJS 
  * to share types across org
  * to share library code 
  * to perform e2e tests locally
  * to reduce overhead when making changes spanning multiple services
  * to run & scale each service independently
  * to reduce overhead of dealing with deps management, supply-chain attacks, security vulnerabilities once 
  * etc. 
* As long as size of code-base, org structure, other considerations does not force our hand, monorepo is cheaper to maintain that separate projects