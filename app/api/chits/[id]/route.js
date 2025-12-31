// app/api/chits/[id]/route.js

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

export async function GET(request, { params }) {
  try {
    // Await params first
    const { id } = await params
    const parsedId = parseInt(id)

    if (isNaN(parsedId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid ID format' },
        { status: 400 }
      )
    }

    const chit = await prisma.chit.findUnique({
      where: { id: parsedId }
    })

    if (!chit) {
      return NextResponse.json(
        { success: false, error: 'Chit not found' },
        { status: 404 }
      )
    }

    // Serialize BigInt values
    const serializedChit = serializeBigInts(chit)

    return NextResponse.json({
      success: true,
      data: serializedChit
    })

  } catch (error) {
    console.error('GET chit error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch chit' },
      { status: 500 }
    )
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params
    const parsedId = parseInt(id)
    const body = await request.json()

    console.log('Update chit request:', { id: parsedId, data: body })

    if (isNaN(parsedId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid ID format' },
        { status: 400 }
      )
    }

    // Check if chit exists
    const existingChit = await prisma.chit.findUnique({
      where: { id: parsedId }
    })

    if (!existingChit) {
      return NextResponse.json(
        { success: false, error: 'Chit not found' },
        { status: 404 }
      )
    }

    // Validate chit_value if provided
    if (body.chit_value !== undefined) {
      const chitValue = parseFloat(body.chit_value)
      if (isNaN(chitValue) || chitValue <= 0) {
        return NextResponse.json(
          { success: false, error: 'Chit value must be a positive number' },
          { status: 400 }
        )
      }
    }

    // Helper functions for parsing
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

    // Clean phone numbers if provided
    const cleanPhoneNumber = (phone) => {
      if (!phone || phone === '') return null
      const cleaned = phone.toString().replace(/\D/g, '')
      return cleaned.length === 10 ? cleaned : null
    }

    // Prepare update data
    const updateData = {
  // Required field validation
  chit_value: body.chit_value !== undefined ? parseFloat(body.chit_value) : existingChit.chit_value,
  
  // Optional fields - allow empty strings to become null
  location: body.location !== undefined ? (body.location || null) : existingChit.location,
  state: body.state !== undefined ? (body.state || null) : existingChit.state,
  branch: body.branch !== undefined ? (body.branch || null) : existingChit.branch,
  
  // Optional phone numbers
  phone_number_1: body.phone_number_1 !== undefined ? cleanPhoneNumber(body.phone_number_1) : existingChit.phone_number_1,
  phone_number_2: body.phone_number_2 !== undefined ? cleanPhoneNumber(body.phone_number_2) : existingChit.phone_number_2,
  
  // Optional numeric fields
  monthly_contribution: body.monthly_contribution !== undefined ? parseFloatOrNull(body.monthly_contribution) : existingChit.monthly_contribution,
  
  // Duration fields
  duration_value: body.duration_value !== undefined ? parseIntOrNull(body.duration_value) : existingChit.duration_value,
  duration_unit: body.duration_unit !== undefined ? body.duration_unit : existingChit.duration_unit,
  
  // Optional text field
  chit_group: body.chit_group !== undefined ? (body.chit_group || null) : existingChit.chit_group
}

    // Validate optional numeric fields if provided
    if (updateData.monthly_contribution !== null && updateData.monthly_contribution <= 0) {
      return NextResponse.json(
        { success: false, error: 'Monthly contribution must be positive if provided' },
        { status: 400 }
      )
    }

    if (updateData.duration_months !== null && updateData.duration_months <= 0) {
      return NextResponse.json(
        { success: false, error: 'Duration must be positive if provided' },
        { status: 400 }
      )
    }

    // Update chit
    const updatedChit = await prisma.chit.update({
      where: { id: parsedId },
      data: updateData
    })

    console.log('Chit updated successfully:', updatedChit.id)

    // Serialize BigInt values
    const serializedChit = serializeBigInts(updatedChit)

    return NextResponse.json({
      success: true,
      message: 'Chit updated successfully',
      data: serializedChit
    })

  } catch (error) {
    console.error('PUT chit error:', error)
    
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
        error: 'Failed to update chit' 
      },
      { status: 500 }
    )
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params
    const parsedId = parseInt(id)

    if (isNaN(parsedId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid ID format' },
        { status: 400 }
      )
    }

    // Check if chit exists
    const existingChit = await prisma.chit.findUnique({
      where: { id: parsedId }
    })

    if (!existingChit) {
      return NextResponse.json(
        { success: false, error: 'Chit not found' },
        { status: 404 }
      )
    }

    // Delete chit
    await prisma.chit.delete({
      where: { id: parsedId }
    })

    console.log('Chit deleted successfully:', parsedId)

    return NextResponse.json({
      success: true,
      message: 'Chit deleted successfully'
    })

  } catch (error) {
    console.error('DELETE chit error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to delete chit' 
      },
      { status: 500 }
    )
  }
}