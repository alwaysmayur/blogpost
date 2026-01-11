import { useState, useEffect, useCallback } from 'react';
import { api } from '@/lib/api';

export function useComments(postId) {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadComments = useCallback(async () => {
        if (!postId) return;
        try {
            setLoading(true);
            const data = await api.getComments(postId);
            if (data.success) {
                setComments(data.data);
            } else {
                setError(data.message || 'Failed to load comments');
            }
        } catch (err) {
            setError('Failed to load comments');
        } finally {
            setLoading(false);
        }
    }, [postId]);

    useEffect(() => {
        loadComments();
    }, [loadComments]);

    const addComment = async (commentData) => {
        try {
            // Map frontend fields to backend schema
            const payload = {
                ...commentData,
                author: commentData.name, // Map name to author
                post: postId,             // Map postId to post
            };

            // Remove 'name' if strict schema validation complains, though mongoose usually ignores extras.
            // Keeping it simple.

            const data = await api.createComment(payload);
            if (data.success) {
                setComments((prev) => [data.data, ...prev]);
                return { success: true };
            } else {
                return { success: false, message: data.message };
            }
        } catch (err) {
            return { success: false, message: 'Network error' };
        }
    };

    return { comments, loading, error, addComment };
}
