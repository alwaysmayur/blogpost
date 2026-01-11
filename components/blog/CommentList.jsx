'use client';
import styles from './CommentList.module.css';

export default function CommentList({ comments, loading, error }) {
    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, i) => (
            <span key={i} className={i < rating ? styles.star_filled : styles.star_empty}>★</span>
        ));
    };

    if (loading) return <div className={styles.loading}>Loading comments...</div>;
    if (error) return <div className={styles.error}>{error}</div>;

    return (
        <section className={styles.comments}>
            <div className={styles.header}>
                <div className={styles.bullet}></div>
                <h2 className={styles.comments_title}>Comments</h2>
            </div>

            <div className={styles.comments_list}>
                {comments.length > 0 ? (
                    comments.map((comment) => (
                        <article key={comment._id} className={styles.comment}>
                            <div className={styles.comment_avatar}>
                                <img
                                    src={`/images/avatar5.png`}
                                    alt={comment.author}
                                />
                            </div>
                            <div className={styles.comment_content}>
                                <div className={styles.comment_meta}>
                                    <h3 className={styles.comment_author}>{comment.author}</h3>
                                    <div className={styles.comment_rating}>
                                        {renderStars(comment.rating)}
                                        <span className={styles.comment_rating_value}>({comment.rating.toFixed(1)})</span>
                                    </div>
                                    <time className={styles.comment_date}>
                                        {new Date(comment.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                                    </time>
                                </div>
                                <p className={styles.comment_text}>{comment.comment}</p>
                            </div>
                        </article>
                    ))
                ) : (
                    <p className={styles.no_comments}>No comments yet. Be the first to comment!</p>
                )}
            </div>
        </section>
    );
}
