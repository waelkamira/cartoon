import { stringify } from 'uuid';
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
