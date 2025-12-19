// app/api/admin/branches/route.js
import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma'



// GET all branches
export async function GET() {
  try {
    const branches = await prisma.branch.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
    return NextResponse.json(branches);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch branches' },
      { status: 500 }
    );
  }
}

// POST create new branch
export async function POST(request) {
  try {
    const body = await request.json();
    
    const branch = await prisma.branch.create({
      data: {
        name: body.name,
        address: body.address,
        city: body.city,
        state: body.state,
        pincode: body.pincode,
        email: body.email,
        phone1: body.phone1,
        phone2: body.phone2 || null,
        latitude: body.latitude ? parseFloat(body.latitude) : null,
        longitude: body.longitude ? parseFloat(body.longitude) : null
      }
    });
    
    return NextResponse.json(branch, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create branch' },
      { status: 500 }
    );
  }
}