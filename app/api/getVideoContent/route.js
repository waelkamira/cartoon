// /pages/api/getVideoContent.js
export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { videoUrl } = req.query;

    if (!videoUrl) {
      return res.status(400).json({ error: 'Video URL is required' });
    }

    try {
      // معالجة أو جلب البيانات من مصدر الفيديو بناءً على الـ videoUrl
      const videoDetails = await fetchVideoDetails(videoUrl);

      return res.status(200).json({
        success: true,
        videoDetails,
      });
    } catch (error) {
      console.error('Error fetching video details:', error);
      return res.status(500).json({ error: 'Failed to fetch video content' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}

// دالة لجلب بيانات الفيديو بناءً على الفيديو URL
async function fetchVideoDetails(videoUrl) {
  // يمكنك إضافة منطق للتحقق من نوع الفيديو (YouTube, Arteenz, Dropbox, إلخ)
  const videoType = determineVideoType(videoUrl);
  let videoDetails;

  switch (videoType) {
    case 'youtube':
      videoDetails = {
        platform: 'YouTube',
        embedUrl: `https://www.youtube.com/embed/${extractYouTubeId(videoUrl)}`,
      };
      break;

    case 'dropbox':
      videoDetails = {
        platform: 'Dropbox',
        directLink: videoUrl.replace('?dl=0', '?dl=1'),
      };
      break;

    default:
      videoDetails = {
        platform: 'Other',
        source: videoUrl,
      };
  }

  return videoDetails;
}

function determineVideoType(videoUrl) {
  if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
    return 'youtube';
  } else if (videoUrl.includes('dropbox.com')) {
    return 'dropbox';
  }
  return 'other';
}

function extractYouTubeId(url) {
  const match = url.match(
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/
  );
  return match ? match[1] : null;
}
