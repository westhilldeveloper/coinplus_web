// app/api/chits/states/route.js
import prisma from '../../../lib/prisma'
import { NextResponse } from 'next/server'

const STATE_MAP = {
  'TS': 'TELANGANA',
  'AP': 'ANDHRA PRADESH',
  'TN': 'TAMIL NADU',
  'KA': 'KARNATAKA',
  'KL': 'KERALA',
  'MH': 'MAHARASHTRA',
  'DL': 'DELHI',
  'RJ': 'RAJASTHAN',
  'GJ': 'GUJARAT',
  // Add more states as needed
};

export async function GET() {
  try {
    // Get unique states from CHITS table (not branches)
    const uniqueStates = await prisma.chit.groupBy({
      by: ['state'],
      _count: {
        id: true,
      },
      orderBy: {
        state: 'asc'
      }
    });

    // Format states with labels
    const states = uniqueStates
      .map(item => ({
        state: item.state,
        label: STATE_MAP[item.state] || item.state,
        count: item._count.id
      }))
      .filter(item => item.state) // Filter out null/undefined states
      .sort((a, b) => a.label.localeCompare(b.label)); // Sort alphabetically

    return NextResponse.json({
      success: true,
      states,
      total: states.length
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}