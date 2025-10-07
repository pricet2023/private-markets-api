import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

interface FundInvestmentsReqParams {
  params: {
    id: string; // fund id
  };
}

// GET /funds/:id/investments — list all investments for a given fund
export async function GET(_: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;

    // Quick sanity check for UUID format
    if (!/^[0-9a-fA-F-]{36}$/.test(id)) {
      return NextResponse.json({ error: 'Invalid fund ID format' }, { status: 400 });
    }

    // Check fund exists first (optional, for better UX)
    const fund = await prisma.fund.findUnique({
      where: { id },
      select: { id: true, name: true },
    });

    if (!fund) {
      return NextResponse.json({ error: 'Fund not found' }, { status: 404 });
    }

    // Fetch investments for that fund
    const investments = await prisma.investment.findMany({
      where: { fund_id: id },
      include: {
        investor: true, // include investor details
      },
      orderBy: { investment_date: 'desc' },
    });

    return NextResponse.json({
      fund,
      investments,
    });
  } catch (error) {
    console.error('Error fetching investments for fund:', error);
    return NextResponse.json(
      { error: 'Failed to fetch investments' },
      { status: 500 }
    );
  }
}

interface InvestmentRequestBody {
  investor_id: string;
  amount_usd: number;
  investment_date: string; // ISO date string
}

export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id: fund_id } = await context.params;
    const body: InvestmentRequestBody = await request.json();

    const { investor_id, amount_usd, investment_date } = body;

    // Validate input
    if (!fund_id || !investor_id || !amount_usd || !investment_date) {
      return NextResponse.json(
        { error: 'Missing required fields: investor_id, amount_usd, investment_date' },
        { status: 400 }
      );
    }

    // Validate UUIDs
    const uuidRegex = /^[0-9a-fA-F-]{36}$/;
    if (!uuidRegex.test(fund_id) || !uuidRegex.test(investor_id)) {
      return NextResponse.json({ error: 'Invalid UUID format' }, { status: 400 });
    }

    // Check fund exists
    const fundExists = await prisma.fund.findUnique({ where: { id: fund_id } });
    if (!fundExists) {
      return NextResponse.json({ error: 'Fund not found' }, { status: 404 });
    }

    // Check investor exists
    const investorExists = await prisma.investor.findUnique({ where: { id: investor_id } });
    if (!investorExists) {
      return NextResponse.json({ error: 'Investor not found' }, { status: 404 });
    }

    // Create the investment
    const investment = await prisma.investment.create({
      data: {
        fund_id,
        investor_id,
        amount_usd,
        investment_date: new Date(investment_date),
      },
      include: {
        investor: true,
        fund: true,
      },
    });

    return NextResponse.json(investment, { status: 201 });
  } catch (error) {
    console.error('Error creating investment:', error);
    return NextResponse.json(
      { error: 'Failed to create investment' },
      { status: 500 }
    );
  }
}