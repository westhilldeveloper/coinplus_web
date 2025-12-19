import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET single blog by ID
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    
    const blog = await prisma.blog.findUnique({
      where: { id: parseInt(id) },
    });

    if (!blog) {
      return Response.json(
        { error: 'Blog not found' },
        { status: 404 }
      );
    }

    return Response.json(
      { 
        success: true, 
        data: blog 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error fetching blog:', error);
    return Response.json(
      { 
        error: 'Failed to load blog',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// UPDATE blog
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const { title, description, imageUrl } = await request.json();

    // Validate required fields
    if (!title || !description || !imageUrl) {
      return Response.json(
        { error: 'Missing required fields: title, description, and imageUrl are required' },
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
    if (description.trim().length < 50) {
      return Response.json(
        { error: 'Description must be at least 50 characters' },
        { status: 400 }
      );
    }

    // Check if blog exists
    const existingBlog = await prisma.blog.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingBlog) {
      return Response.json(
        { error: 'Blog not found' },
        { status: 404 }
      );
    }

    // Update blog in database
    const blog = await prisma.blog.update({
      where: { id: parseInt(id) },
      data: {
        title: title.trim(),
        description: description.trim(),
        imageUrl,
      },
    });

    return Response.json(
      { 
        success: true, 
        message: 'Blog updated successfully',
        data: blog 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error updating blog:', error);
    
    if (error.code === 'P2002') {
      return Response.json(
        { error: 'A blog with this title already exists' },
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

// DELETE blog
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    
    // Check if blog exists
    const existingBlog = await prisma.blog.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingBlog) {
      return Response.json(
        { error: 'Blog not found' },
        { status: 404 }
      );
    }

    // Delete blog from database
    await prisma.blog.delete({
      where: { id: parseInt(id) },
    });

    return Response.json(
      { 
        success: true, 
        message: 'Blog deleted successfully' 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error deleting blog:', error);
    
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