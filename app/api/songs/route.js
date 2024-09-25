import { stringify } from 'uuid';
import { supabase1 } from '../../../lib/supabaseClient1';
import { v4 as uuidv4 } from 'uuid';

export async function GET(req) {
  const url = new URL(req.url);
  const searchParams = url.searchParams;
  const page = parseInt(searchParams.get('page')) || 1;
  const limit = parseInt(searchParams.get('limit')) || 4; // تحديد limit بـ 4
  const skip = (page - 1) * limit;
  const songName = searchParams.get('songName') || '';
  const random = searchParams.get('random') === 'true'; // التحقق من random

  try {
    let query = supabase1.from('songs').select('*');

    if (songName) {
      query = query.eq('songName', songName);
    }

    if (random) {
      // إذا كانت random=true، نختار الأغاني بشكل عشوائي بدون استخدام order
      let { data: allSongs, error: fetchError } = await query;
      if (fetchError) {
        throw fetchError;
      }
      // خلط النتائج عشوائيا
      allSongs = allSongs.sort(() => 0.5 - Math.random());
      // أخذ العدد المطلوب من الأغاني
      const songs = allSongs.slice(skip, skip + limit);
      return Response.json(songs);
    } else {
      // في حال عدم وجود random=true، نستخدم الترتيب الافتراضي
      query = query
        .range(skip, skip + limit - 1)
        .order('created_at', { ascending: false });
      let { data: songs, error: createError } = await query;

      // console.log('songs', songs);
      if (createError) {
        throw createError;
      }

      return Response.json(songs);
    }
  } catch (error) {
    console.error(error);
    return Response.json({ error: error.message });
  }
}

export async function POST(req) {
  const { songName, songImage, songLink } = await req?.json();
  try {
    const { data: song, error: createError } = await supabase1
      .from('songs')
      .insert([{ songName, songImage, songLink }])
      .select();

    // console.log(songName, songImage);
    if (createError) {
      throw createError;
    }

    return Response.json(song);
  } catch (error) {
    console.error(error);
    return new Response(stringify.json({ error: error?.message }), {
      status: 500,
    });
  }
}
