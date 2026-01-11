'use client';
import { useState } from 'react';
import styles from './CommentForm.module.css';
import Button from '../ui/Button';

export default function CommentForm({ onAddComment }) {
    const [formData, setFormData] = useState({ name: '', email: '', comment: '', rating: 5 });
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        const result = await onAddComment(formData);
        setSubmitting(false);
        if (result.success) {
            setFormData({ name: '', email: '', comment: '', rating: 5 });
            alert('Comment submitted successfully!');
        } else {
            alert(result.message || 'Failed to submit comment');
        }
    };

    const ratingOptions = [
        { value: 1, label: 'Angry', emoji: '😡', color: '#ff4d4f' },
        { value: 2, label: 'Sad', emoji: '🙁', color: '#ff9c6e' },
        { value: 3, label: 'Neutral', emoji: '😐', color: '#ffc53d' },
        { value: 4, label: 'Smile', emoji: '🙂', color: '#40a9ff' },
        { value: 5, label: 'Good', emoji: '😊', color: '#00c853' },
    ];

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <div className={styles.bullet}></div>
                <h3 className={styles.title}>Add A Comment</h3>
            </div>

            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.mainGrid}>
                    <div className={styles.leftColumn}>
                        <div className={styles.group}>
                            <label className={styles.label}>Name</label>
                            <input
                                type="text"
                                required
                                className={styles.input}
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                        <div className={styles.group}>
                            <label className={styles.label}>Email</label>
                            <input
                                type="email"
                                required
                                className={styles.input}
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className={styles.rightColumn}>
                        <div className={`${styles.group} ${styles.fullHeight}`}>
                            <label className={styles.label}>Comment</label>
                            <textarea
                                required
                                className={styles.textarea}
                                placeholder="Search Anything..."
                                value={formData.comment}
                                onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                            ></textarea>
                        </div>
                    </div>
                </div>

                <div className={styles.footer}>
                    <div className={styles.ratingSection}>
                        <span className={styles.ratingLabel}>Rate The Usefulness Of The Article</span>
                        <div className={styles.ratingOptions}>
                            {ratingOptions.map((option) => {
                                const isSelected = formData.rating === option.value;
                                return (
                                    <button
                                        key={option.value}
                                        type="button"
                                        className={`${styles.ratingButton} ${isSelected ? styles.selected : ''}`}
                                        onClick={() => setFormData({ ...formData, rating: option.value })}
                                        style={isSelected ? { backgroundColor: option.color, borderColor: option.color } : {}}
                                    >
                                        <span className={styles.emoji}>{option.emoji}</span>
                                        {isSelected && <span className={styles.ratingText}>{option.label}</span>}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <button type="submit" disabled={submitting} className={styles.sendButton}>
                        {submitting ? 'Sending...' : (
                            <>
                                <span className={styles.sendIcon}>💬</span> Send
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
