'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Sidebar.module.css';
import { guides } from '../../data/posts';
import { api } from '../../lib/api';

export default function Sidebar({ currentBlogId }) {
    const [exploreBlogs, setExploreBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        fetchRandomBlogs();

        // Detect mobile screen
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, [currentBlogId]);

    const fetchRandomBlogs = async () => {
        try {
            const response = await api.getBlogs();
            if (response.success) {
                // Filter out current blog and get random 3
                const filteredBlogs = response.data.filter(blog => blog._id !== currentBlogId);
                const randomBlogs = shuffleArray(filteredBlogs).slice(0, 3);
                setExploreBlogs(randomBlogs);
            }
        } catch (error) {
            console.error('Error fetching blogs:', error);
        } finally {
            setLoading(false);
        }
    };

    const shuffleArray = (array) => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % exploreBlogs.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + exploreBlogs.length) % exploreBlogs.length);
    };

    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, i) => (
            <span key={i} className={i < rating ? styles.star__filled : styles.star__empty}>
                ★
            </span>
        ));
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'Recent';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
    };

    const renderBlogCard = (blog) => (
        <Link href={`/blog/${blog.slug}`} key={blog._id}>
            <article className={styles.explore__article}>
                <div className={styles.explore__image}>
                    <Image
                        src={blog.heroImage || '/images/placeholder.jpg'}
                        alt={blog.title}
                        width={400}
                        height={225}
                        style={{ objectFit: 'cover' }}
                    />
                </div>
                <div className={styles.explore__content}>
                    <div className={styles.explore__meta}>
                        <span className={styles.explore__category}>{blog.category || 'ARTICLE'}</span>
                        <span className={styles.explore__separator}>|</span>
                        <time className={styles.explore__date}>{formatDate(blog.createdAt)}</time>
                    </div>
                    <h4 className={styles.explore__title}>
                        {blog.title.length > 80 ? blog.title.substring(0, 80) + '..' : blog.title}
                    </h4>
                </div>
            </article>
        </Link>
    );

    return (
        <aside className={styles.sidebar}>
            {/* Explore more */}
            <section className={styles.section}>
                <div className={styles.section__header}>
                    <h3 className={styles.section__title}>Explore more</h3>
                </div>

                <div className={styles.explore__list}>
                    {loading ? (
                        <div className={styles.loading}>Loading...</div>
                    ) : exploreBlogs.length > 0 ? (
                        <>
                            {isMobile ? (
                                renderBlogCard(exploreBlogs[currentIndex])
                            ) : (
                                exploreBlogs.map(renderBlogCard)
                            )}

                            {isMobile && exploreBlogs.length > 1 && (
                                <div className={styles.carousel__nav}>
                                    <button onClick={handlePrev} className={styles.nav__btn} aria-label="Previous">
                                        <span className={styles.nav__icon}>←</span>
                                        <span>Previous</span>
                                    </button>
                                    <button onClick={handleNext} className={styles.nav__btn} aria-label="Next">
                                        <span>Next</span>
                                        <span className={styles.nav__icon}>→</span>
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className={styles.empty}>No blogs available</div>
                    )}
                </div>
            </section>

            {/* Tour Guides */}
            <section className={styles.section}>
                <h3 className={styles.section__title}>Tour Guides</h3>
                <div className={styles.guides}>
                    {guides.map((guide) => (
                        <article key={guide.id} className={styles.guide}>
                            <div className={styles.guide__content}>
                                <div className={styles.guide__avatar__wrapper}>
                                    {guide.avatar ? (
                                        <Image
                                            src={guide.avatar}
                                            alt={guide.name}
                                            width={60}
                                            height={60}
                                            style={{ borderRadius: '50%', objectFit: 'cover' }}
                                        />
                                    ) : (
                                        <div className={styles.guide__avatar}>
                                            {guide.name.charAt(0)}
                                        </div>
                                    )}
                                </div>
                                <div className={styles.guide__info}>
                                    <h4 className={styles.guide__name}>{guide.name}</h4>
                                    <p className={styles.guide__location}>
                                        <span className={styles.location__icon}>📍</span> {guide.location}
                                    </p>
                                </div>
                            </div>
                            <div className={styles.guide__rating}>
                                {renderStars(Math.floor(guide.rating))}
                                <span className={styles.guide__rating__value}>({guide.rating.toFixed(1)})</span>
                            </div>
                        </article>
                    ))}
                </div>
            </section>
        </aside>
    );
}
