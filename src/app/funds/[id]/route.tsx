import { NextResponse } from "next/server";
import { prisma } from '@/lib/prisma';

export async function GET(_: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;

    console.log("GET fund with id ", id);
    

    // Optional: quick sanity check for valid UUID format
    if (!/^[0-9a-fA-F-]{36}$/.test(id)) {
      return NextResponse.json({ error: 'Invalid fund ID format' }, { status: 400 });
    }

    const fund = await prisma.fund.findUnique({
      where: { id },
    });

    if (!fund) {
      return NextResponse.json({ error: 'Fund not found' }, { status: 404 });
    }

    return NextResponse.json(fund);
  } catch (error) {
    console.error('Error fetching fund:', error);
    return NextResponse.json(
      { error: 'Failed to fetch fund' },
      { status: 500 }
    );
  }
}
