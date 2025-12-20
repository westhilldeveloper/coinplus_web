// app/api/chits/route.js
import prisma from '../../lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const skip = (page - 1) * limit
    
    // Optional filters
    const state = searchParams.get('state')
    const branch = searchParams.get('branch')
    const minValue = searchParams.get('minValue')
    const maxValue = searchParams.get('maxValue')

    // Build where clause - SIMPLIFIED APPROACH
    // Since chits have their own state field
    const where = {}
    
    if (state) where.state = state
    if (branch) where.branch = branch
    if (minValue || maxValue) {
      where.chit_value = {}
      if (minValue) where.chit_value.gte = parseFloat(minValue)
      if (maxValue) where.chit_value.lte = parseFloat(maxValue)
    }

    // Get chits with pagination
    const [chits, total] = await Promise.all([
      prisma.chit.findMany({
        where,
        skip,
        take: limit,
        orderBy: { created_at: 'desc' }
      }),
      prisma.chit.count({ where })
    ])

    return NextResponse.json({
      success: true,
      data: chits,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    })

  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}