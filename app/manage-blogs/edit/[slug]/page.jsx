'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import BlogForm from '@/components/blog/BlogForm';
import { api } from '@/lib/api';
import styles from './page.module.css';

export default function EditBlogPage({ params }) {
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const { slug } = use(params); // Unwrap the Promise

    useEffect(() => {
        fetchBlog();
    }, [slug]);

    const fetchBlog = async () => {
        const response = await api.getBlogBySlug(slug);
        if (response.success) {
            setBlog(response.data);
        } else {
            alert('Blog not found');
            router.push('/manage-blogs');
        }
        setLoading(false);
    };

    const handleSubmit = async (formData) => {
        const response = await api.updateBlog(slug, formData);

        if (response.success) {
            alert('Blog post updated successfully!');
            router.push('/manage-blogs');
        } else {
            alert(`Failed to update blog: ${response.message}`);
        }
    };

    const handleCancel = () => {
        router.push('/manage-blogs');
    };

    if (loading) {
        return <div className={styles.loading}>Loading blog...</div>;
    }

    if (!blog) {
        return <div className={styles.error}>Blog not found</div>;
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Edit Blog Post</h1>
            <p className={styles.subtitle}>Update and refine your content</p>
            <BlogForm
                initialData={blog}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                isEditing={true}
            />
        </div>
    );
}
