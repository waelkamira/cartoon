import puppeteer from 'puppeteer';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const videoId = searchParams.get('videoId');

  if (!videoId) {
    return new Response(JSON.stringify({ error: 'videoId is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(`https://zidwish.com/${videoId}`, {
      waitUntil: 'domcontentloaded',
    });

    // استخراج رابط الفيديو
    const videoUrl = await page.evaluate(() => {
      const videoElement = document.querySelector('video');
      return videoElement ? videoElement.src : null;
    });

    await browser.close();

    if (!videoUrl) {
      return new Response(
        JSON.stringify({ error: 'Failed to extract video URL' }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    return new Response(JSON.stringify({ videoUrl }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error details:', error.message);
    return new Response(JSON.stringify({ error: 'Failed to fetch video' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
