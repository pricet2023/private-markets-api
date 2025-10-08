import { NextResponse } from "next/server";
import { prisma } from '@/lib/prisma';
import { Decimal } from "@prisma/client/runtime/library";

// GET - List all funds
export async function GET() {
    try {
        console.log("GET funds");

        // Query DB for funds
        const funds = await prisma.fund.findMany({
            orderBy: { created_at: 'desc' },
        });

        console.log("Got ", funds.length, " funds");

        return NextResponse.json(funds);
    } catch (error) {
        console.error('Error fetching funds:', error);
        return NextResponse.json(
            { error: 'Failed to fetch funds' },
            { status: 500 }
        );
    }
}

// POST request body for creating fund
interface FundPostReqBody {
    name: string,
    vintage_year: number,
    target_size_usd: number,
    status: 'Fundraising' | 'Investing' | 'Closed',
}

// POST - Create a new fund
export async function POST(req: Request) {
    try {
        console.log("POST fund");
        const body: FundPostReqBody = await req.json();

        // Input validation
        const { name, vintage_year, target_size_usd, status } = body;

        if (!name || !status || !vintage_year || !target_size_usd) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        if (!['Fundraising', 'Investing', 'Closed'].includes(status)) {
            return NextResponse.json(
                { error: 'Invalid fund status' },
                { status: 400 }
            );
        }

        if (target_size_usd < 0) {
            return NextResponse.json(
                { error: 'Invalid fund size' },
                { status: 400 }
            );
        }

        // Round size to nearest cent
        const roundedSize = Math.round(target_size_usd * 100) / 100;

        console.log("Sending fund to db");
        // Create the fund in DB
        const newFund = await prisma.fund.create({
            data: {
                name,
                vintage_year: Number(vintage_year),
                target_size_usd: Decimal(roundedSize),
                status,
            },
        });

        return NextResponse.json(newFund, { status: 201 });
    } catch (error) {
        console.error('Error creating fund:', error);
        return NextResponse.json(
            { error: 'Failed to create fund' },
            { status: 500 }
        );
    }
}

interface FundPutReqBody {
    id: string,
    name?: string,
    vintage_year?: number,
    target_size_usd?: number,
    status?: 'Fundraising' | 'Investing' | 'Closed',
}

// PUT - Update an existing fund
export async function PUT(req: Request) {
    try {
        const body: FundPutReqBody = await req.json();
        const { id, name, vintage_year, target_size_usd, status } = body;

        if (!id) {
            return NextResponse.json({ error: 'Missing fund ID' }, { status: 400 });
        }

        // Ensure the fund exists first
        const existingFund = await prisma.fund.findUnique({ where: { id } });
        if (!existingFund) {
            return NextResponse.json({ error: 'Fund not found' }, { status: 404 });
        }

        // Handle target size input
        let roundedSize: number = 0;
        if (target_size_usd) {
            if (target_size_usd < 0) {
                return NextResponse.json(
                    { error: 'Invalid fund size' },
                    { status: 400 }
                );
            }

            // Round size to nearest cent
            roundedSize = Math.round(target_size_usd * 100) / 100;
        }

        // Update fund
        const updatedFund = await prisma.fund.update({
            where: { id },
            data: {
                name: name ? name : existingFund.name,
                vintage_year: vintage_year ? Number(vintage_year) : existingFund.vintage_year,
                target_size_usd: target_size_usd ? Decimal(roundedSize) : existingFund.target_size_usd,
                status: status || existingFund.status,
                created_at: new Date(),
            },
        });

        return NextResponse.json(updatedFund);
    } catch (error) {
        console.error('Error updating fund:', error);
        return NextResponse.json({ error: 'Failed to update fund' }, { status: 500 });
    }
}


