import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/src/lib/mails/send-email';

export async function POST(req: NextRequest) {
  try {
    const { type, to, props } = await req.json();

    if (!type || !to || !props) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 },
      );
    }

    await sendEmail({ type, to, props });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 },
    );
  }
}
