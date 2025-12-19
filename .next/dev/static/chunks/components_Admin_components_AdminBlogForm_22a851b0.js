(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/Admin/components/AdminBlogForm.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// components/Admin/components/AdminBlogForm.js
__turbopack_context__.s([
    "default",
    ()=>AdminBlogForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
function AdminBlogForm({ blog = null, onSuccess, onCancel }) {
    _s();
    const isEditMode = !!blog;
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        title: blog?.title || '',
        description: blog?.description || '',
        imageUrl: blog?.imageUrl || ''
    });
    const [uploading, setUploading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [saving, setSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [errors, setErrors] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [success, setSuccess] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [imagePreview, setImagePreview] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [showPreview, setShowPreview] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const fileInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const textareaRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Handle image upload (same as before)
    const handleImageUpload = async (e)=>{
        const file = e.target.files[0];
        if (!file) return;
        // Clear previous errors
        setErrors((prev)=>({
                ...prev,
                imageUrl: ''
            }));
        // Validate file type
        if (!file.type.startsWith('image/')) {
            setErrors((prev)=>({
                    ...prev,
                    imageUrl: 'Please select an image file (JPEG, PNG, GIF, etc.)'
                }));
            return;
        }
        // Validate file size (5MB limit)
        if (file.size > 5 * 1024 * 1024) {
            setErrors((prev)=>({
                    ...prev,
                    imageUrl: 'Image size should be less than 5MB'
                }));
            return;
        }
        // Create preview
        const previewUrl = URL.createObjectURL(file);
        setImagePreview(previewUrl);
        setUploading(true);
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", ("TURBOPACK compile-time value", "tour_uploads"));
        try {
            const cloudName = 'ddsim4ixm'; // Your cloud name
            const res = await fetch(`https://api.cloudinary.com/v1_1/${("TURBOPACK compile-time value", "ddsim4ixm")}/image/upload`, {
                method: "POST",
                body: data
            });
            if (!res.ok) {
                throw new Error(`Upload failed with status: ${res.status}`);
            }
            const result = await res.json();
            if (!result.secure_url) {
                throw new Error('No secure URL returned from Cloudinary');
            }
            setFormData({
                ...formData,
                imageUrl: result.secure_url
            });
            setSuccess('✓ Image uploaded successfully');
            setTimeout(()=>setSuccess(''), 2000);
        } catch (err) {
            console.error("Upload failed:", err);
            setErrors((prev)=>({
                    ...prev,
                    imageUrl: err.message || 'Image upload failed. Please try again.'
                }));
            setImagePreview('');
            setFormData((prev)=>({
                    ...prev,
                    imageUrl: ''
                }));
        } finally{
            setUploading(false);
        }
    };
    // Formatting helper functions for the textarea
    const insertFormatting = (format)=>{
        if (!textareaRef.current) return;
        const textarea = textareaRef.current;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const text = textarea.value;
        const selectedText = text.substring(start, end);
        let newText;
        let newCursorPos;
        switch(format){
            case 'bold':
                newText = text.substring(0, start) + '**' + selectedText + '**' + text.substring(end);
                newCursorPos = end + 4;
                break;
            case 'italic':
                newText = text.substring(0, start) + '*' + selectedText + '*' + text.substring(end);
                newCursorPos = end + 2;
                break;
            case 'bullet':
                if (selectedText.includes('\n')) {
                    // Add bullet points to each line
                    const lines = selectedText.split('\n');
                    const bulletedLines = lines.map((line)=>line.trim() ? `• ${line}` : '').join('\n');
                    newText = text.substring(0, start) + bulletedLines + text.substring(end);
                    newCursorPos = end + (bulletedLines.length - selectedText.length);
                } else {
                    newText = text.substring(0, start) + '• ' + selectedText + text.substring(end);
                    newCursorPos = end + 2;
                }
                break;
            case 'number':
                if (selectedText.includes('\n')) {
                    const lines = selectedText.split('\n');
                    const numberedLines = lines.map((line, index)=>line.trim() ? `${index + 1}. ${line}` : '').join('\n');
                    newText = text.substring(0, start) + numberedLines + text.substring(end);
                    newCursorPos = end + (numberedLines.length - selectedText.length);
                } else {
                    newText = text.substring(0, start) + '1. ' + selectedText + text.substring(end);
                    newCursorPos = end + 3;
                }
                break;
            case 'link':
                const url = prompt('Enter URL:');
                if (url) {
                    newText = text.substring(0, start) + `[${selectedText || 'link'}](${url})` + text.substring(end);
                    newCursorPos = end + (selectedText ? 0 : 4) + url.length + 3;
                }
                return;
            default:
                return;
        }
        setFormData((prev)=>({
                ...prev,
                description: newText
            }));
        // Restore cursor position after state update
        setTimeout(()=>{
            if (textareaRef.current) {
                textareaRef.current.focus();
                textareaRef.current.setSelectionRange(newCursorPos, newCursorPos);
            }
        }, 0);
    };
    const validateForm = ()=>{
        const newErrors = {};
        if (!formData.title.trim()) {
            newErrors.title = 'Title is required';
        } else if (formData.title.length < 3) {
            newErrors.title = 'Title must be at least 3 characters';
        }
        if (!formData.description.trim()) {
            newErrors.description = 'Description is required';
        } else if (formData.description.length < 50) {
            newErrors.description = 'Description must be at least 50 characters';
        }
        if (!formData.imageUrl) {
            newErrors.imageUrl = 'Please upload an image';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if (!validateForm()) {
            return;
        }
        setSaving(true);
        try {
            const url = isEditMode ? `/api/admin/blog/${blog.id}` : '/api/admin/blog';
            const method = isEditMode ? 'PUT' : 'POST';
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            let data;
            try {
                data = await response.json();
            } catch (jsonError) {
                console.error('JSON parse error:', jsonError);
                throw new Error('Server returned invalid response. Please try again.');
            }
            if (!response.ok) {
                throw new Error(data.error || `Failed to ${isEditMode ? 'update' : 'save'} blog (Status: ${response.status})`);
            }
            // Success
            const successMessage = isEditMode ? 'Blog updated successfully!' : 'Blog created successfully!';
            setSuccess(successMessage);
            // Reset form if not in edit mode
            if (!isEditMode) {
                setFormData({
                    title: '',
                    description: '',
                    imageUrl: ''
                });
                setImagePreview('');
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
            }
            // Call success callback if provided
            if (onSuccess) {
                setTimeout(()=>{
                    onSuccess(data.data);
                }, 1000);
            }
            // Clear success message after 3 seconds
            setTimeout(()=>{
                setSuccess('');
            }, 3000);
        } catch (err) {
            console.error('Save failed:', err);
            setErrors((prev)=>({
                    ...prev,
                    form: err.message || `Failed to ${isEditMode ? 'update' : 'save'} blog. Please try again.`
                }));
        } finally{
            setSaving(false);
        }
    };
    const handleChange = (e)=>{
        const { name, value } = e.target;
        setFormData((prev)=>({
                ...prev,
                [name]: value
            }));
        // Clear error for this field when user starts typing
        if (errors[name]) {
            setErrors((prev)=>({
                    ...prev,
                    [name]: ''
                }));
        }
    };
    const handleRemoveImage = ()=>{
        setFormData((prev)=>({
                ...prev,
                imageUrl: ''
            }));
        setImagePreview('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        setErrors((prev)=>({
                ...prev,
                imageUrl: ''
            }));
    };
    // Preview rendering function
    const renderPreview = ()=>{
        const formatText = (text)=>{
            // Convert markdown-like formatting to HTML
            let formatted = text// Convert line breaks to <br> for preview
            .replace(/\n/g, '<br>')// Convert paragraphs (double line breaks)
            .replace(/<br><br>/g, '</p><p>')// Convert bold **text** to <strong>
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')// Convert italic *text* to <em>
            .replace(/\*(.*?)\*/g, '<em>$1</em>')// Convert bullet points • to list items
            .replace(/•\s*(.*?)(?=<br>|$)/g, '<li>$1</li>')// Convert numbered lists 1. to list items
            .replace(/(\d+)\.\s*(.*?)(?=<br>|$)/g, '<li>$2</li>')// Convert links [text](url) to <a>
            .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-blue-600 hover:underline">$1</a>');
            // Wrap in paragraph tags
            return `<p>${formatted}</p>`;
        };
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "prose prose-lg max-w-none",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-gray-700 whitespace-pre-wrap",
                dangerouslySetInnerHTML: {
                    __html: formatText(formData.description)
                }
            }, void 0, false, {
                fileName: "[project]/components/Admin/components/AdminBlogForm.js",
                lineNumber: 302,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/Admin/components/AdminBlogForm.js",
            lineNumber: 301,
            columnNumber: 7
        }, this);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-2xl font-bold mb-6 text-gray-800",
                children: isEditMode ? 'Edit Blog Post' : 'Create New Blog Post'
            }, void 0, false, {
                fileName: "[project]/components/Admin/components/AdminBlogForm.js",
                lineNumber: 312,
                columnNumber: 7
            }, this),
            success && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-4 p-3 bg-green-100 text-green-700 rounded-md",
                children: success
            }, void 0, false, {
                fileName: "[project]/components/Admin/components/AdminBlogForm.js",
                lineNumber: 317,
                columnNumber: 9
            }, this),
            errors.form && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-4 p-3 bg-red-100 text-red-700 rounded-md",
                children: errors.form
            }, void 0, false, {
                fileName: "[project]/components/Admin/components/AdminBlogForm.js",
                lineNumber: 323,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                onSubmit: handleSubmit,
                className: "space-y-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block text-sm font-medium text-gray-700 mb-1",
                                children: "Blog Title *"
                            }, void 0, false, {
                                fileName: "[project]/components/Admin/components/AdminBlogForm.js",
                                lineNumber: 331,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                name: "title",
                                value: formData.title,
                                onChange: handleChange,
                                className: `w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.title ? 'border-red-500' : 'border-gray-300'}`,
                                placeholder: "Enter blog title"
                            }, void 0, false, {
                                fileName: "[project]/components/Admin/components/AdminBlogForm.js",
                                lineNumber: 334,
                                columnNumber: 11
                            }, this),
                            errors.title && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1 text-sm text-red-600",
                                children: errors.title
                            }, void 0, false, {
                                fileName: "[project]/components/Admin/components/AdminBlogForm.js",
                                lineNumber: 345,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Admin/components/AdminBlogForm.js",
                        lineNumber: 330,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block text-sm font-medium text-gray-700 mb-1",
                                children: "Featured Image *"
                            }, void 0, false, {
                                fileName: "[project]/components/Admin/components/AdminBlogForm.js",
                                lineNumber: 351,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-3",
                                children: [
                                    imagePreview || formData.imageUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-full max-w-md border-2 border-dashed border-gray-300 rounded-lg overflow-hidden",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                    src: imagePreview || formData.imageUrl,
                                                    alt: "Preview",
                                                    className: "w-full h-64 object-contain"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/Admin/components/AdminBlogForm.js",
                                                    lineNumber: 360,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/Admin/components/AdminBlogForm.js",
                                                lineNumber: 359,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: handleRemoveImage,
                                                className: "absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                    className: "w-5 h-5",
                                                    fill: "none",
                                                    stroke: "currentColor",
                                                    viewBox: "0 0 24 24",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        strokeLinecap: "round",
                                                        strokeLinejoin: "round",
                                                        strokeWidth: "2",
                                                        d: "M6 18L18 6M6 6l12 12"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/Admin/components/AdminBlogForm.js",
                                                        lineNumber: 372,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/Admin/components/AdminBlogForm.js",
                                                    lineNumber: 371,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/Admin/components/AdminBlogForm.js",
                                                lineNumber: 366,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/Admin/components/AdminBlogForm.js",
                                        lineNumber: 358,
                                        columnNumber: 15
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "border-2 border-dashed border-gray-300 rounded-lg p-8 text-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                className: "mx-auto h-12 w-12 text-gray-400",
                                                stroke: "currentColor",
                                                fill: "none",
                                                viewBox: "0 0 48 48",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    d: "M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02",
                                                    strokeWidth: "2",
                                                    strokeLinecap: "round",
                                                    strokeLinejoin: "round"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/Admin/components/AdminBlogForm.js",
                                                    lineNumber: 379,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/Admin/components/AdminBlogForm.js",
                                                lineNumber: 378,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-2 text-sm text-gray-600",
                                                children: "Upload a featured image"
                                            }, void 0, false, {
                                                fileName: "[project]/components/Admin/components/AdminBlogForm.js",
                                                lineNumber: 381,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-gray-500",
                                                children: "PNG, JPG, GIF up to 5MB"
                                            }, void 0, false, {
                                                fileName: "[project]/components/Admin/components/AdminBlogForm.js",
                                                lineNumber: 384,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/Admin/components/AdminBlogForm.js",
                                        lineNumber: 377,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "sr-only",
                                                        children: "Choose image"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/Admin/components/AdminBlogForm.js",
                                                        lineNumber: 393,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        ref: fileInputRef,
                                                        type: "file",
                                                        accept: "image/*",
                                                        onChange: handleImageUpload,
                                                        className: "block w-full text-sm text-gray-500   file:mr-4 file:py-2 file:px-4   file:rounded-md file:border-0   file:text-sm file:font-semibold   file:bg-blue-50 file:text-blue-700   hover:file:bg-blue-100   cursor-pointer"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/Admin/components/AdminBlogForm.js",
                                                        lineNumber: 394,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/Admin/components/AdminBlogForm.js",
                                                lineNumber: 392,
                                                columnNumber: 15
                                            }, this),
                                            uploading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-full bg-gray-200 rounded-full h-2.5",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "bg-blue-600 h-2.5 rounded-full animate-pulse w-1/2"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/Admin/components/AdminBlogForm.js",
                                                            lineNumber: 411,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/Admin/components/AdminBlogForm.js",
                                                        lineNumber: 410,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "mt-1 text-sm text-blue-600",
                                                        children: "Uploading image..."
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/Admin/components/AdminBlogForm.js",
                                                        lineNumber: 413,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/Admin/components/AdminBlogForm.js",
                                                lineNumber: 409,
                                                columnNumber: 17
                                            }, this),
                                            errors.imageUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-2 text-sm text-red-600",
                                                children: errors.imageUrl
                                            }, void 0, false, {
                                                fileName: "[project]/components/Admin/components/AdminBlogForm.js",
                                                lineNumber: 417,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/Admin/components/AdminBlogForm.js",
                                        lineNumber: 391,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/Admin/components/AdminBlogForm.js",
                                lineNumber: 355,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Admin/components/AdminBlogForm.js",
                        lineNumber: 350,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between items-center mb-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-sm font-medium text-gray-700",
                                        children: "Blog Content *"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Admin/components/AdminBlogForm.js",
                                        lineNumber: 426,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>setShowPreview(!showPreview),
                                        className: "text-sm text-blue-600 hover:text-blue-800",
                                        children: showPreview ? 'Show Editor' : 'Show Preview'
                                    }, void 0, false, {
                                        fileName: "[project]/components/Admin/components/AdminBlogForm.js",
                                        lineNumber: 429,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/Admin/components/AdminBlogForm.js",
                                lineNumber: 425,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap gap-2 mb-2 p-2 bg-gray-50 rounded-md border border-gray-200",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>insertFormatting('bold'),
                                        className: "px-3 py-1.5 text-sm font-bold bg-white border border-gray-300 rounded hover:bg-gray-50",
                                        title: "Bold (Ctrl+B)",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            children: "B"
                                        }, void 0, false, {
                                            fileName: "[project]/components/Admin/components/AdminBlogForm.js",
                                            lineNumber: 446,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/Admin/components/AdminBlogForm.js",
                                        lineNumber: 440,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>insertFormatting('italic'),
                                        className: "px-3 py-1.5 text-sm italic bg-white border border-gray-300 rounded hover:bg-gray-50",
                                        title: "Italic (Ctrl+I)",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("em", {
                                            children: "I"
                                        }, void 0, false, {
                                            fileName: "[project]/components/Admin/components/AdminBlogForm.js",
                                            lineNumber: 454,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/Admin/components/AdminBlogForm.js",
                                        lineNumber: 448,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>insertFormatting('bullet'),
                                        className: "px-3 py-1.5 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50 flex items-center",
                                        title: "Bullet List",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "mr-1",
                                                children: "•"
                                            }, void 0, false, {
                                                fileName: "[project]/components/Admin/components/AdminBlogForm.js",
                                                lineNumber: 462,
                                                columnNumber: 15
                                            }, this),
                                            " List"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/Admin/components/AdminBlogForm.js",
                                        lineNumber: 456,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>insertFormatting('number'),
                                        className: "px-3 py-1.5 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50",
                                        title: "Numbered List",
                                        children: "1. List"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Admin/components/AdminBlogForm.js",
                                        lineNumber: 464,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>insertFormatting('link'),
                                        className: "px-3 py-1.5 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50",
                                        title: "Insert Link",
                                        children: "🔗 Link"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Admin/components/AdminBlogForm.js",
                                        lineNumber: 472,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs text-gray-500 ml-auto flex items-center",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "Press Enter for new paragraph, Shift+Enter for line break"
                                        }, void 0, false, {
                                            fileName: "[project]/components/Admin/components/AdminBlogForm.js",
                                            lineNumber: 481,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/Admin/components/AdminBlogForm.js",
                                        lineNumber: 480,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/Admin/components/AdminBlogForm.js",
                                lineNumber: 439,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs text-gray-500 mb-2 p-2 bg-blue-50 rounded",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-2 gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    children: "Bold:"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/Admin/components/AdminBlogForm.js",
                                                    lineNumber: 488,
                                                    columnNumber: 20
                                                }, this),
                                                " **text**"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/Admin/components/AdminBlogForm.js",
                                            lineNumber: 488,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("em", {
                                                    children: "Italic:"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/Admin/components/AdminBlogForm.js",
                                                    lineNumber: 489,
                                                    columnNumber: 20
                                                }, this),
                                                " *text*"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/Admin/components/AdminBlogForm.js",
                                            lineNumber: 489,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: "Bullet: • item"
                                        }, void 0, false, {
                                            fileName: "[project]/components/Admin/components/AdminBlogForm.js",
                                            lineNumber: 490,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: "Numbered: 1. item"
                                        }, void 0, false, {
                                            fileName: "[project]/components/Admin/components/AdminBlogForm.js",
                                            lineNumber: 491,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: "Link: [text](url)"
                                        }, void 0, false, {
                                            fileName: "[project]/components/Admin/components/AdminBlogForm.js",
                                            lineNumber: 492,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: "Line break: Press Enter"
                                        }, void 0, false, {
                                            fileName: "[project]/components/Admin/components/AdminBlogForm.js",
                                            lineNumber: 493,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/Admin/components/AdminBlogForm.js",
                                    lineNumber: 487,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/Admin/components/AdminBlogForm.js",
                                lineNumber: 486,
                                columnNumber: 11
                            }, this),
                            showPreview ? // Preview Panel
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `border rounded-md p-4 min-h-[200px] bg-gray-50 ${errors.description ? 'border-red-500' : 'border-gray-300'}`,
                                children: formData.description ? renderPreview() : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-400 italic",
                                    children: "Preview will appear here..."
                                }, void 0, false, {
                                    fileName: "[project]/components/Admin/components/AdminBlogForm.js",
                                    lineNumber: 505,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/Admin/components/AdminBlogForm.js",
                                lineNumber: 499,
                                columnNumber: 13
                            }, this) : // Text Editor
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                ref: textareaRef,
                                name: "description",
                                value: formData.description,
                                onChange: handleChange,
                                rows: "15",
                                className: `w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm ${errors.description ? 'border-red-500' : 'border-gray-300'}`,
                                placeholder: "Write your blog content here...      Use **bold** for important text   Use *italic* for emphasis   Use • for bullet points   Use 1. for numbered lists   Press Enter for new paragraphs      Example:   **Introduction**   This is a sample blog post.      • First point   • Second point   • Third point      1. Step one   2. Step two   3. Step three"
                            }, void 0, false, {
                                fileName: "[project]/components/Admin/components/AdminBlogForm.js",
                                lineNumber: 510,
                                columnNumber: 13
                            }, this),
                            errors.description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1 text-sm text-red-600",
                                children: errors.description
                            }, void 0, false, {
                                fileName: "[project]/components/Admin/components/AdminBlogForm.js",
                                lineNumber: 542,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-1 flex justify-between text-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `${formData.description.length < 50 ? 'text-red-500' : 'text-gray-500'}`,
                                        children: "Minimum 50 characters required"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Admin/components/AdminBlogForm.js",
                                        lineNumber: 545,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `${formData.description.length >= 50 ? 'text-green-500' : 'text-gray-500'}`,
                                        children: [
                                            formData.description.length,
                                            " characters"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/Admin/components/AdminBlogForm.js",
                                        lineNumber: 548,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/Admin/components/AdminBlogForm.js",
                                lineNumber: 544,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Admin/components/AdminBlogForm.js",
                        lineNumber: 424,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "pt-4 flex justify-end space-x-3",
                        children: [
                            onCancel && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: onCancel,
                                disabled: uploading || saving,
                                className: "px-5 py-2.5 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
                                children: "Cancel"
                            }, void 0, false, {
                                fileName: "[project]/components/Admin/components/AdminBlogForm.js",
                                lineNumber: 559,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "submit",
                                disabled: uploading || saving,
                                className: `px-5 py-2.5 rounded-md font-medium text-white flex items-center ${uploading || saving ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'}`,
                                children: saving ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            className: "animate-spin -ml-1 mr-3 h-5 w-5 text-white",
                                            fill: "none",
                                            viewBox: "0 0 24 24",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                    className: "opacity-25",
                                                    cx: "12",
                                                    cy: "12",
                                                    r: "10",
                                                    stroke: "currentColor",
                                                    strokeWidth: "4"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/Admin/components/AdminBlogForm.js",
                                                    lineNumber: 581,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    className: "opacity-75",
                                                    fill: "currentColor",
                                                    d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/Admin/components/AdminBlogForm.js",
                                                    lineNumber: 582,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/Admin/components/AdminBlogForm.js",
                                            lineNumber: 580,
                                            columnNumber: 17
                                        }, this),
                                        isEditMode ? 'Updating...' : 'Publishing...'
                                    ]
                                }, void 0, true) : uploading ? 'Uploading Image...' : isEditMode ? 'Update Blog Post' : 'Publish Blog Post'
                            }, void 0, false, {
                                fileName: "[project]/components/Admin/components/AdminBlogForm.js",
                                lineNumber: 569,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Admin/components/AdminBlogForm.js",
                        lineNumber: 557,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/Admin/components/AdminBlogForm.js",
                lineNumber: 328,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/Admin/components/AdminBlogForm.js",
        lineNumber: 311,
        columnNumber: 5
    }, this);
}
_s(AdminBlogForm, "80kKx2MeTnUTBBwh5bKzAB87Jzw=");
_c = AdminBlogForm;
var _c;
__turbopack_context__.k.register(_c, "AdminBlogForm");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=components_Admin_components_AdminBlogForm_22a851b0.js.map