// import Papa from 'papaparse';
// import { v4 as uuidv4 } from 'uuid';

// const cache = new Map();
// const CACHE_TTL = 30 * 60 * 1000; // 30 minutes

// // رابط ملف episodes من GitHub
// const episodesUrl =
//   'https://raw.githubusercontent.com/waelkamira/csv/refs/heads/main/episodes.csv';

// // دالة لجلب وتحليل محتوى CSV من رابط
// async function fetchCsvData(url) {
//   const response = await fetch(url);
//   if (!response.ok) throw new Error('Failed to fetch CSV data');
//   const csvText = await response.text();
//   return Papa.parse(csvText, { header: true }).data;
// }

// export async function GET(req) {
//   const url = new URL(req.url);
//   const searchParams = url.searchParams;
//   const episodeName = searchParams.get('episodeName') || '';

//   // إذا لم يتم توفير episodeName، نعيد خطأ
//   if (!episodeName) {
//     return new Response(
//       JSON.stringify({ error: 'episodeName parameter is required' }),
//       {
//         status: 400,
//         headers: { 'Content-Type': 'application/json' },
//       }
//     );
//   }

//   const cacheKey = `episode-${episodeName}`;
//   const cachedData = cache.get(cacheKey);

//   // التحقق إذا كانت البيانات موجودة في الكاش ولم تنتهي مدة صلاحيتها
//   if (cachedData && Date.now() - cachedData.timestamp < CACHE_TTL) {
//     // console.log('Serving from cache:', episodeName);
//     return new Response(JSON.stringify(cachedData.data), {
//       status: 200,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   }

//   try {
//     // تحميل وتحليل البيانات من CSV
//     const episodes = await fetchCsvData(episodesUrl);
//     const episode = episodes.find((ep) => ep.episodeName === episodeName);

//     if (!episode) {
//       return new Response(JSON.stringify({ error: 'Episode not found' }), {
//         status: 404,
//         headers: { 'Content-Type': 'application/json' },
//       });
//     }

//     // تخزين البيانات في الكاش مع إضافة توقيت جديد
//     cache.set(cacheKey, {
//       data: [episode],
//       timestamp: Date.now(),
//     });

//     console.log('Serving from file:', episodeName);
//     return new Response(JSON.stringify([episode]), {
//       status: 200,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   } catch (error) {
//     console.error('Error fetching episode:', error);
//     return new Response(JSON.stringify({ error: error.message }), {
//       status: 500,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   }
// }

// export async function POST(req) {
//   // في هذا الجزء سنقوم بإضافة حل بديل لأننا لا نستطيع الكتابة إلى ملف CSV على GitHub
//   const { seriesName, episodeName, episodeLink } = await req.json();
//   const cacheKey = `episode-${episodeName}`;

//   try {
//     const episodes = await fetchCsvData(episodesUrl);

//     const newEpisode = { id: uuidv4(), seriesName, episodeName, episodeLink };
//     episodes.push(newEpisode);

//     // تحديث الكاش بعد إضافة الحلقة الجديدة
//     cache.set(cacheKey, {
//       data: [newEpisode],
//       timestamp: Date.now(),
//     });

//     console.log('New episode added (cached only):', newEpisode);
//     return new Response(JSON.stringify(newEpisode), {
//       status: 201,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   } catch (error) {
//     console.error('Error adding episode:', error);
//     return new Response(JSON.stringify({ error: error.message }), {
//       status: 500,
//     });
//   }
// }

import { supabase1 } from '../../../lib/supabaseClient1';
import { v4 as uuidv4 } from 'uuid';

export async function GET(req) {
  const url = new URL(req.url);
  const searchParams = url.searchParams;
  const episodeName = searchParams.get('episodeName') || '';
  // const seriesName = searchParams.get('seriesName') || '';
  console.log('episodeName', episodeName);
  // console.log('seriesName', seriesName);
  try {
    let { data: episode, error: createError } = await supabase1
      .from('episodes')
      .select('*')
      .eq('episodeName', episodeName);

    if (createError) {
      throw createError;
    }
    console.log('episode', episode);

    return new Response(JSON.stringify(episode), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching episode:', error);
    return new Response(JSON.stringify({ error: error.message }));
  }
}
export async function POST(req) {
  const { seriesName, episodeName, episodeLink } = await req?.json();
  try {
    const { data: episode, error: createError } = await supabase1
      .from('episodes')
      .insert([{ id: uuidv4(), seriesName, episodeName, episodeLink }])
      .select();

    // console.log(seriesName, episodeName, episodeLink);
    if (createError) {
      throw createError;
    }
    console.log('episode', episode);
    return Response.json(episode);
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: error?.message }), {
      status: 500,
    });
  }
}
