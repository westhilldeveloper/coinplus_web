import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET all blogs
export async function GET() {
  try {
    const blogs = await prisma.blog.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return Response.json(
      { 
        success: true, 
        data: blogs 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error fetching blogs:', error);
    return Response.json(
      { 
        error: 'Failed to load blogs',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// CREATE new blog
export async function POST(request) {
  try {
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

    // Create blog in database
    const blog = await prisma.blog.create({
      data: {
        title: title.trim(),
        description: description.trim(),
        imageUrl,
      },
    });

    return Response.json(
      { 
        success: true, 
        message: 'Blog created successfully',
        data: blog 
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error creating blog:', error);
    
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