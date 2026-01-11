'use client';

import Image from 'next/image';
import AboutAuthor from './AboutAuthor';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import Sidebar from './Sidebar';
import RelatedArticles from './RelatedArticles';
import styles from './BlogContent.module.css';
import { useComments } from '../../hooks/useComments';
import { relatedArticles } from '../../data/posts';

export default function BlogContent({ blog, prevPost, nextPost }) {
    // Comments Hook
    const { comments, loading, error, addComment } = useComments(blog._id);
    return (
        <article className={styles.article}>
            {/* Header Section (Title & Breadcrumb) */}
            <div className={styles.blog_header}>
                <div className={styles.breadcrumb}>HOME / ARTICLES /</div>
                <h1 className={styles.blog_title}>{blog.title}</h1>
            </div>

            {/* Hero Section */}
            <div className={styles.hero}>
                <Image
                    src={blog.heroImage}
                    alt={blog.title}
                    width={1200}
                    height={600}
                    priority
                    style={{ objectFit: 'cover' }}
                />
            </div>

            <div className={styles.container}>
                <div className={styles.content_wrapper}>
                    <div className={styles.main_content}>
                        {/* Author Info */}
                        <div className={styles.author_info}>
                            <div className={styles.author_profile}>
                                <div className={styles.author_avatar}>

                                    <img
                                        src={blog.author.avatar}
                                        alt={blog.author.name}
                                    />
                                </div>
                                <h3 className={styles.author_name}>{blog.author.name}</h3>
                            </div>
                            <time className={styles.post_date}>{blog.date}</time>
                        </div>

                        {/* Post Content */}
                        <div className={styles.post__content} dangerouslySetInnerHTML={{ __html: blog.content }} />

                        {/* Author Bio (Testimonial) & Navigation */}
                        <AboutAuthor author={blog.author} prevPost={prevPost} nextPost={nextPost} />
                    </div>

                    {/* Sidebar */}
                    <Sidebar currentBlogId={blog._id} />

                    {/* Comments Section (Now a direct child of the grid for reordering) */}
                    <div className={styles.comments_section}>
                        <CommentList comments={comments} loading={loading} error={error} />
                        <CommentForm onAddComment={addComment} />
                    </div>
                </div>

                {/* Related Articles Section */}
                <RelatedArticles category={blog.category} currentBlogId={blog._id} />
            </div>
        </article>
    );
}
