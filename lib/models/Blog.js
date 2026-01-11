import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a title for this post.'],
        maxlength: [60, 'Title cannot be more than 60 characters'],
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    content: {
        type: String,
        required: [true, 'Please provide the post content.'],
    },
    author: {
        name: String,
        avatar: String,
        bio: String,
    },
    date: {
        type: String,
        default: () => new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).toUpperCase(),
    },
    category: {
        type: String,
        required: true,
    },
    heroImage: {
        type: String,
    },
}, {
    timestamps: true,
});

// Prevent model overwrite in dev mode
const Blog = mongoose.models.Blog || mongoose.model('Blog', PostSchema);
export default Blog;
