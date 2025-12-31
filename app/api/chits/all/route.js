// app/api/chits/all/route.js
import prisma from '../../../lib/prisma'
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
    console.log('API /chits called with params:', Object.fromEntries(searchParams.entries()))
    
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '100')
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
    
    if (state && state !== 'all' && state.trim() !== '') {
      where.state = state.trim()
      console.log('Filtering by state:', state.trim())
    }
    
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

    console.log('Final where clause:', JSON.stringify(where, null, 2))

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

    console.log(`Found ${chits.length} chits`)

    // Serialize the response to handle BigInt values
    const serializedChits = serializeBigInts(chits)

    return NextResponse.json({
      success: true,
      data: serializedChits,
      pagination: {
        total: Number(total),
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

export async function POST(request) {
  try {
    const body = await request.json()
    console.log('Create chit request:', body)

    // Validate required fields
    if (!body.chit_value) {
      return NextResponse.json(
        { success: false, error: 'Chit value is required' },
        { status: 400 }
      )
    }

    const chitValue = parseFloat(body.chit_value)
    if (isNaN(chitValue) || chitValue <= 0) {
      return NextResponse.json(
        { success: false, error: 'Chit value must be a positive number' },
        { status: 400 }
      )
    }

    // Helper functions
    const parseFloatOrNull = (value) => {
      if (value === null || value === undefined || value === '') {
        return null
      }
      const parsed = parseFloat(value)
      return isNaN(parsed) ? null : parsed
    }

    const parseIntOrNull = (value) => {
      if (value === null || value === undefined || value === '') {
        return null
      }
      const parsed = parseInt(value)
      return isNaN(parsed) ? null : parsed
    }

    // Clean phone numbers
    const cleanPhoneNumber = (phone) => {
      if (!phone || phone === '') return null
      const cleaned = phone.toString().replace(/\D/g, '')
      return cleaned.length === 10 ? cleaned : null
    }

    // Prepare data
    const chitData = {
      chit_value: chitValue,
      location: body.location || null,
      state: body.state || null,
      branch: body.branch || null,
      phone_number_1: cleanPhoneNumber(body.phone_number_1),
      phone_number_2: cleanPhoneNumber(body.phone_number_2),
      monthly_contribution: parseFloatOrNull(body.monthly_contribution),
      chit_group: body.chit_group || null,
      duration_value: parseIntOrNull(body.duration_value),
      duration_unit: body.duration_unit || null
    }

    const newChit = await prisma.chit.create({
      data: chitData
    })

    console.log('Chit created successfully:', newChit.id)

    const serializedChit = serializeBigInts(newChit)

    return NextResponse.json({
      success: true,
      message: 'Chit created successfully',
      data: serializedChit
    })

  } catch (error) {
    console.error('Error creating chit:', error)
    
    if (error.code === 'P2002') {
      return NextResponse.json(
        { 
          success: false, 
          error: 'A chit with similar details already exists' 
        },
        { status: 409 }
      )
    }

    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to create chit' 
      },
      { status: 500 }
    )
  }
}