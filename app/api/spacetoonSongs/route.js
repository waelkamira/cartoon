import { stringify } from 'uuid';
import { supabase1 } from '../../../lib/supabaseClient1';
import { v4 as uuidv4 } from 'uuid';

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
    let query = supabase1.from('spacetoonSongs').select('*');

    if (spacetoonSongName) {
      query = query.eq('spacetoonSongName', spacetoonSongName);
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
  const { spacetoonSongName, spacetoonSongImage, spacetoonSongLink } =
    await req?.json();
  try {
    const { data: song, error: createError } = await supabase1
      .from('spacetoonSongs')
      .insert([{ spacetoonSongName, spacetoonSongImage, spacetoonSongLink }])
      .select();

    // console.log(spacetoonSongName, spacetoonSongImage);
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
