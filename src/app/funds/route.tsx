import { NextResponse } from "next/server";
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const funds = await prisma.fund.findMany({
            orderBy: { created_at: 'desc' }, // optional
        });

        return NextResponse.json(funds);
    } catch (error) {
        console.error('Error fetching funds:', error);
        return NextResponse.json(
            { error: 'Failed to fetch funds' },
            { status: 500 }
        );
    }
}

interface FundPostReqBody {
    name: string,
    vintage_year: number,
    target_size_usd: number,
    status: 'Fundraising' | 'Investing' | 'Closed',
}

export async function POST(req: Request) {
    try {
        const body: FundPostReqBody = await req.json();

        // Basic input validation
        const { name, vintage_year, target_size_usd, status } = body;

        if (!name || !status) {
            return NextResponse.json(
                { error: 'Missing required fields: name, status' },
                { status: 400 }
            );
        }

        if (!['Fundraising', 'Investing', 'Closed'].includes(status)) {
            return NextResponse.json(
                { error: 'Invalid fund status' },
                { status: 400 }
            );
        }

        // Create the fund
        const newFund = await prisma.fund.create({
            data: {
                name,
                vintage_year: vintage_year ? Number(vintage_year) : null,
                target_size_usd: target_size_usd ? Number(target_size_usd) : null,
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


