# Private Markets API

This is a backend project built with **Next.js** and **PostgreSQL** for managing private market funds and investor commitments.

## Dependencies
- **Docker**
- **Docker-Compose**

## Features
- **API:** Next.js + TypeScript
- **Database:** PostgreSQL (Prisma ORM)

## API endpoints
1. **/funds** 
    - **GET** (List all funds) -> Response (200 OK)
        - Response body
        ```bash
        [
            {
                "id": "550e8400-e29b-41d4-a716-446655440000",
                "name": "Titanbay Growth Fund I",
                "vintage_year": 2024,
                "target_size_usd": 250000000.00,
                "status": "Fundraising",
                "created_at": "2024-01-15T10:30:00Z"
            }
        ]
        ```

    - **POST** (Create a new fund) -> Response (201 Created)
        - Request body
        ```bash
        {
            "name": "Titanbay Growth Fund II",
            "vintage_year": 2025,
            "target_size_usd": 500000000.00,
            "status": "Fundraising"
        }
        ```

        - Response body
        ```bash
        {
            "id": "660e8400-e29b-41d4-a716-446655440001",
            "name": "Titanbay Growth Fund II",
            "vintage_year": 2025,
            "target_size_usd": 500000000.00,
            "status": "Fundraising",
            "created_at": "2024-09-22T14:20:00Z"
        }
        ```
    - **PUT** (Edit an existing fund) -> Response (200 OK)
        - Request body
        ```bash
        {
            "id": "550e8400-e29b-41d4-a716-446655440000",
            "name": "Titanbay Growth Fund I",
            "vintage_year": 2024,
            "target_size_usd": 300000000.00,
            "status": "Investing"
        }
        ```

        - Response body
        ```bash
        {
            "id": "550e8400-e29b-41d4-a716-446655440000",
            "name": "Titanbay Growth Fund I",
            "vintage_year": 2024,
            "target_size_usd": 300000000.00,
            "status": "Investing",
            "created_at": "2024-01-15T10:30:00Z"
        }
        ```

2. **/investors**
    - **GET** (List all investors) -> Response (200 OK)
        - Response body
        ```bash
        [
            {
                "id": "770e8400-e29b-41d4-a716-446655440002",
                "name": "Goldman Sachs Asset Management",
                "investor_type": "Institution",
                "email": "investments@gsam.com",
                "created_at": "2024-02-10T09:15:00Z"
            }
        ]
        ```
    
    - **POST** (Create a new investor) -> Response (201 Created)
        - Request body
        ```bash
        {
            "name": "CalPERS",
            "investor_type": "Institution",
            "email": "privateequity@calpers.ca.gov"
        }
        ```

        - Response body
        ```bash
        {
            "id": "880e8400-e29b-41d4-a716-446655440003",
            "name": "CalPERS",
            "investor_type": "Institution",
            "email": "privateequity@calpers.ca.gov",
            "created_at": "2024-09-22T15:45:00Z"
        }
        ```

3. **/funds/{id}**
    - **GET** (Get a specific fund) -> Response (200 OK)
        - Path Parameter: **id** (REQUIRED uuid string)
        - Response body
        ```bash
        {
            "id": "550e8400-e29b-41d4-a716-446655440000",
            "name": "Titanbay Growth Fund I",
            "vintage_year": 2024,
            "target_size_usd": 250000000.00,
            "status": "Fundraising",
            "created_at": "2024-01-15T10:30:00Z"
        }
        ``` 

4. **/funds/{fund_id}/investments**
    - **GET** (List all investments for a specific fund) -> Response (200 OK)
        - Path Parameter: **id** (REQUIRED uuid string)
        - Response body
        ```bash
        [
            {
                "id": "990e8400-e29b-41d4-a716-446655440004",
                "investor_id": "770e8400-e29b-41d4-a716-446655440002",
                "fund_id": "550e8400-e29b-41d4-a716-446655440000",
                "amount_usd": 50000000.00,
                "investment_date": "2024-03-15"
            }
        ]
        ```
    
    - **POST** (Create a new investment to a fund) -> Response (201 Created)
        - Path Parameter: **id** (REQUIRED uuid string)
        - Request body
        ```bash
        {
            "investor_id": "880e8400-e29b-41d4-a716-446655440003",
            "amount_usd": 75000000.00,
            "investment_date": "2024-09-22"
        }
        ```

        - Response body
        ```bash
        {
            "id": "aa0e8400-e29b-41d4-a716-446655440005",
            "investor_id": "880e8400-e29b-41d4-a716-446655440003",
            "fund_id": "550e8400-e29b-41d4-a716-446655440000",
            "amount_usd": 75000000.00,
            "investment_date": "2024-09-22"
        }
        ```

## Setup Guide
1. **Clone the repo**

    ```bash
    git clone https://github.com/pricet2023/private-markets-api
    cd private-markets-api
    ```
2. **Create .env**

    Change or copy env.example to .env

3. **Start services**
    ```bash
    docker-compose up -d
    ```







