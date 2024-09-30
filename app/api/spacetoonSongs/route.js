import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';

export async function GET(req) {
  const url = new URL(req.url);
  const searchParams = url.searchParams;
  const page = parseInt(searchParams.get('page')) || 1;
  const limit = parseInt(searchParams.get('limit')) || 4; // تحديد limit بـ 4
  const skip = (page - 1) * limit;
  const spacetoonSongName = searchParams.get('spacetoonSongName') || '';
  const random = searchParams.get('random') === 'true'; // التحقق من random

  console.log('spacetoonSongName', spacetoonSongName);
  try {
    // مسار ملف CSV
    const filePath = path.join(process.cwd(), 'csv', 'spacetoonSongs.csv');
    const fileContent = fs.readFileSync(filePath, 'utf8');

    // تحليل بيانات CSV باستخدام PapaParse
    const parsedData = Papa.parse(fileContent, { header: true });
    let songs = parsedData.data;

    // فلترة الأغاني حسب اسم الأغنية إن وجد
    if (spacetoonSongName) {
      songs = songs.filter(
        (song) => song.spacetoonSongName === spacetoonSongName
      );
    }

    if (random) {
      // إذا كانت random=true، نقوم بخلط النتائج عشوائيا
      songs = songs.sort(() => 0.5 - Math.random());
    } else {
      // ترتيب الأغاني بناءً على created_at
      songs.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    }

    // تقسيم البيانات للصفحة الحالية
    const paginatedSongs = songs.slice(skip, skip + limit);

    return new Response(JSON.stringify(paginatedSongs), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

export async function POST(req) {
  const { spacetoonSongName, spacetoonSongImage, spacetoonSongLink } =
    await req?.json();

  try {
    // مسار ملف CSV
    const filePath = path.join(process.cwd(), 'csv', 'spacetoonSongs.csv');
    const fileContent = fs.readFileSync(filePath, 'utf8');

    // تحليل بيانات CSV باستخدام PapaParse
    const parsedData = Papa.parse(fileContent, { header: true });
    const songs = parsedData.data;

    // إضافة الأغنية الجديدة
    const newSong = {
      spacetoonSongName,
      spacetoonSongImage,
      spacetoonSongLink,
      created_at: new Date().toISOString(),
    };
    songs.push(newSong);

    // إعادة كتابة البيانات إلى ملف CSV
    const updatedCSV = Papa.unparse(songs);
    fs.writeFileSync(filePath, updatedCSV);

    return new Response(JSON.stringify(newSong), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

// import { stringify } from 'uuid';
// import { supabase1 } from '../../../lib/supabaseClient1';
// import { v4 as uuidv4 } from 'uuid';

// export async function GET(req) {
//   const url = new URL(req.url);
//   const searchParams = url.searchParams;
//   const page = parseInt(searchParams.get('page')) || 1;
//   const limit = parseInt(searchParams.get('limit')) || 4; // تحديد limit بـ 4
//   const skip = (page - 1) * limit;
//   const spacetoonSongName = searchParams.get('spacetoonSongName') || '';
//   const random = searchParams.get('random') === 'true'; // التحقق من random

//   console.log('spacetoonSongName', spacetoonSongName);
//   try {
//     let query = supabase1.from('spacetoonSongs').select('*');

//     if (spacetoonSongName) {
//       query = query.eq('spacetoonSongName', spacetoonSongName);
//     }

//     if (random) {
//       // إذا كانت random=true، نختار الأغاني بشكل عشوائي بدون استخدام order
//       let { data: allSongs, error: fetchError } = await query;
//       if (fetchError) {
//         throw fetchError;
//       }
//       // خلط النتائج عشوائيا
//       allSongs = allSongs.sort(() => 0.5 - Math.random());
//       // أخذ العدد المطلوب من الأغاني
//       const songs = allSongs.slice(skip, skip + limit);
//       return Response.json(songs);
//     } else {
//       // في حال عدم وجود random=true، نستخدم الترتيب الافتراضي
//       query = query
//         .range(skip, skip + limit - 1)
//         .order('created_at', { ascending: true });
//       let { data: songs, error: createError } = await query;
//       if (createError) {
//         throw createError;
//       }
//       return Response.json(songs);
//     }
//   } catch (error) {
//     console.error(error);
//     return Response.json({ error: error.message });
//   }
// }

// export async function POST(req) {
//   const { spacetoonSongName, spacetoonSongImage, spacetoonSongLink } =
//     await req?.json();
//   try {
//     const { data: song, error: createError } = await supabase1
//       .from('spacetoonSongs')
//       .insert([{ spacetoonSongName, spacetoonSongImage, spacetoonSongLink }])
//       .select();

//     // console.log(spacetoonSongName, spacetoonSongImage);
//     if (createError) {
//       throw createError;
//     }

//     return Response.json(song);
//   } catch (error) {
//     console.error(error);
//     return new Response(stringify.json({ error: error?.message }), {
//       status: 500,
//     });
//   }
// }
