import Link from 'next/link';
import styles from '@/styles/Home.module.css';
import BlogList from '@/components/blog/BlogList';
import dbConnect from '@/lib/db';
import Blog from '@/lib/models/Blog';

// Async Server Component
export default async function Home() {
    let posts = [];

    try {
        await dbConnect();
        posts = await Blog.find({}).sort({ createdAt: -1 }).lean();
        posts = JSON.parse(JSON.stringify(posts));
    } catch (error) {
        console.error('Failed to fetch posts:', error);
    }

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <Link href="/manage-blogs" className={styles.manageButton}>
                    Manage Blogs
                </Link>
            </header>
            <main className={styles.main}>
                <h1 className={styles.title}>Welcome to the Blog</h1>
                <p className={styles.description}>
                    Check out our latest articles:
                </p>
                <BlogList blogs={posts} />
            </main>
        </div>
    );
}
