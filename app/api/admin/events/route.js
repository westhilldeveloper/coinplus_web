import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const { description, imageUrl } = await request.json();

    // Validate required fields
    if (!description || !imageUrl) {
      return Response.json(
        { error: 'Missing required fields: description and imageUrl are required' },
        { status: 400 }
      );
    }

    // Validate description length
    if (description.trim().length < 10) {
      return Response.json(
        { error: 'Description must be at least 10 characters' },
        { status: 400 }
      );
    }

    // Create event in database
    const event = await prisma.events.create({
      data: {
        description: description.trim(),
        imageUrl,
      },
    });

    return Response.json(
      { 
        success: true, 
        message: 'Event created successfully',
        data: event 
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error creating event:', error);
    
    return Response.json(
      { 
        error: 'Internal server error. Please try again.',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function GET() {
  try {
    const events = await prisma.events.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return Response.json(
      { 
        success: true, 
        data: events 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error fetching events:', error);
    return Response.json(
      { 
        error: 'Failed to load events' 
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}