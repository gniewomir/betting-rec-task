# ADD

## Separate domain layer 

### Assumptions 
* Hazard is highly regulated 
* Regulations are different depending on customer residency
* Loosing license for non-compliance is a no-go for any business
* Hazard sites are often probed for both bugs and security vulnerabilities that might be monetized

### Why? 
* Separate domain layer brings some problems
  * increased amount of boilerplate/glue code 
  * harder onboarding of new developers unfamiliar with the patterns/concepts
  * domain modeling can often open unproductive discussions 
* But, also benefits
  * common language with the business people  
  * ease of unit testing domain layer improves coverage and maintainability 
  * separation of businesses and technical concerns 
  * knowledge preservation
  * increased security and robustness of code - thanks to assertion and tests heavy, domain first approach it brings
* As problem domain seems to be heavier on business process complexity - because of regulated domain, than technical complexity - benefits of separate domain layer seems to outweigh cons
