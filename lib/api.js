const getBaseUrl = () => {
    if (typeof window !== 'undefined') {
        return ''; // Relative path for client-side
    }
    return process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
};

const fetcher = async (endpoint, options = {}) => {
    const url = `${getBaseUrl()}${endpoint}`;

    const defaultHeaders = {
        'Content-Type': 'application/json',
    };

    const config = {
        ...options,
        headers: {
            ...defaultHeaders,
            ...options.headers,
        },
    };

    try {
        const res = await fetch(url, config);
        const data = await res.json();
        return data;
    } catch (error) {
        console.error(`API Error (${endpoint}):`, error);
        return { success: false, message: error.message };
    }
};

export const api = {
    // Blog APIs
    getBlogs: () => fetcher('/api/blog', { cache: 'no-store' }),
    getBlogBySlug: (slug) => fetcher(`/api/blog/${slug}`, { cache: 'no-store' }),
    createBlog: (data) => fetcher('/api/blog', {
        method: 'POST',
        body: JSON.stringify(data),
    }),
    updateBlog: (slug, data) => fetcher(`/api/blog/${slug}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    }),
    deleteBlog: (slug) => fetcher(`/api/blog/${slug}`, {
        method: 'DELETE',
    }),

    // Comment APIs
    getComments: (postId) => fetcher(`/api/blog/comments?postId=${postId}`, { cache: 'no-store' }),
    createComment: (data) => fetcher('/api/blog/comments', {
        method: 'POST',
        body: JSON.stringify(data),
    }),
};
