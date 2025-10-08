# FUNDS

# Post fund
# curl -X POST http://localhost:3000/funds \
#   -H "Content-Type: application/json" \
#   -d '{
#   "name": "Titanbay Growth Fund II", 
#   "vintage_year": 2025, 
#   "target_size_usd": 500000000.00,
#   "status": "Fundraising"
# }'

# Get funds
# curl http://localhost:3000/funds

# Put fund
# curl -X PUT http://localhost:3000/funds \
#   -H "Content-Type: application/json" \
#   -d '{
#   "id": "75995135-701b-472d-9a6b-7692058fae7d",
#   "name": "Titanbay Growth Fund I",
#   "vintage_year": 2024,
#   "target_size_usd": 300000000.00,
#   "status": "Investing"
# }'

# Get fund with id
# curl http://localhost:3000/funds/75995135-701b-472d-9a6b-7692058fae7d

# INVESTORS
# Post investor
# curl -X POST http://localhost:3000/investors \
#   -H "Content-Type: application/json" \
#   -d '{
#   "name": "CalPERS",
#   "investor_type": "Institution",
#   "email": "privateequity@calpers.ca.gov"
# }'

# Get investors
# curl http://localhost:3000/investors

# INVESTMENTS
curl -X POST http://localhost:3000/funds/75995135-701b-472d-9a6b-7692058fae7d/investments \
  -H "Content-Type: application/json" \
  -d '{
  "investor_id": "4e4c63ca-1b4c-4966-90cd-b0c88dfb4573",
  "amount_usd": 75000000.00,
  "investment_date": "2024-09-22"
}'




