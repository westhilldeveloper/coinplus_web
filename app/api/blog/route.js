import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const blogs = await prisma.blog.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        title: true,
        description: true,
        imageUrl: true,
        createdAt: true,
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