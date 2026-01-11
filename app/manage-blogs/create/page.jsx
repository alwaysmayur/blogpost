'use client';

import { useRouter } from 'next/navigation';
import BlogForm from '@/components/blog/BlogForm';
import { api } from '@/lib/api';
import styles from './page.module.css';

export default function CreateBlogPage() {
    const router = useRouter();

    const handleSubmit = async (formData) => {
        const response = await api.createBlog(formData);

        if (response.success) {
            alert('Blog post created successfully!');
            router.push('/manage-blogs');
        } else {
            alert(`Failed to create blog: ${response.message}`);
        }
    };

    const handleCancel = () => {
        router.push('/manage-blogs');
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Create New Blog Post</h1>
            <p className={styles.subtitle}>Share your thoughts and ideas with the world</p>
            <BlogForm
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                isEditing={false}
            />
        </div>
    );
}
