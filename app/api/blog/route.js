import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Blog from '@/lib/models/Blog';

export async function GET() {
    try {
        await dbConnect();
        const posts = await Blog.find({}).sort({ createdAt: -1 }).lean();
        return NextResponse.json({ success: true, data: posts });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        await dbConnect();
        const body = await request.json();

        let slug = body.title
            .toLowerCase()
            .replace(/ /g, '-')
            .replace(/[^\w-]+/g, '');

        const post = await Blog.create({ ...body, slug });
        return NextResponse.json({ success: true, data: post }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
