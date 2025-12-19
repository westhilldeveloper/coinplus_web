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
"[project]/app/api/admin/gallery/route.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs)");
;
const prisma = new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__["PrismaClient"]();
async function GET() {
    try {
        const galleries = await prisma.gallery.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });
        return Response.json({
            success: true,
            data: galleries
        }, {
            status: 200
        });
    } catch (error) {
        console.error('Error fetching galleries:', error);
        return Response.json({
            error: 'Failed to load galleries',
            details: ("TURBOPACK compile-time truthy", 1) ? error.message : "TURBOPACK unreachable"
        }, {
            status: 500
        });
    } finally{
        await prisma.$disconnect();
    }
}
async function POST(request) {
    try {
        const { title, description, images } = await request.json();
        // Validate required fields
        if (!title || !description || !images || !Array.isArray(images)) {
            return Response.json({
                error: 'Missing required fields: title, description, and images array are required'
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
        if (description.trim().length < 10) {
            return Response.json({
                error: 'Description must be at least 10 characters'
            }, {
                status: 400
            });
        }
        // Validate images
        if (images.length === 0) {
            return Response.json({
                error: 'At least one image is required'
            }, {
                status: 400
            });
        }
        // Create gallery in database
        const gallery = await prisma.gallery.create({
            data: {
                title: title.trim(),
                description: description.trim(),
                images
            }
        });
        return Response.json({
            success: true,
            message: 'Gallery created successfully',
            data: gallery
        }, {
            status: 201
        });
    } catch (error) {
        console.error('Error creating gallery:', error);
        // Handle specific database errors
        if (error.code === 'P2002') {
            return Response.json({
                error: 'A gallery with this title already exists'
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
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__53b78475._.js.map