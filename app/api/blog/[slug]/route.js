import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Blog from '@/lib/models/Blog';

export async function GET(request, { params }) {
    const { slug } = await params;
    try {
        await dbConnect();
        const post = await Blog.findOne({ slug }).populate('author').lean();
        if (!post) {
            return NextResponse.json({ success: false, message: 'Post not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: post });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}

export async function PUT(request, { params }) {
    const { slug } = await params;
    try {
        await dbConnect();
        const body = await request.json();
        const updatedPost = await Blog.findOneAndUpdate({ slug }, body, { new: true }).lean();
        if (!updatedPost) {
            return NextResponse.json({ success: false, message: 'Post not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: updatedPost });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    const { slug } = await params;
    try {
        await dbConnect();
        const deletedPost = await Blog.findOneAndDelete({ slug }).lean();
        if (!deletedPost) {
            return NextResponse.json({ success: false, message: 'Post not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, message: 'Post deleted successfully' });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
