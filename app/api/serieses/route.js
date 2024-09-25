import { stringify } from 'uuid';
import { supabase1 } from '../../../lib/supabaseClient1';
import { v4 as uuidv4 } from 'uuid';

export async function GET(req) {
  const url = new URL(req.url);
  const searchParams = url.searchParams;
  const page = parseInt(searchParams.get('page')) || 1;
  const limit = parseInt(searchParams.get('limit')) || 4; // تحديد limit بـ 4
  const skip = (page - 1) * limit;
  const seriesName = searchParams.get('seriesName') || '';
  const planetName = searchParams.get('planetName') || '';
  const mostViewed = searchParams.get('mostViewed') || false;
  // console.log(
  //   page,
  //   limit,
  //   skip,
  //   seriesName,
  //   'planetName',
  //   planetName,
  //   'mostViewed',
  //   mostViewed
  // );

  try {
    const order = mostViewed ? 'updated_at' : 'created_at';
    const ascending = mostViewed ? true : false;
    // console.log('order', order);
    let query = supabase1
      .from('serieses')
      .select('*')
      .range(skip, skip + limit - 1)
      .order(order, { ascending: ascending });

    if (seriesName) {
      query = query.eq('seriesName', seriesName);
    }

    if (planetName) {
      query = query.eq('planetName', planetName);
    }

    if (planetName && mostViewed) {
      query = query.eq('mostViewed', true); // جلب المسلسلات الأكثر مشاهدة فقط
    }

    let { data: serieses, error: createError } = await query;
    // console.log('serieses', serieses);

    if (createError) {
      throw createError;
    }

    return Response.json(serieses);
  } catch (error) {
    console.error(error);
    return Response.json({ error: error.message });
  }
}
export async function POST(req) {
  const { seriesName, seriesImage, planetName } = await req?.json();
  try {
    const { data: series, error: createError } = await supabase1
      .from('serieses')
      .insert([{ id: uuidv4(), seriesName, seriesImage, planetName }])
      .select();

    // console.log(seriesName, seriesImage);
    if (createError) {
      throw createError;
    }

    return Response.json(series);
  } catch (error) {
    console.error(error);
    return new Response(stringify.json({ error: error?.message }), {
      status: 500,
    });
  }
}

export async function PUT(req) {
  const { id } = await req?.json();
  // console.log('id', id);

  try {
    const { data: series, error: createError } = await supabase1
      .from('serieses')
      .update({ mostViewed: true }) // قم بتعيين القيمة الجديدة لـ mostViewed هنا
      .eq('id', id) // استبدل desiredID بالـ id المطلوب
      .select();

    // console.log(seriesName, seriesImage);
    if (createError) {
      throw createError;
    }

    return Response.json(series);
  } catch (error) {
    console.error(error);
    return new Response(stringify.json({ error: error?.message }), {
      status: 500,
    });
  }
}
