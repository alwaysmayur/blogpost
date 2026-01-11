import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Comment from '@/lib/models/Comment';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get('postId');

    if (!postId) {
        return NextResponse.json({ success: false, message: 'Post ID is required' }, { status: 400 });
    }

    try {
        await dbConnect();
        const comments = await Comment.find({ post: postId }).sort({ createdAt: -1 }).lean();
        return NextResponse.json({ success: true, data: comments });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        await dbConnect();
        const body = await request.json();
        const comment = await Comment.create(body);
        return NextResponse.json({ success: true, data: comment }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
