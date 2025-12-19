import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET single gallery by ID
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    
    const gallery = await prisma.gallery.findUnique({
      where: { id: parseInt(id) },
    });

    if (!gallery) {
      return Response.json(
        { error: 'Gallery not found' },
        { status: 404 }
      );
    }

    return Response.json(
      { 
        success: true, 
        data: gallery 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error fetching gallery:', error);
    return Response.json(
      { 
        error: 'Failed to load gallery',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// UPDATE gallery
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
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

    // Check if gallery exists
    const existingGallery = await prisma.gallery.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingGallery) {
      return Response.json(
        { error: 'Gallery not found' },
        { status: 404 }
      );
    }

    // Update gallery in database
    const gallery = await prisma.gallery.update({
      where: { id: parseInt(id) },
      data: {
        title: title.trim(),
        description: description.trim(),
        images,
      },
    });

    return Response.json(
      { 
        success: true, 
        message: 'Gallery updated successfully',
        data: gallery 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error updating gallery:', error);
    
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

// DELETE gallery
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    
    // Check if gallery exists
    const existingGallery = await prisma.gallery.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingGallery) {
      return Response.json(
        { error: 'Gallery not found' },
        { status: 404 }
      );
    }

    // Delete gallery from database
    await prisma.gallery.delete({
      where: { id: parseInt(id) },
    });

    return Response.json(
      { 
        success: true, 
        message: 'Gallery deleted successfully' 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error deleting gallery:', error);
    
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