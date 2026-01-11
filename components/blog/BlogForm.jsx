'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import styles from './BlogForm.module.css';

const RichTextEditor = dynamic(() => import('./RichTextEditor'), {
    loading: () => <div className={styles.editor__loading}>Loading editor...</div>,
    ssr: false,
});

export default function BlogForm({ initialData = {}, onSubmit, onCancel, isEditing = false }) {
    const [formData, setFormData] = useState({
        title: initialData.title || '',
        content: initialData.content || '',
        heroImage: initialData.heroImage || '',
        category: initialData.category || '',
        'author.name': initialData.author?.name || '',
        'author.avatar': initialData.author?.avatar || '',
        'author.bio': initialData.author?.bio || '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleContentChange = (newContent) => {
        setFormData(prev => ({ ...prev, content: newContent }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Transform flat form data to nested structure
        const submitData = {
            title: formData.title,
            content: formData.content,
            heroImage: formData.heroImage,
            category: formData.category,
            author: {
                name: formData['author.name'],
                avatar: formData['author.avatar'],
                bio: formData['author.bio'],
            },
        };

        await onSubmit(submitData);
        setIsSubmitting(false);
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.form__group}>
                <label htmlFor="title">Title *</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    maxLength={60}
                />
            </div>

            <div className={styles.form__group}>
                <label htmlFor="category">Category *</label>
                <input
                    type="text"
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className={styles.form__group}>
                <label htmlFor="heroImage">Hero Image URL</label>
                <input
                    type="text"
                    id="heroImage"
                    name="heroImage"
                    value={formData.heroImage}
                    onChange={handleChange}
                    placeholder="https://example.com/image.jpg"
                />
            </div>

            <div className={styles.form__row}>
                <div className={styles.form__group}>
                    <label htmlFor="author.name">Author Name</label>
                    <input
                        type="text"
                        id="author.name"
                        name="author.name"
                        value={formData['author.name']}
                        onChange={handleChange}
                    />
                </div>

                <div className={styles.form__group}>
                    <label htmlFor="author.avatar">Author Avatar URL</label>
                    <input
                        type="text"
                        id="author.avatar"
                        name="author.avatar"
                        value={formData['author.avatar']}
                        onChange={handleChange}
                        placeholder="https://example.com/avatar.jpg"
                    />
                </div>
            </div>

            <div className={styles.form__group}>
                <label htmlFor="author.bio">Author Bio</label>
                <textarea
                    id="author.bio"
                    name="author.bio"
                    value={formData['author.bio']}
                    onChange={handleChange}
                    rows="3"
                />
            </div>

            <div className={styles.form__group}>
                <label>Content *</label>
                <RichTextEditor
                    initialContent={formData.content}
                    onSave={handleContentChange}
                    onCancel={() => { }}
                />
            </div>

            <div className={styles.form__actions}>
                <button
                    type="button"
                    onClick={onCancel}
                    className={styles.btn__secondary}
                    disabled={isSubmitting}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className={styles.btn__primary}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Saving...' : (isEditing ? 'Update Post' : 'Create Post')}
                </button>
            </div>
        </form>
    );
}
