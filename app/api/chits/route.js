// app/api/chits/route.js
import prisma from '../../lib/prisma'
import { NextResponse } from 'next/server'

// Helper function to safely serialize BigInt values
function serializeBigInts(data) {
  if (data === null || data === undefined) {
    return data
  }
  
  if (typeof data === 'bigint') {
    return data.toString()
  }
  
  if (Array.isArray(data)) {
    return data.map(item => serializeBigInts(item))
  }
  
  if (typeof data === 'object') {
    // Handle Date objects
    if (data instanceof Date) {
      return data.toISOString()
    }
    
    const result = {}
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        result[key] = serializeBigInts(data[key])
      }
    }
    return result
  }
  
  return data
}

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
    const search = searchParams.get('search')
    const sortBy = searchParams.get('sortBy') || 'created_at'
    const sortOrder = searchParams.get('sortOrder') || 'desc'

    // Build where clause
    const where = {}
    
    if (state && state !== 'all') where.state = state
    if (branch && branch !== 'all') where.branch = branch
    if (minValue || maxValue) {
      where.chit_value = {}
      if (minValue) where.chit_value.gte = parseFloat(minValue)
      if (maxValue) where.chit_value.lte = parseFloat(maxValue)
    }

    // Search functionality
    if (search) {
      where.OR = [
        { location: { contains: search, mode: 'insensitive' } },
        { state: { contains: search, mode: 'insensitive' } },
        { branch: { contains: search, mode: 'insensitive' } },
        { chit_group: { contains: search, mode: 'insensitive' } },
        { phone_number_1: { contains: search, mode: 'insensitive' } },
        { phone_number_2: { contains: search, mode: 'insensitive' } }
      ]
    }

    // Validate and set orderBy
    const validSortFields = ['chit_value', 'monthly_contribution', 'duration_months', 'created_at', 'updated_at']
    const orderByField = validSortFields.includes(sortBy) ? sortBy : 'created_at'
    const orderBy = { [orderByField]: sortOrder }

    // Get chits with pagination
    const [chits, total] = await Promise.all([
      prisma.chit.findMany({
        where,
        skip,
        take: limit,
        orderBy
      }),
      prisma.chit.count({ where })
    ])

    // Serialize the response to handle BigInt values
    const serializedChits = serializeBigInts(chits)

    return NextResponse.json({
      success: true,
      data: serializedChits,
      pagination: {
        total: Number(total), // Ensure total is a regular number
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    })

  } catch (error) {
    console.error('Error fetching chits:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch chits. Please try again.' 
      },
      { status: 500 }
    )
  }
}