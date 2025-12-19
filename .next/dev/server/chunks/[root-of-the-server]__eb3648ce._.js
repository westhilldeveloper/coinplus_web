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
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/@prisma/client [external] (@prisma/client, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("@prisma/client", () => require("@prisma/client"));

module.exports = mod;
}),
"[project]/app/lib/prisma.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// app/lib/prisma.js
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs)");
;
const globalForPrisma = globalThis;
const prisma = globalForPrisma.prisma ?? new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__["PrismaClient"]({
    log: [
        'error',
        'warn'
    ]
});
if ("TURBOPACK compile-time truthy", 1) {
    globalForPrisma.prisma = prisma;
}
const __TURBOPACK__default__export__ = prisma;
}),
"[project]/app/api/admin/branches/[id]/route.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// app/api/admin/branches/[id]/route.js
__turbopack_context__.s([
    "DELETE",
    ()=>DELETE,
    "GET",
    ()=>GET,
    "HEAD",
    ()=>HEAD,
    "OPTIONS",
    ()=>OPTIONS,
    "PUT",
    ()=>PUT
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$prisma$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/prisma.js [app-route] (ecmascript)");
;
;
// Helper function to parse ID safely
function parseId(id) {
    console.log('📝 Parsing ID:', id, 'Type:', typeof id);
    const parsed = parseInt(id);
    if (isNaN(parsed)) {
        throw new Error(`Invalid ID format: ${id}`);
    }
    return parsed;
}
async function GET(request, { params }) {
    try {
        // IMPORTANT: Await the params promise
        const { id: paramId } = await params;
        console.log('🔄 GET /api/admin/branches/[id] called with ID:', paramId);
        if (!paramId) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Branch ID is required'
            }, {
                status: 400
            });
        }
        const id = parseId(paramId);
        console.log('✅ Parsed ID:', id);
        const branch = await __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$prisma$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].branch.findUnique({
            where: {
                id: id
            }
        });
        if (!branch) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: `Branch with ID ${id} not found`
            }, {
                status: 404
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(branch);
    } catch (error) {
        console.error('❌ Error in GET [id]:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: error.message.includes('Invalid ID') ? error.message : 'Failed to fetch branch',
            details: ("TURBOPACK compile-time truthy", 1) ? error.message : "TURBOPACK unreachable"
        }, {
            status: error.message.includes('Invalid ID') ? 400 : 500
        });
    }
}
async function PUT(request, { params }) {
    try {
        // IMPORTANT: Await the params promise
        const { id: paramId } = await params;
        console.log('🔄 PUT /api/admin/branches/[id] called with ID:', paramId);
        if (!paramId) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Branch ID is required'
            }, {
                status: 400
            });
        }
        const id = parseId(paramId);
        console.log('✅ Parsed ID for update:', id);
        const body = await request.json();
        console.log('📥 Update body:', body);
        // Check if branch exists first
        const existingBranch = await __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$prisma$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].branch.findUnique({
            where: {
                id: id
            }
        });
        if (!existingBranch) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: `Branch with ID ${id} not found`
            }, {
                status: 404
            });
        }
        // Prepare update data
        const updateData = {};
        // Only include fields that are provided
        if (body.name !== undefined) updateData.name = body.name;
        if (body.address !== undefined) updateData.address = body.address;
        if (body.city !== undefined) updateData.city = body.city;
        if (body.state !== undefined) updateData.state = body.state;
        if (body.pincode !== undefined) updateData.pincode = body.pincode;
        if (body.email !== undefined) updateData.email = body.email;
        if (body.phone1 !== undefined) updateData.phone1 = body.phone1;
        if (body.phone2 !== undefined) updateData.phone2 = body.phone2 || null;
        // Handle numeric fields
        if (body.latitude !== undefined) {
            updateData.latitude = body.latitude ? parseFloat(body.latitude) : null;
        }
        if (body.longitude !== undefined) {
            updateData.longitude = body.longitude ? parseFloat(body.longitude) : null;
        }
        console.log('📝 Update data for ID', id, ':', updateData);
        const branch = await __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$prisma$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].branch.update({
            where: {
                id: id
            },
            data: updateData
        });
        console.log('✅ Updated branch ID:', branch.id);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(branch);
    } catch (error) {
        console.error('❌ Error in PUT [id]:', error);
        console.error('Error code:', error.code);
        console.error('Error name:', error.name);
        // Handle Prisma specific errors
        if (error.code === 'P2025') {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: `Branch not found`
            }, {
                status: 404
            });
        }
        if (error.code === 'P1017') {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Database connection error'
            }, {
                status: 503
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Failed to update branch',
            details: ("TURBOPACK compile-time truthy", 1) ? error.message : "TURBOPACK unreachable"
        }, {
            status: 500
        });
    }
}
async function DELETE(request, { params }) {
    try {
        // IMPORTANT: Await the params promise
        const { id: paramId } = await params;
        console.log('🔄 DELETE /api/admin/branches/[id] called with ID:', paramId);
        if (!paramId) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Branch ID is required'
            }, {
                status: 400
            });
        }
        const id = parseId(paramId);
        console.log('✅ Parsed ID for delete:', id);
        // Check if branch exists first
        const existingBranch = await __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$prisma$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].branch.findUnique({
            where: {
                id: id
            }
        });
        if (!existingBranch) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: `Branch with ID ${id} not found`
            }, {
                status: 404
            });
        }
        await __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$prisma$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].branch.delete({
            where: {
                id: id
            }
        });
        console.log('✅ Deleted branch ID:', id);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            message: `Branch with ID ${id} deleted successfully`,
            deletedId: id
        });
    } catch (error) {
        console.error('❌ Error in DELETE [id]:', error);
        console.error('Error code:', error.code);
        console.error('Error name:', error.name);
        // Handle Prisma specific errors
        if (error.code === 'P2025') {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: `Branch not found`
            }, {
                status: 404
            });
        }
        if (error.code === 'P1017') {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Database connection closed. Please try again.'
            }, {
                status: 503
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Failed to delete branch',
            details: ("TURBOPACK compile-time truthy", 1) ? error.message : "TURBOPACK unreachable"
        }, {
            status: 500
        });
    }
}
async function HEAD(request, { params }) {
    try {
        const { id: paramId } = await params;
        const id = parseId(paramId);
        const exists = await __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$prisma$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].branch.findUnique({
            where: {
                id: id
            },
            select: {
                id: true
            }
        });
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"](null, {
            status: exists ? 200 : 404,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"](null, {
            status: 400
        });
    }
}
async function OPTIONS() {
    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"](null, {
        status: 200,
        headers: {
            'Allow': 'GET, PUT, DELETE, HEAD, OPTIONS',
            'Access-Control-Allow-Methods': 'GET, PUT, DELETE, HEAD, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        }
    });
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__eb3648ce._.js.map