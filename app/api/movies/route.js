import { stringify } from 'uuid';
import { supabase1 } from '../../../lib/supabaseClient1';
import { v4 as uuidv4 } from 'uuid';

export async function GET(req) {
  const url = new URL(req.url);
  const searchParams = url.searchParams;
  const page = parseInt(searchParams.get('page')) || 1;
  const limit = parseInt(searchParams.get('limit')) || 4;
  const skip = (page - 1) * limit;
  const movieName = searchParams.get('movieName') || '';
  const mostViewed = searchParams.get('mostViewed') || false;

  console.log('movieName', movieName);
  // console.log(page, limit, skip);

  try {
    if (movieName) {
      let { data: movie, error: createError } = await supabase1
        .from('movies')
        .select('*')
        .ilike('movieName', movieName);

      // console.log('movie', movie);

      if (createError) {
        throw createError;
      }

      return Response.json(movie);
    }
    if (mostViewed) {
      let { data: movies, error: createError } = await supabase1
        .from('movies')
        .select('*')
        .range(skip, skip + limit - 1)
        .order('updated_at', { ascending: true })
        .eq('mostViewed', mostViewed);
      // console.log('moviesMostViewed', movies);

      if (createError) {
        throw createError;
      }

      return Response.json(movies);
    }

    let { data: movies, error: createError } = await supabase1
      .from('movies')
      .select('*')
      .range(skip, skip + limit)
      .order('updated_at', { ascending: false });
    // console.log('movies', movies);
    if (createError) {
      throw createError;
    }

    return Response.json(movies);
  } catch (error) {
    console.error(error);
    return Response.json({ error: error.message });
  }
}

export async function POST(req) {
  const { movieName, movieImage, movieLink } = await req?.json();

  // console.log(movieName, movieImage, movieLink);

  try {
    const { data: movie, error: createError } = await supabase1
      .from('movies')
      .insert([{ movieName, movieImage, movieLink }])
      .select();

    // console.log(movieName, movieImage);
    if (createError) {
      throw createError;
    }

    return Response.json(movie);
  } catch (error) {
    console.error(error);
    return new Response(stringify.json({ error: error?.message }), {
      status: 500,
    });
  }
}

export async function PUT(req) {
  try {
    const { id, ...data } = await req.json(); // الحصول على البيانات المرسلة في الجسم
    const url = new URL(req.url);
    const searchParams = url.searchParams;
    const movieName = searchParams.get('movieName'); // استخراج movieName من معلمات البحث
    // console.log('id', id);
    // console.log('movieName', movieName);
    console.log(data?.movieName);
    console.log(data?.movieImage);
    console.log(data?.movieLink);
    console.log(id);
    // تحديث الفيلم بناءً على id

    // تحديث الفيلم بناءً على movieName
    if (movieName && id) {
      // console.log('movieName', movieName);

      const { data: movie, error: updateError } = await supabase1
        .from('movies')
        .update({
          movieName: data?.movieName || null,
          movieImage: data?.movieImage || null,
          movieLink: data?.movieLink || null,
        }) // تحديث البيانات المطلوبة
        .eq('id', id) // تحديد الفيلم بناءً على movieName
        .select();

      if (updateError) {
        throw new Error(updateError.message);
      }

      return new Response(JSON.stringify(movie), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (id) {
      const { data: movie, error: updateError } = await supabase1
        .from('movies')
        .update({ mostViewed: true }) // تعيين القيمة المطلوبة لـ mostViewed
        .eq('id', id) // تحديد الفيلم بناءً على id
        .select();

      if (updateError) {
        throw new Error(updateError.message);
      }

      return new Response(JSON.stringify(movie), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
