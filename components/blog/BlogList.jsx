import BlogCard from './BlogCard';
import styles from './BlogList.module.css';

export default function BlogList({ blogs }) {
    return (
        <div className={styles.grid}>
            {blogs && blogs.length > 0 ? (
                blogs.map((blog) => (
                    <BlogCard key={blog._id} blog={blog} />
                ))
            ) : (
                <p className={styles.empty}>No posts found.</p>
            )}
        </div>
    );
}
