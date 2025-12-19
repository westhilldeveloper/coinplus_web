// app/api/branches/route.js
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET all branches with optional state filter
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const state = searchParams.get('state');
  
  try {
    // Build where clause
    const where = {};
    if (state) {
  where.state = {
    equals: state,
    mode: 'insensitive'
  };
}
    
    const branches = await prisma.branch.findMany({
      where: where,
      orderBy: {
        name: 'asc'
      }
    });
    
    // Return proper JSON structure
    return NextResponse.json({
      success: true,
      data: branches
    });
  } catch (error) {
    console.error('Error fetching branches:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to fetch branches',
        message: error.message 
      },
      { status: 500 }
    );
  }
}