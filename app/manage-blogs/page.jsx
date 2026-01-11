'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import styles from './page.module.css';

export default function ManageBlogsPage() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        setLoading(true);
        const response = await api.getBlogs();
        if (response.success) {
            setBlogs(response.data);
        }
        setLoading(false);
    };

    const handleDelete = async (slug, title) => {
        if (!confirm(`Are you sure you want to delete "${title}"?`)) {
            return;
        }

        const response = await api.deleteBlog(slug);
        if (response.success) {
            alert('Blog post deleted successfully!');
            fetchBlogs(); // Refresh list
        } else {
            alert(`Failed to delete: ${response.message}`);
        }
    };

    if (loading) {
        return <div className={styles.loading}>Loading blogs...</div>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Manage Blogs</h1>
                <Link href="/manage-blogs/create" className={styles.btn_create}>
                    + Create New Blog
                </Link>
            </div>

            {blogs.length === 0 ? (
                <div className={styles.empty}>
                    <p>No blog posts yet. Create your first one!</p>
                </div>
            ) : (
                <div className={styles.table_wrapper}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Category</th>
                                <th>Author</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {blogs.map((blog) => (
                                <tr key={blog._id}>
                                    <td>
                                        <Link href={`/blog/${blog.slug}`} className={styles.blog_title}>
                                            {blog.title}
                                        </Link>
                                    </td>
                                    <td>{blog.category}</td>
                                    <td>{blog.author?.name || 'Unknown'}</td>
                                    <td>{blog.date}</td>
                                    <td>
                                        <div className={styles.actions}>
                                            <Link
                                                href={`/manage-blogs/edit/${blog.slug}`}
                                                className={styles.btn_edit}
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(blog.slug, blog.title)}
                                                className={styles.btn_delete}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
