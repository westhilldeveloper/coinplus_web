import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    
    const blog = await prisma.blog.findUnique({
      where: { id: parseInt(id) },
      select: {
        id: true,
        title: true,
        description: true,
        imageUrl: true,
        createdAt: true,
      },
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