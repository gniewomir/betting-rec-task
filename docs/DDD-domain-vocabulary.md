## Sports Betting Domain Overview

Sports betting is a form of gambling where participants place wagers on the outcome of sporting events. The domain involves several key concepts and entities that work together to facilitate betting.

This domain is complex because it involves real-time data, financial transactions, and regulatory considerations. Your simulated betting system will need to handle odds updates, bet placement, result determination, and account management while maintaining data integrity and preventing errors.

## Key Terms from based on The Odds API

### **Core Entities**

1. **Sports** - Different types of sporting events
   - Examples: `americanfootball_nfl`, `basketball_nba`, `soccer_epl`
   - Each sport has a unique key used in API calls

2. **Events/Games** - Individual sporting matches or competitions
   - Each event has a unique ID
   - Contains information like teams, start time, and venue

3. **Bookmakers** - Companies that accept and pay out bets
   - Examples: `fanduel`, `draftkings`, `bet365`
   - Each offers different odds for the same event

4. **Markets** - Different types of bets available for an event
   - `h2h` (head-to-head): Betting on which team will win
   - `spreads`: Betting on point differentials
   - `totals`: Betting on total points scored
   - `player_points`: Betting on individual player performance
   - `outrights`: Betting on whole tournament result

5. **Outcome** - result of the event (vocabulary created for project)

6. **Odds** - in context of this project, data entry describing `Outcome` that `Customer` can bet on

7. **Customer** - in context of this project, anyone who is registered in the system and can place bets 

### **Odds Formats**

The API supports two main odds formats:

1. **Decimal Odds** (European format)
   - Example: 2.50 means you win $2.50 for every $1 bet
   - Total return = stake × decimal odds

2. **American Odds** (US format)
   - Positive odds (e.g., +240): Amount you win on a $100 bet
   - Negative odds (e.g., -303): Amount you need to bet to win $100

### **Market Types**

1. **Moneyline (h2h)** - Simple win/lose bet
2. **Point Spread** - Betting on margin of victory
3. **Over/Under (Totals)** - Betting on total points/goals
4. **Player Props** - Individual player statistics
5. **Quarter/Half Markets** - Betting on specific periods
6. **Outrights** - Betting on whole tournament result

### **Betting Concepts**

1. **Stake** - The amount of money wagered
2. **Payout** - Total amount returned if bet wins
3. **Profit** - Payout minus stake
4. **Implied Probability** - The probability implied by the odds
5. **Vig/Juice** - The bookmaker's commission built into odds

### **Project Context**

1. **Odds Service** - Fetches and stores odds data from The Odds API
2. **Betting Service** - Handles user bets and account management
3. **Account Balance** - Virtual money system for simulated betting
4. **Bet Settlement** - Determining wins/losses based on simulated results

### **Important Considerations**

1. **Rate Limiting** - The API has usage quotas and rate limits
2. **Data Freshness** - Odds change frequently, requiring regular updates
3. **Market Availability** - Not all markets are available for all events
4. **Regional Differences** - Different bookmakers operate in different regions