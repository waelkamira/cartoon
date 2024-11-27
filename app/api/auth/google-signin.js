// app/api/auth/google-signin.js
import fetch from 'node-fetch';
export async function POST(req) {
  console.log(
    'هنا **************************************************************************'
  );
  const { credential } = await req.json();

  if (!credential) {
    return new Response(
      JSON.stringify({ message: 'Missing credential token' }),
      { status: 400 }
    );
  }

  try {
    // تحقق من التوكن المرسل من Google
    const response = await fetch(
      `https://oauth2.googleapis.com/tokeninfo?id_token=${credential}`
    );
    const googleUser = await response.json();

    if (!googleUser || !googleUser.email_verified) {
      return new Response(JSON.stringify({ message: 'Invalid Google token' }), {
        status: 401,
      });
    }

    // إرسال بيانات المستخدم بعد التحقق
    return new Response(
      JSON.stringify({
        message: 'User verified',
        user: {
          name: googleUser.name,
          email: googleUser.email,
          picture: googleUser.picture,
        },
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error verifying Google token:', error);
    return new Response(JSON.stringify({ message: 'Internal server error' }), {
      status: 500,
    });
  }
}
