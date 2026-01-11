import BlogContent from '@/components/blog/BlogContent';
import { notFound } from 'next/navigation';
import { api } from '@/lib/api';

// Force dynamic rendering to support internal API calls during runtime
export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {

    const { slug } = await params;
    const result = await api.getBlogBySlug(slug);
    console.log(result);

    const post = result.success ? result.data : null;

    if (!post) {
        return {
            title: 'Post Not Found',
        };
    }

    return {
        title: post.title,
        description: post.content.substring(0, 160),
        openGraph: {
            title: post.title,
            images: [post.heroImage],
        },
    };
}

export default async function BlogPostPage({ params }) {

    const { slug } = await params;
    const result = await api.getBlogBySlug(slug);

    if (!result.success) {
        return (
            <div style={{ padding: '2rem', textAlign: 'center' }}>
                <h1>Error Loading Post</h1>
                <p>{result.message || 'Unknown error'}</p>
                <p>Slug: {slug}</p>
            </div>
        );
    }

    const post = result.data;
    if (!post) {
        notFound();
    }

    // Fetch all blogs to determine prev/next
    const allBlogsResult = await api.getBlogs();
    const allBlogs = allBlogsResult.success ? allBlogsResult.data : [];

    // Find current post index
    const currentIndex = allBlogs.findIndex(blog => blog.slug === slug);

    // Determine prev and next posts
    const prevPost = currentIndex > 0 ? allBlogs[currentIndex - 1] : null;
    const nextPost = currentIndex < allBlogs.length - 1 ? allBlogs[currentIndex + 1] : null;

    return <BlogContent blog={post} prevPost={prevPost} nextPost={nextPost} />;
}
