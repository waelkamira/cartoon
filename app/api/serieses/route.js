import fs from 'fs';
import path from 'path';
import Papa from 'papaparse'; // استخدام مكتبة PapaParse
import { NextResponse } from 'next/server';

const cache = {
  data: null,
  lastUpdated: null,
};

// مدة الـ cache بالمللي ثانية (مثلاً 15 دقيقة)
const CACHE_DURATION = 15 * 60 * 1000;

// وظيفة للتحقق إذا كان الـ cache صالحًا
function isCacheValid() {
  return cache.data && Date.now() - cache.lastUpdated < CACHE_DURATION;
}

// وظيفة مساعدة لقراءة ملف CSV وتحويله إلى كائن JSON باستخدام PapaParse
async function readCSVFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        return reject(err);
      }
      Papa.parse(data, {
        header: true,
        complete: (results) => resolve(results.data),
        error: (error) => reject(error),
      });
    });
  });
}

// وظيفة مساعدة لكتابة بيانات إلى ملف CSV باستخدام PapaParse
async function writeCSVFile(filePath, data) {
  return new Promise((resolve, reject) => {
    const csv = Papa.unparse(data);
    fs.writeFile(filePath, csv, 'utf8', (err) => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
}
export async function GET(req) {
  const url = new URL(req.url);
  const searchParams = url.searchParams;
  const page = parseInt(searchParams.get('page')) || 1;
  const limit = parseInt(searchParams.get('limit')) || 4; // تحديد limit بـ 4
  const skip = (page - 1) * limit;
  const seriesName = searchParams.get('seriesName') || '';
  const planetName = searchParams.get('planetName') || '';
  const mostViewed = searchParams.get('mostViewed') === 'true'; // تحويل القيمة إلى Boolean

  try {
    let serieses;

    // تحقق مما إذا كانت بيانات الـ cache صالحة
    if (isCacheValid()) {
      serieses = cache.data;
    } else {
      // مسار ملف CSV
      const filePath = path.join(process.cwd(), 'csv', 'serieses.csv');
      const fileContent = fs.readFileSync(filePath, 'utf8');

      // تحليل بيانات CSV باستخدام PapaParse
      const parsedData = Papa.parse(fileContent, { header: true });
      serieses = parsedData.data;

      // تحديث الـ cache
      cache.data = serieses;
      cache.lastUpdated = Date.now();
    }

    // فلترة البيانات حسب اسم المسلسل أو الكوكب
    if (seriesName) {
      serieses = serieses.filter((series) => series.seriesName === seriesName);
    }

    if (planetName) {
      serieses = serieses.filter((series) => series.planetName === planetName);
    }

    if (planetName && mostViewed) {
      serieses = serieses.filter((series) => series.mostViewed === 'true');
    }

    // ترتيب البيانات
    if (mostViewed) {
      // ترتيب بناءً على updated_at إذا كان mostViewed === true
      serieses.sort((a, b) => {
        const dateA = new Date(a['updated_at']);
        const dateB = new Date(b['updated_at']);
        return dateA - dateB;
      });
    } else {
      // ترتيب عشوائي إذا كان mostViewed === false
      serieses.sort(() => Math.random() - 0.5);
    }

    // تقسيم البيانات للصفحة الحالية
    const paginatedData = serieses.slice(skip, skip + limit);

    return new Response(JSON.stringify(paginatedData), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
// export async function GET(req) {
//   const url = new URL(req.url);
//   const searchParams = url.searchParams;
//   const page = parseInt(searchParams.get('page')) || 1;
//   const limit = parseInt(searchParams.get('limit')) || 4; // تحديد limit بـ 4
//   const skip = (page - 1) * limit;
//   const seriesName = searchParams.get('seriesName') || '';
//   const planetName = searchParams.get('planetName') || '';
//   const mostViewed = searchParams.get('mostViewed') === 'true'; // تحويل القيمة إلى Boolean

//   try {
//     // مسار ملف CSV
//     const filePath = path.join(process.cwd(), 'csv', 'serieses.csv');
//     const fileContent = fs.readFileSync(filePath, 'utf8');

//     // تحليل بيانات CSV باستخدام PapaParse
//     const parsedData = Papa.parse(fileContent, { header: true });
//     let serieses = parsedData.data;

//     // فلترة البيانات حسب اسم المسلسل أو الكوكب
//     if (seriesName) {
//       serieses = serieses.filter((series) => series.seriesName === seriesName);
//     }

//     if (planetName) {
//       serieses = serieses.filter((series) => series.planetName === planetName);
//     }

//     if (planetName && mostViewed) {
//       serieses = serieses.filter((series) => series.mostViewed === 'true');
//     }

//     // ترتيب البيانات
//     if (mostViewed) {
//       // ترتيب بناءً على updated_at إذا كان mostViewed === true
//       serieses.sort((a, b) => {
//         const dateA = new Date(a['updated_at']);
//         const dateB = new Date(b['updated_at']);
//         return dateA - dateB;
//       });
//     } else {
//       // ترتيب عشوائي إذا كان mostViewed === false
//       serieses.sort(() => Math.random() - 0.5);
//     }

//     // تقسيم البيانات للصفحة الحالية
//     const paginatedData = serieses.slice(skip, skip + limit);

//     return new Response(JSON.stringify(paginatedData), {
//       headers: { 'Content-Type': 'application/json' },
//     });
//   } catch (error) {
//     console.error(error);
//     return new Response(JSON.stringify({ error: error.message }), {
//       status: 500,
//     });
//   }
// }

export async function POST(req) {
  const { seriesName, seriesImage, planetName } = await req.json();

  try {
    // مسار ملف CSV
    const filePath = path.join(process.cwd(), 'csv', 'serieses.csv');
    const fileContent = fs.readFileSync(filePath, 'utf8');

    // قراءة وتحليل البيانات الحالية
    const parsedData = Papa.parse(fileContent, { header: true });
    const serieses = parsedData.data;

    // إضافة السجل الجديد
    const newSeries = {
      id: uuidv4(),
      seriesName,
      seriesImage,
      planetName,
      mostViewed: false,
    };
    serieses.push(newSeries);

    // تحويل البيانات مرة أخرى إلى CSV
    const updatedCSV = Papa.unparse(serieses);

    // كتابة البيانات إلى ملف CSV
    fs.writeFileSync(filePath, updatedCSV, 'utf8');

    return new Response(JSON.stringify(newSeries), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

export async function PUT(req) {
  const { id } = await req.json();

  try {
    // مسار ملف CSV
    const filePath = path.join(process.cwd(), 'csv', 'serieses.csv');
    const fileContent = fs.readFileSync(filePath, 'utf8');

    // قراءة وتحليل البيانات الحالية
    const parsedData = Papa.parse(fileContent, { header: true });
    const serieses = parsedData.data;

    // تحديث السجل المحدد
    const updatedSerieses = serieses.map((series) => {
      if (series.id === id) {
        return { ...series, mostViewed: true };
      }
      return series;
    });

    // تحويل البيانات مرة أخرى إلى CSV
    const updatedCSV = Papa.unparse(updatedSerieses);

    // كتابة البيانات إلى ملف CSV
    fs.writeFileSync(filePath, updatedCSV, 'utf8');

    const updatedSeries = updatedSerieses.find((series) => series.id === id);

    return new Response(JSON.stringify(updatedSeries), {
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
//   const seriesName = searchParams.get('seriesName') || '';
//   const planetName = searchParams.get('planetName') || '';
//   const mostViewed = searchParams.get('mostViewed') || false;
//   // console.log(
//   //   page,
//   //   limit,
//   //   skip,
//   //   seriesName,
//   //   'planetName',
//   //   planetName,
//   //   'mostViewed',
//   //   mostViewed
//   // );

//   try {
//     const order = mostViewed ? 'updated_at' : 'created_at';
//     const ascending = mostViewed ? true : false;
//     // console.log('order', order);
//     let query = supabase1
//       .from('serieses')
//       .select('*')
//       .range(skip, skip + limit - 1)
//       .order(order, { ascending: ascending });

//     if (seriesName) {
//       query = query.eq('seriesName', seriesName);
//     }

//     if (planetName) {
//       query = query.eq('planetName', planetName);
//     }

//     if (planetName && mostViewed) {
//       query = query.eq('mostViewed', true); // جلب المسلسلات الأكثر مشاهدة فقط
//     }

//     let { data: serieses, error: createError } = await query;
//     // console.log('serieses', serieses);

//     if (createError) {
//       throw createError;
//     }

//     return Response.json(serieses);
//   } catch (error) {
//     console.error(error);
//     return Response.json({ error: error.message });
//   }
// }
// export async function POST(req) {
//   const { seriesName, seriesImage, planetName } = await req?.json();
//   try {
//     const { data: series, error: createError } = await supabase1
//       .from('serieses')
//       .insert([{ id: uuidv4(), seriesName, seriesImage, planetName }])
//       .select();

//     // console.log(seriesName, seriesImage);
//     if (createError) {
//       throw createError;
//     }

//     return Response.json(series);
//   } catch (error) {
//     console.error(error);
//     return new Response(stringify.json({ error: error?.message }), {
//       status: 500,
//     });
//   }
// }

// export async function PUT(req) {
//   const { id } = await req?.json();
//   // console.log('id', id);

//   try {
//     const { data: series, error: createError } = await supabase1
//       .from('serieses')
//       .update({ mostViewed: true }) // قم بتعيين القيمة الجديدة لـ mostViewed هنا
//       .eq('id', id) // استبدل desiredID بالـ id المطلوب
//       .select();

//     // console.log(seriesName, seriesImage);
//     if (createError) {
//       throw createError;
//     }

//     return Response.json(series);
//   } catch (error) {
//     console.error(error);
//     return new Response(stringify.json({ error: error?.message }), {
//       status: 500,
//     });
//   }
// }
