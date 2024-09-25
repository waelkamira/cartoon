import { stringify } from 'uuid';
import { supabase1 } from '../../../lib/supabaseClient1';
import { v4 as uuidv4 } from 'uuid';

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

    return Response.json(episode);
  } catch (error) {
    console.error(error);
    return new Response(stringify.json({ error: error?.message }), {
      status: 500,
    });
  }
}
