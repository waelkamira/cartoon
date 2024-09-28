import { NextResponse } from 'next/server';
import { supabase1 } from '../../../lib/supabaseClient1';

export async function GET(req) {
  const { searchParams } = new URL(req.url, 'http://localhost');
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '10', 10);
  const searchTerm = searchParams.get('searchTerm') || '';
  const skip = (page - 1) * limit;

  try {
    console.log('searchTerm', searchTerm);
    const results = [];

    // البحث في جدول serieses
    let { data: series, error: seriesError } = await supabase1
      .from('serieses')
      .select('*')
      .ilike('seriesName', `%${searchTerm}%`)
      .range(skip, skip + limit - 1);

    if (seriesError) throw seriesError;
    results.push(...series);

    // البحث في جدول movies
    let { data: movies, error: moviesError } = await supabase1
      .from('movies')
      .select('*')
      .ilike('movieName', `%${searchTerm}%`)
      .range(skip, skip + limit - 1);

    if (moviesError) throw moviesError;
    results.push(...movies);

    // البحث في جدول songs
    let { data: songs, error: songsError } = await supabase1
      .from('songs')
      .select('*')
      .ilike('songName', `%${searchTerm}%`)
      .range(skip, skip + limit - 1);

    if (songsError) throw songsError;
    results.push(...songs);

    // البحث في جدول spacetoonSongs
    let { data: spacetoonSongs, error: spacetoonSongsError } = await supabase1
      .from('spacetoonSongs')
      .select('*')
      .ilike('spacetoonSongName', `%${searchTerm}%`)
      .range(skip, skip + limit - 1);

    if (spacetoonSongsError) throw spacetoonSongsError;
    results.push(...spacetoonSongs);

    // البحث في جدول episodes
    let { data: episodes, error: episodesError } = await supabase1
      .from('episodes')
      .select('*')
      .ilike('episodeName', `%${searchTerm}%`)
      .range(skip, skip + limit - 1);

    if (episodesError) throw episodesError;
    results.push(...episodes);

    // دمج النتائج وإرجاعها
    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
