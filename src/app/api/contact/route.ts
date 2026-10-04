import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, message } = body;

        // Validate input
        if (!name || typeof name !== 'string' || name.trim() === '') {
            return NextResponse.json({ error: 'Name is required' }, { status: 400 });
        }
        if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
        }
        if (!message || typeof message !== 'string' || message.trim() === '') {
            return NextResponse.json({ error: 'Message is required' }, { status: 400 });
        }
        if (message.length > 5000) {
            return NextResponse.json({ error: 'Message must be less than 5000 characters' }, { status: 400 });
        }

        // In a real application, you would send an email here using SendGrid, Resend, etc.
        // e.g., await sendEmail({ to: 'asad@example.com', from: email, subject: `Portfolio Contact from ${name}`, text: message })

        // Simulate slight delay for realistic UX
        await new Promise(resolve => setTimeout(resolve, 800));

        return NextResponse.json(
            { success: true, message: 'Message sent successfully.' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Contact API Error:', error);
        return NextResponse.json(
            { error: 'Internal server error. Please try again later.' },
            { status: 500 }
        );
    }
}
