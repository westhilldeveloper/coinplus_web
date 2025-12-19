import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET all galleries
export async function GET() {
  try {
    const galleries = await prisma.gallery.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return Response.json(
      { 
        success: true, 
        data: galleries 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error fetching galleries:', error);
    return Response.json(
      { 
        error: 'Failed to load galleries',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// CREATE new gallery
export async function POST(request) {
  try {
    const { title, description, images } = await request.json();

    // Validate required fields
    if (!title || !description || !images || !Array.isArray(images)) {
      return Response.json(
        { error: 'Missing required fields: title, description, and images array are required' },
        { status: 400 }
      );
    }

    // Validate title
    if (title.trim().length < 3) {
      return Response.json(
        { error: 'Title must be at least 3 characters' },
        { status: 400 }
      );
    }

    // Validate description
    if (description.trim().length < 10) {
      return Response.json(
        { error: 'Description must be at least 10 characters' },
        { status: 400 }
      );
    }

    // Validate images
    if (images.length === 0) {
      return Response.json(
        { error: 'At least one image is required' },
        { status: 400 }
      );
    }

    // Create gallery in database
    const gallery = await prisma.gallery.create({
      data: {
        title: title.trim(),
        description: description.trim(),
        images,
      },
    });

    return Response.json(
      { 
        success: true, 
        message: 'Gallery created successfully',
        data: gallery 
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error creating gallery:', error);
    
    // Handle specific database errors
    if (error.code === 'P2002') {
      return Response.json(
        { error: 'A gallery with this title already exists' },
        { status: 400 }
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