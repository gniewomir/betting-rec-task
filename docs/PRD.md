## Goal
- Build a minimal backend that enables simulated betting.
- The backend must ingest odds.
- The backend must allow placing bets.
- The backend must track a virtual account balance with individual bets.
- The backend must expose results.

---
## Requested structure

### 1. Odds service (microservice)
- Pull odds into a local PostgreSQL database.
- Provide an easy refresh endpoint or command to keep games and odds up to date.
- Use a free-tier provider, such as [https://the-odds-api.com/](https://the-odds-api.com/).
- Generate random results for running and finished games to settle bets.
- Provide an endpoint to list games with odds.

### 2. Betting service (microservice)
- Allow users to place bets.
- Expose an endpoint to fetch user status, including a list of all bets with their status.
- Expose an endpoint to fetch the user's account balance.

---
## Notes
- Provide a Postman collection or curl examples that cover the main flows.
- Implement prevention of human errors in bet actions, including validation, handling duplicates, setting limits, and checking for insufficient funds.
- The code must be written in NestJS.
- Do not focus on setting up docker-compose; running the applications manually from `package.json` is sufficient.
- Consider adding basic tests and logging as optional features.