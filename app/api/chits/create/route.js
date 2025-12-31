// app/api/chits/create/route.js
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

export async function POST(request) {
  try {
    const body = await request.json()

    console.log('Received chit creation request:', body)

    // Validate required fields
    const requiredFields = ['chit_value']
    const missingFields = requiredFields.filter(field => !body[field] && body[field] !== 0)

    if (missingFields.length > 0) {
      console.log('Missing required fields:', missingFields)
      return NextResponse.json(
        { 
          success: false, 
          error: `Missing required fields: ${missingFields.join(', ')}` 
        },
        { status: 400 }
      )
    }

    // Validate chit_value is positive
    if (body.chit_value <= 0) {
      console.log('Invalid chit value:', body.chit_value)
      return NextResponse.json(
        { success: false, error: 'Chit value must be positive' },
        { status: 400 }
      )
    }

    // Clean and validate phone numbers (if provided)
    const cleanPhoneNumber = (phone) => {
      if (!phone) return null
      const cleaned = phone.toString().replace(/\D/g, '')
      return cleaned.length === 10 ? cleaned : null
    }

    // Prepare data with proper validation
    const chitData = {
  chit_value: parseFloat(body.chit_value),
  location: body.location?.trim() || null,
  state: body.state?.trim() || null,
  branch: body.branch?.trim() || null,
  phone_number_1: cleanPhoneNumber(body.phone_number_1),
  phone_number_2: cleanPhoneNumber(body.phone_number_2),
  monthly_contribution: body.monthly_contribution ? 
    parseFloat(body.monthly_contribution) : null,
  duration_value: body.duration_value ? parseInt(body.duration_value) : null,
  duration_unit: body.duration_unit || null,
  chit_group: body.chit_group?.trim() || null
}

    console.log('Processed chit data:', chitData)

    // Additional validation for optional fields
    if (chitData.monthly_contribution !== null && chitData.monthly_contribution <= 0) {
      return NextResponse.json(
        { success: false, error: 'Monthly contribution must be positive if provided' },
        { status: 400 }
      )
    }

    if (chitData.duration_value !== null && chitData.duration_value <= 0) {
  return NextResponse.json(
    { success: false, error: 'Duration must be positive if provided' },
    { status: 400 }
  )
}

    // Create chit
    const chit = await prisma.chit.create({
      data: chitData
    })

    console.log('Chit created successfully:', chit.id)

    // Use the helper function to serialize the response
    const responseData = {
      success: true,
      message: 'Chit created successfully',
      data: serializeBigInts(chit)
    }

    return NextResponse.json(responseData, { status: 201 })

  } catch (error) {
    console.error('Create chit error:', error)
    
    // Handle specific Prisma errors
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
        error: 'Failed to create chit. Please try again.' 
      },
      { status: 500 }
    )
  }
}