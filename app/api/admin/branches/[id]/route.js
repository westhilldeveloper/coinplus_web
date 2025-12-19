// app/api/admin/branches/[id]/route.js
import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma'

// Helper function to parse ID safely
function parseId(id) {
  console.log('📝 Parsing ID:', id, 'Type:', typeof id);
  const parsed = parseInt(id);
  if (isNaN(parsed)) {
    throw new Error(`Invalid ID format: ${id}`);
  }
  return parsed;
}

// GET single branch
export async function GET(request, { params }) {
  try {
    // IMPORTANT: Await the params promise
    const { id: paramId } = await params;
    console.log('🔄 GET /api/admin/branches/[id] called with ID:', paramId);
    
    if (!paramId) {
      return NextResponse.json(
        { error: 'Branch ID is required' },
        { status: 400 }
      );
    }
    
    const id = parseId(paramId);
    console.log('✅ Parsed ID:', id);
    
    const branch = await prisma.branch.findUnique({
      where: { id: id }
    });
    
    if (!branch) {
      return NextResponse.json(
        { error: `Branch with ID ${id} not found` },
        { status: 404 }
      );
    }
    
    return NextResponse.json(branch);
  } catch (error) {
    console.error('❌ Error in GET [id]:', error);
    return NextResponse.json(
      { 
        error: error.message.includes('Invalid ID') ? error.message : 'Failed to fetch branch',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: error.message.includes('Invalid ID') ? 400 : 500 }
    );
  }
}

// PUT update branch
export async function PUT(request, { params }) {
  try {
    // IMPORTANT: Await the params promise
    const { id: paramId } = await params;
    console.log('🔄 PUT /api/admin/branches/[id] called with ID:', paramId);
    
    if (!paramId) {
      return NextResponse.json(
        { error: 'Branch ID is required' },
        { status: 400 }
      );
    }
    
    const id = parseId(paramId);
    console.log('✅ Parsed ID for update:', id);
    
    const body = await request.json();
    console.log('📥 Update body:', body);
    
    // Check if branch exists first
    const existingBranch = await prisma.branch.findUnique({
      where: { id: id }
    });
    
    if (!existingBranch) {
      return NextResponse.json(
        { error: `Branch with ID ${id} not found` },
        { status: 404 }
      );
    }
    
    // Prepare update data
    const updateData = {};
    
    // Only include fields that are provided
    if (body.name !== undefined) updateData.name = body.name;
    if (body.address !== undefined) updateData.address = body.address;
    if (body.city !== undefined) updateData.city = body.city;
    if (body.state !== undefined) updateData.state = body.state;
    if (body.pincode !== undefined) updateData.pincode = body.pincode;
    if (body.email !== undefined) updateData.email = body.email;
    if (body.phone1 !== undefined) updateData.phone1 = body.phone1;
    if (body.phone2 !== undefined) updateData.phone2 = body.phone2 || null;
    
    // Handle numeric fields
    if (body.latitude !== undefined) {
      updateData.latitude = body.latitude ? parseFloat(body.latitude) : null;
    }
    if (body.longitude !== undefined) {
      updateData.longitude = body.longitude ? parseFloat(body.longitude) : null;
    }
    
    console.log('📝 Update data for ID', id, ':', updateData);
    
    const branch = await prisma.branch.update({
      where: { id: id },
      data: updateData
    });
    
    console.log('✅ Updated branch ID:', branch.id);
    
    return NextResponse.json(branch);
  } catch (error) {
    console.error('❌ Error in PUT [id]:', error);
    console.error('Error code:', error.code);
    console.error('Error name:', error.name);
    
    // Handle Prisma specific errors
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: `Branch not found` },
        { status: 404 }
      );
    }
    
    if (error.code === 'P1017') {
      return NextResponse.json(
        { error: 'Database connection error' },
        { status: 503 }
      );
    }
    
    return NextResponse.json(
      { 
        error: 'Failed to update branch',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}

// DELETE branch
export async function DELETE(request, { params }) {
  try {
    // IMPORTANT: Await the params promise
    const { id: paramId } = await params;
    console.log('🔄 DELETE /api/admin/branches/[id] called with ID:', paramId);
    
    if (!paramId) {
      return NextResponse.json(
        { error: 'Branch ID is required' },
        { status: 400 }
      );
    }
    
    const id = parseId(paramId);
    console.log('✅ Parsed ID for delete:', id);
    
    // Check if branch exists first
    const existingBranch = await prisma.branch.findUnique({
      where: { id: id }
    });
    
    if (!existingBranch) {
      return NextResponse.json(
        { error: `Branch with ID ${id} not found` },
        { status: 404 }
      );
    }
    
    await prisma.branch.delete({
      where: { id: id }
    });
    
    console.log('✅ Deleted branch ID:', id);
    
    return NextResponse.json({ 
      success: true,
      message: `Branch with ID ${id} deleted successfully`,
      deletedId: id
    });
  } catch (error) {
    console.error('❌ Error in DELETE [id]:', error);
    console.error('Error code:', error.code);
    console.error('Error name:', error.name);
    
    // Handle Prisma specific errors
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: `Branch not found` },
        { status: 404 }
      );
    }
    
    if (error.code === 'P1017') {
      return NextResponse.json(
        { error: 'Database connection closed. Please try again.' },
        { status: 503 }
      );
    }
    
    return NextResponse.json(
      { 
        error: 'Failed to delete branch',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}

// Optional: Handle HEAD and OPTIONS methods
export async function HEAD(request, { params }) {
  try {
    const { id: paramId } = await params;
    const id = parseId(paramId);
    
    const exists = await prisma.branch.findUnique({
      where: { id: id },
      select: { id: true }
    });
    
    return new NextResponse(null, {
      status: exists ? 200 : 404,
      headers: {
        'Content-Type': 'application/json',
      }
    });
  } catch (error) {
    return new NextResponse(null, { status: 400 });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Allow': 'GET, PUT, DELETE, HEAD, OPTIONS',
      'Access-Control-Allow-Methods': 'GET, PUT, DELETE, HEAD, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    }
  });
}