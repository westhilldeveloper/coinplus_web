// app/api/chits/branches/route.js
import prisma from '../../../lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const state = searchParams.get('state')
    
    // Build where clause
    const where = {
      branch: {
        not: null,
        not: '', // Also filter out empty strings
      }
    }
    
    if (state) {
      where.state = state
    }

    // Get branches with additional info
    const branchesData = await prisma.chit.findMany({
      select: {
        state: true,
        branch: true,
        location: true,
      },
      where,
      distinct: ['state', 'branch'], // Get unique state-branch combinations
      orderBy: [
        { state: 'asc' },
        { branch: 'asc' }
      ]
    })

    // Get counts for each branch
    const branchesWithCount = await Promise.all(
      branchesData.map(async (item) => {
        const count = await prisma.chit.count({
          where: {
            state: item.state,
            branch: item.branch
          }
        })
        
        return {
          state: item.state,
          branch: item.branch,
          location: item.location,
          count: count
        }
      })
    )

    // Group by state if no specific state filter
    let result
    if (state) {
      // If state filter is applied, just return branches
      result = {
        state,
        branches: branchesWithCount
      }
    } else {
      // Group by state
      const groupedByState = branchesWithCount.reduce((acc, branch) => {
        if (!acc[branch.state]) {
          acc[branch.state] = []
        }
        acc[branch.state].push(branch)
        return acc
      }, {})
      
      result = {
        grouped: groupedByState,
        allBranches: branchesWithCount
      }
    }

    return NextResponse.json({
      success: true,
      ...result,
      total: branchesWithCount.length
    })

  } catch (error) {
    console.error('Error fetching branches:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}