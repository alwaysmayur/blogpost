import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true,
    },
    author: {
        type: String,
        required: [true, 'Please provide your name.'],
    },
    email: {
        type: String,
        required: [true, 'Please provide your email.'],
    },
    comment: {
        type: String,
        required: [true, 'Please provide a comment.'],
    },
    rating: {
        type: Number,
        required: [true, 'Please provide a rating.'],
        min: 1,
        max: 5,
    },
    date: {
        type: Date,
        default: Date.now,
    }
}, {
    timestamps: true,
});

// Prevent model overwrite in dev mode
const Comment = mongoose.models.Comment || mongoose.model('Comment', CommentSchema);
export default Comment;
