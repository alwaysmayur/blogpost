import Link from 'next/link';
import Image from 'next/image';
import styles from './BlogCard.module.css';

export default function BlogCard({ blog }) {
    const formatDate = (dateString) => {
        if (!dateString) return 'Recent';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
    };

    const cleanExcerpt = (content) => {
        if (!content) return '';
        // Remove HTML tags
        const plainText = content.replace(/<[^>]*>?/gm, '');
        // Remove redundant title if it's at the start
        const cleaned = plainText.startsWith(blog.title)
            ? plainText.replace(blog.title, '').trim()
            : plainText.trim();
        return cleaned.substring(0, 120) + (cleaned.length > 120 ? '...' : '');
    };

    return (
        <Link href={`/blog/${blog.slug}`} className={styles.card}>
            {blog.heroImage && (
                <div className={styles.imageWrapper}>
                    <Image
                        src={blog.heroImage}
                        alt={blog.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className={styles.image}
                    />
                </div>
            )}
            <div className={styles.content}>
                <div className={styles.meta}>
                    <span className={styles.category}>{blog.category || 'ARTICLE'}</span>
                    <span className={styles.separator}>|</span>
                    <time className={styles.date}>{formatDate(blog.createdAt || blog.date)}</time>
                </div>
                <h2 className={styles.title}>{blog.title}</h2>
                <p className={styles.excerpt}>{cleanExcerpt(blog.content)}</p>
                <div className={styles.footer}>
                    <span className={styles.readMore}>Read article</span>
                </div>
            </div>
        </Link>
    );
}
