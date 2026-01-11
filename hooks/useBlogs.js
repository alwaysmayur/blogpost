import { useState, useEffect, useCallback } from 'react';
import { api } from '@/lib/api';

export function useBlogs() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                setLoading(true);
                const result = await api.getBlogs();
                if (result.success) {
                    setBlogs(result.data);
                } else {
                    setError(result.message);
                }
            } catch (err) {
                setError('Failed to fetch blogs');
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    return { blogs, loading, error };
}

export function useBlog(slug) {
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchBlog = useCallback(async () => {
        if (!slug) return;
        try {
            setLoading(true);
            const result = await api.getBlogBySlug(slug);
            if (result.success) {
                setBlog(result.data);
            } else {
                setError(result.message);
            }
        } catch (err) {
            setError('Failed to fetch blog');
        } finally {
            setLoading(false);
        }
    }, [slug]);

    useEffect(() => {
        fetchBlog();
    }, [fetchBlog]);

    return { blog, loading, error, refetch: fetchBlog };
}
