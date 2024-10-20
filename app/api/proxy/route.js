import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // إرسال الطلب إلى المصدر مباشرةً من الخادم
    const response = await fetch('https://a.magsrv.com/ad-provider.js', {
      method: 'GET',
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch resource' },
        { status: response.status }
      );
    }

    const data = await response.text(); // احصل على الرد كـ JavaScript

    // إرجاع البيانات التي تم جلبها
    return new NextResponse(data, {
      headers: { 'Content-Type': 'application/javascript' }, // تأكد من إرجاع السكريبت كـ JavaScript
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error', details: error.message },
      { status: 500 }
    );
  }
}
