module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/@prisma/client [external] (@prisma/client, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("@prisma/client", () => require("@prisma/client"));

module.exports = mod;
}),
"[project]/app/api/admin/blog/[id]/route.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DELETE",
    ()=>DELETE,
    "GET",
    ()=>GET,
    "PUT",
    ()=>PUT
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs)");
;
const prisma = new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__["PrismaClient"]();
async function GET(request, { params }) {
    try {
        const { id } = await params;
        const blog = await prisma.blog.findUnique({
            where: {
                id: parseInt(id)
            }
        });
        if (!blog) {
            return Response.json({
                error: 'Blog not found'
            }, {
                status: 404
            });
        }
        return Response.json({
            success: true,
            data: blog
        }, {
            status: 200
        });
    } catch (error) {
        console.error('Error fetching blog:', error);
        return Response.json({
            error: 'Failed to load blog',
            details: ("TURBOPACK compile-time truthy", 1) ? error.message : "TURBOPACK unreachable"
        }, {
            status: 500
        });
    } finally{
        await prisma.$disconnect();
    }
}
async function PUT(request, { params }) {
    try {
        const { id } = await params;
        const { title, description, imageUrl } = await request.json();
        // Validate required fields
        if (!title || !description || !imageUrl) {
            return Response.json({
                error: 'Missing required fields: title, description, and imageUrl are required'
            }, {
                status: 400
            });
        }
        // Validate title
        if (title.trim().length < 3) {
            return Response.json({
                error: 'Title must be at least 3 characters'
            }, {
                status: 400
            });
        }
        // Validate description
        if (description.trim().length < 50) {
            return Response.json({
                error: 'Description must be at least 50 characters'
            }, {
                status: 400
            });
        }
        // Check if blog exists
        const existingBlog = await prisma.blog.findUnique({
            where: {
                id: parseInt(id)
            }
        });
        if (!existingBlog) {
            return Response.json({
                error: 'Blog not found'
            }, {
                status: 404
            });
        }
        // Update blog in database
        const blog = await prisma.blog.update({
            where: {
                id: parseInt(id)
            },
            data: {
                title: title.trim(),
                description: description.trim(),
                imageUrl
            }
        });
        return Response.json({
            success: true,
            message: 'Blog updated successfully',
            data: blog
        }, {
            status: 200
        });
    } catch (error) {
        console.error('Error updating blog:', error);
        if (error.code === 'P2002') {
            return Response.json({
                error: 'A blog with this title already exists'
            }, {
                status: 400
            });
        }
        return Response.json({
            error: 'Internal server error. Please try again.',
            details: ("TURBOPACK compile-time truthy", 1) ? error.message : "TURBOPACK unreachable"
        }, {
            status: 500
        });
    } finally{
        await prisma.$disconnect();
    }
}
async function DELETE(request, { params }) {
    try {
        const { id } = await params;
        // Check if blog exists
        const existingBlog = await prisma.blog.findUnique({
            where: {
                id: parseInt(id)
            }
        });
        if (!existingBlog) {
            return Response.json({
                error: 'Blog not found'
            }, {
                status: 404
            });
        }
        // Delete blog from database
        await prisma.blog.delete({
            where: {
                id: parseInt(id)
            }
        });
        return Response.json({
            success: true,
            message: 'Blog deleted successfully'
        }, {
            status: 200
        });
    } catch (error) {
        console.error('Error deleting blog:', error);
        return Response.json({
            error: 'Internal server error. Please try again.',
            details: ("TURBOPACK compile-time truthy", 1) ? error.message : "TURBOPACK unreachable"
        }, {
            status: 500
        });
    } finally{
        await prisma.$disconnect();
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__86d26524._.js.map