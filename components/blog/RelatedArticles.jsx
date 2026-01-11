'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './RelatedArticles.module.css';
import { api } from '../../lib/api';

export default function RelatedArticles({ category, currentBlogId }) {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (category && currentBlogId) {
            fetchRelatedArticles();
        }
    }, [category, currentBlogId]);

    const fetchRelatedArticles = async () => {
        try {
            const response = await api.getBlogs();
            if (response.success) {
                // Filter by category and exclude current blog

                // Shuffle and take 4
                const shuffled = response.data.filter(blog => blog._id !== currentBlogId).sort(() => 0.5 - Math.random());
                setArticles(shuffled.slice(0, 4));
            }
        } catch (error) {
            console.error('Error fetching related articles:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className={styles.loading}>Loading related articles...</div>;
    }

    if (articles.length === 0) {
        return null;
    }

    return (
        <section className={styles.related}>
            <h2 className={styles.related_title}>Related articles</h2>
            <div className={styles.related_grid}>
                {articles.map((article) => (
                    <Link href={`/blog/${article.slug}`} key={article._id} className={styles.article_link}>
                        <article className={styles.article}>
                            <div className={styles.article_image}>
                                <Image
                                    src={article.heroImage || '/images/placeholder.jpg'}
                                    alt={article.title}
                                    width={400}
                                    height={250}
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                            <div className={styles.article_content}>
                                <h3 className={styles.article_title}>
                                    {article.title.length > 60 ? article.title.substring(0, 60) + '...' : article.title}
                                </h3>
                                <p className={styles.article_excerpt}>
                                    {article.content.replace(/<[^>]*>/g, '').substring(0, 100)}...
                                </p>
                                <span className={styles.article_read_time}>
                                    {` By ${article.author.name}`}
                                </span>
                            </div>
                        </article>
                    </Link>
                ))}
            </div>
        </section>
    );
}
