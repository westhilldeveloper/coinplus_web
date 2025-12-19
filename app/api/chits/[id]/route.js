// app/api/chits/[id]/route.js

import prisma from '../../../lib/prisma'
import { NextResponse } from 'next/server'

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
      where: { id: parsedId }  // Use field name 'id' with parsedId value
    })

    if (!chit) {
      return NextResponse.json(
        { success: false, error: 'Chit not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: chit
    })

  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params
    const parsedId = parseInt(id)
    const body = await request.json()

    if (isNaN(parsedId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid ID format' },
        { status: 400 }
      )
    }

    // Check if chit exists - use field name 'id' with parsedId value
    const existingChit = await prisma.chit.findUnique({
      where: { id: parsedId }
    })

    if (!existingChit) {
      return NextResponse.json(
        { success: false, error: 'Chit not found' },
        { status: 404 }
      )
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

    // Update chit - use field name 'id' with parsedId value
    const updatedChit = await prisma.chit.update({
      where: { id: parsedId },
      data: {
        chit_value: body.chit_value !== undefined ? parseFloat(body.chit_value) : existingChit.chit_value,
        location: body.location !== undefined ? body.location : existingChit.location,
        state: body.state !== undefined ? body.state : existingChit.state,
        branch: body.branch !== undefined ? body.branch : existingChit.branch,
        phone_number_1: body.phone_number_1 !== undefined ? body.phone_number_1 : existingChit.phone_number_1,
        phone_number_2: body.phone_number_2 !== undefined ? body.phone_number_2 : existingChit.phone_number_2,
        monthly_contribution: body.monthly_contribution !== undefined ? parseFloatOrNull(body.monthly_contribution) : existingChit.monthly_contribution,
        chit_group: body.chit_group !== undefined ? body.chit_group : existingChit.chit_group,
        duration_months: body.duration_months !== undefined ? parseIntOrNull(body.duration_months) : existingChit.duration_months
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Chit updated successfully',
      data: updatedChit
    })

  } catch (error) {
    console.error('PUT error:', error)
    return NextResponse.json(
      { success: false, error: error.message },
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

    // Check if chit exists - use field name 'id' with parsedId value
    const existingChit = await prisma.chit.findUnique({
      where: { id: parsedId }
    })

    if (!existingChit) {
      return NextResponse.json(
        { success: false, error: 'Chit not found' },
        { status: 404 }
      )
    }

    // Delete chit - use field name 'id' with parsedId value
    await prisma.chit.delete({
      where: { id: parsedId }
    })

    return NextResponse.json({
      success: true,
      message: 'Chit deleted successfully'
    })

  } catch (error) {
    console.error('DELETE error:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}