import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    
    // Convert id to integer since Prisma expects Int
    const eventId = parseInt(id, 10);
    
    // Validate that id is a valid number
    if (isNaN(eventId)) {
      return Response.json(
        { error: 'Invalid event ID' },
        { status: 400 }
      );
    }

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

    // Check if event exists
    const existingEvent = await prisma.events.findUnique({
      where: { id: eventId },
    });

    if (!existingEvent) {
      return Response.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }

    // Update event in database
    const updatedEvent = await prisma.events.update({
      where: { id: eventId },
      data: {
        description: description.trim(),
        imageUrl,
        updatedAt: new Date(),
      },
    });

    return Response.json(
      { 
        success: true, 
        message: 'Event updated successfully',
        data: updatedEvent 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error updating event:', error);
    
    if (error.code === 'P2025') {
      return Response.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }
    
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

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    
    // Convert id to integer
    const eventId = parseInt(id, 10);
    
    // Validate that id is a valid number
    if (isNaN(eventId)) {
      return Response.json(
        { error: 'Invalid event ID' },
        { status: 400 }
      );
    }

    // Check if event exists
    const existingEvent = await prisma.events.findUnique({
      where: { id: eventId },
    });

    if (!existingEvent) {
      return Response.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }

    // Delete event from database
    await prisma.events.delete({
      where: { id: eventId },
    });

    return Response.json(
      { 
        success: true, 
        message: 'Event deleted successfully' 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error deleting event:', error);
    
    if (error.code === 'P2025') {
      return Response.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }
    
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

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    
    // Convert id to integer
    const eventId = parseInt(id, 10);
    
    // Validate that id is a valid number
    if (isNaN(eventId)) {
      return Response.json(
        { error: 'Invalid event ID' },
        { status: 400 }
      );
    }

    const event = await prisma.events.findUnique({
      where: { id: eventId },
    });

    if (!event) {
      return Response.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }

    return Response.json(
      { 
        success: true, 
        data: event 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error fetching event:', error);
    return Response.json(
      { 
        error: 'Failed to load event' 
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}