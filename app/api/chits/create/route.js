// app/api/chits/create/route.js
import prisma from '../../../lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const body = await request.json()

    // Validate required fields
    const requiredFields = ['chit_value', 'location', 'state', 'branch']
    const missingFields = requiredFields.filter(field => !body[field])

    if (missingFields.length > 0) {
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
      return NextResponse.json(
        { success: false, error: 'Chit value must be positive' },
        { status: 400 }
      )
    }

    // Create chit
    const chit = await prisma.chit.create({
      data: {
        chit_value: parseFloat(body.chit_value),
        location: body.location,
        state: body.state,
        branch: body.branch,
        phone_number_1: body.phone_number_1 || null,
        phone_number_2: body.phone_number_2 || null,
        monthly_contribution: body.monthly_contribution || null,
        chit_group: body.chit_group || null,
        duration_months: body.duration_months ? parseInt(body.duration_months) : null
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Chit created successfully',
      data: chit
    }, { status: 201 })

  } catch (error) {
    console.error('Create chit error:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}