curl -X POST http://localhost:3000/funds \
  -H "Content-Type: application/json" \
  -d '{
  "name": "Titanbay Growth Fund II", 
  "vintage_year": 2025, 
  "target_size_usd": 500000000.00,
  "status": "Fundraising"
}'

# curl http://localhost:3000/funds

