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
"[project]/app/api/chits/[id]/route.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// app/api/chits/[id]/route.js
__turbopack_context__.s([
    "DELETE",
    ()=>DELETE,
    "GET",
    ()=>GET,
    "PUT",
    ()=>PUT
]);
(()=>{
    const e = new Error("Cannot find module '@/app/lib/prisma'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
;
;
async function GET(request, { params }) {
    try {
        // Await the params to get the actual value
        const { id } = await params;
        const parsedId = parseInt(id);
        if (isNaN(parsedId)) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: 'Invalid ID format'
            }, {
                status: 400
            });
        }
        const chit = await prisma.chit.findUnique({
            where: {
                id: parsedId
            }
        });
        if (!chit) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: 'Chit not found'
            }, {
                status: 404
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            data: chit
        });
    } catch (error) {
        console.error('Get chit error:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: error.message
        }, {
            status: 500
        });
    }
}
async function PUT(request, { params }) {
    try {
        // Await the params to get the actual value
        const { id } = await params;
        const parsedId = parseInt(id);
        if (isNaN(parsedId)) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: 'Invalid ID format'
            }, {
                status: 400
            });
        }
        const body = await request.json();
        // Check if chit exists
        const existingChit = await prisma.chit.findUnique({
            where: {
                id: parsedId
            }
        });
        if (!existingChit) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: 'Chit not found'
            }, {
                status: 404
            });
        }
        // Helper function to handle undefined/null values
        const parseFloatOrNull = (value)=>{
            if (value === null || value === undefined || value === '') {
                return null;
            }
            const parsed = parseFloat(value);
            return isNaN(parsed) ? null : parsed;
        };
        const parseIntOrNull = (value)=>{
            if (value === null || value === undefined || value === '') {
                return null;
            }
            const parsed = parseInt(value);
            return isNaN(parsed) ? null : parsed;
        };
        // Update chit with proper handling
        const updatedChit = await prisma.chit.update({
            where: {
                id: parsedId
            },
            data: {
                chit_value: body.chit_value !== undefined ? parseFloat(body.chit_value) : existingChit.chit_value,
                location: body.location || existingChit.location,
                state: body.state || existingChit.state,
                branch: body.branch || existingChit.branch,
                phone_number_1: body.phone_number_1 !== undefined ? body.phone_number_1 : existingChit.phone_number_1,
                phone_number_2: body.phone_number_2 !== undefined ? body.phone_number_2 : existingChit.phone_number_2,
                monthly_contribution: parseFloatOrNull(body.monthly_contribution),
                chit_group: body.chit_group !== undefined ? body.chit_group : existingChit.chit_group,
                duration_months: parseIntOrNull(body.duration_months)
            }
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            message: 'Chit updated successfully',
            data: updatedChit
        });
    } catch (error) {
        console.error('Update chit error:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: error.message || 'Failed to update chit'
        }, {
            status: 500
        });
    }
}
async function DELETE(request, { params }) {
    try {
        // Await the params to get the actual value
        const { id } = await params;
        const parsedId = parseInt(id);
        if (isNaN(parsedId)) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: 'Invalid ID format'
            }, {
                status: 400
            });
        }
        // Check if chit exists
        const existingChit = await prisma.chit.findUnique({
            where: {
                id: parsedId
            }
        });
        if (!existingChit) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: 'Chit not found'
            }, {
                status: 404
            });
        }
        // Delete chit
        await prisma.chit.delete({
            where: {
                id: parsedId
            }
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            message: 'Chit deleted successfully'
        });
    } catch (error) {
        console.error('Delete chit error:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: error.message
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__2a455ff4._.js.map