import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /investors — fetch all investors
export async function GET() {
  try {
    const investors = await prisma.investor.findMany({
      orderBy: { created_at: 'desc' },
    });

    return NextResponse.json(investors);
  } catch (error) {
    console.error('Error fetching investors:', error);
    return NextResponse.json(
      { error: 'Failed to fetch investors' },
      { status: 500 }
    );
  }
}

// POST /investors — create a new investor
interface InvestorReqBody {
  name: string;
  investor_type: 'Individual' | 'Institution' | 'FamilyOffice';
  email: string;
}

export async function POST(request: Request) {
  try {
    const body: InvestorReqBody = await request.json();
    const { name, investor_type, email } = body;

    // Basic validation
    if (!name || !email || investor_type) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (!['Individual', 'Institution', 'Family Office'].includes(investor_type)) {
      return NextResponse.json(
        { error: 'Invalid Investor type' },
        { status: 400 }
      );
    }

    // Simple email regex validation
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const newInvestor = await prisma.investor.create({
      data: {
        name,
        investor_type,
        email,
      },
    });

    return NextResponse.json(newInvestor, { status: 201 });
  } catch (error) {
    console.error('Error creating investor:', error);
    return NextResponse.json(
      { error: 'Failed to create investor' },
      { status: 500 }
    );
  }
}