// import Papa from 'papaparse';

// // روابط ملفات CSV من GitHub
// const csvUrls = {
//   User: 'https://api.github.com/repos/waelkamira/csv/contents/User.csv',
// };

// // رمز GitHub Token الخاص بك
// const GITHUB_TOKEN = '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';

// // دالة لجلب محتوى CSV وتحويله إلى JSON
// async function fetchCsvData(url) {
//   const response = await fetch(url, {
//     headers: {
//       Authorization: `token ${GITHUB_TOKEN}`,
//       Accept: 'application/vnd.github.v3.raw',
//     },
//   });
//   const csvText = await response.text();
//   return Papa.parse(csvText, { header: true }).data;
// }

// // دالة لحفظ الملف بعد تعديله
// async function saveCsvData(filePath, updatedData, sha) {
//   const csvContent = Papa.unparse(updatedData);

//   const response = await fetch(filePath, {
//     method: 'PUT',
//     headers: {
//       Authorization: `token ${GITHUB_TOKEN}`,
//       Accept: 'application/vnd.github.v3+json',
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       message: 'Update CSV file',
//       content: btoa(csvContent), // تحويل النص إلى Base64
//       sha: sha, // معرف النسخة السابقة من الملف
//     }),
//   });

//   if (!response.ok) {
//     throw new Error('Failed to update the file on GitHub');
//   }
//   return await response.json();
// }

// // دالة GET لجلب بيانات المستخدمين مع التصفية والتصفح
// export async function GET(req) {
//   const { searchParams } = new URL(req.url);
//   const pageNumber = parseInt(searchParams.get('pageNumber') || '1', 10);
//   const limit = parseInt(searchParams.get('limit') || '5', 10);
//   const searchQuery = searchParams.get('searchQuery') || '';
//   const isAdmin = searchParams.get('isAdmin') === 'true';

//   try {
//     const users = await fetchCsvData(csvUrls.User);

//     // تصفية البيانات
//     let filteredUsers = users;

//     if (searchQuery) {
//       filteredUsers = filteredUsers.filter((user) =>
//         user.email.includes(searchQuery)
//       );
//     }

//     if (isAdmin) {
//       // تطبيق التصفح
//       const startIndex = (pageNumber - 1) * limit;
//       const paginatedUsers = filteredUsers.slice(
//         startIndex,
//         startIndex + limit
//       );

//       return new Response(JSON.stringify(paginatedUsers), {
//         status: 200,
//         headers: { 'Content-Type': 'application/json' },
//       });
//     }
//   } catch (error) {
//     console.error('Error fetching users:', error);
//     return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
//       status: 500,
//     });
//   }
// }

// // دالة PUT لتحديث بيانات مستخدم
// export async function PUT(req) {
//   try {
//     const { email, image, name } = await req.json();
//     const users = await fetchCsvData(csvUrls.User);

//     // تحديث المستخدم
//     const userIndex = users.findIndex((user) => user.email === email);
//     if (userIndex === -1) {
//       return new Response(JSON.stringify({ error: 'User not found' }), {
//         status: 404,
//       });
//     }

//     users[userIndex].image = image;
//     users[userIndex].name = name;

//     // الحصول على sha للملف الأصلي
//     const fileInfoResponse = await fetch(csvUrls.User, {
//       headers: { Authorization: `token ${GITHUB_TOKEN}` },
//     });
//     const fileInfo = await fileInfoResponse.json();

//     // حفظ التعديلات إلى GitHub
//     await saveCsvData(csvUrls.User, users, fileInfo.sha);

//     return new Response(JSON.stringify(users[userIndex]), { status: 200 });
//   } catch (error) {
//     console.error('Error updating user:', error);
//     return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
//       status: 500,
//     });
//   }
// }

// // دالة DELETE لحذف مستخدم
// export async function DELETE(req) {
//   try {
//     const { email } = await req.json();
//     const users = await fetchCsvData(csvUrls.User);

//     // التحقق من وجود المستخدم وحذفه
//     const userIndex = users.findIndex((user) => user.email === email);
//     if (userIndex === -1) {
//       return new Response(JSON.stringify({ error: 'User not found' }), {
//         status: 404,
//       });
//     }

//     // حذف المستخدم من القائمة
//     users.splice(userIndex, 1);

//     // الحصول على sha للملف الأصلي
//     const fileInfoResponse = await fetch(csvUrls.User, {
//       headers: { Authorization: `token ${GITHUB_TOKEN}` },
//     });
//     const fileInfo = await fileInfoResponse.json();

//     // حفظ التعديلات بعد الحذف إلى GitHub
//     await saveCsvData(csvUrls.User, users, fileInfo.sha);

//     return new Response(
//       JSON.stringify({ message: 'User deleted successfully' }),
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error('Error deleting user:', error);
//     return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
//       status: 500,
//     });
//   }
// }

// import Papa from 'papaparse';

// // export const runtime = 'edge';

// // روابط ملفات CSV من GitHub
// const csvUrls = {
//   User: 'https://raw.githubusercontent.com/waelkamira/csv/refs/heads/main/User.csv',
// };

// // دالة لجلب وتحليل محتوى CSV
// async function fetchCsvData(url) {
//   const response = await fetch(url);
//   const csvText = await response.text();
//   return Papa.parse(csvText, { header: true }).data;
// }

// // معالجة GET
// export async function GET(req) {
//   const { searchParams } = new URL(req.url);
//   const pageNumber = parseInt(searchParams.get('pageNumber') || '1', 10);
//   const limit = parseInt(searchParams.get('limit') || '5', 10);
//   const searchQuery = searchParams.get('searchQuery') || '';
//   const isAdmin = searchParams.get('isAdmin') === 'true';

//   try {
//     const users = await fetchCsvData(csvUrls.User);

//     // تصفية البيانات
//     let filteredUsers = users;

//     if (searchQuery) {
//       filteredUsers = filteredUsers.filter((user) =>
//         user.email.includes(searchQuery)
//       );
//     }

//     if (isAdmin) {
//       // تطبيق التصفح
//       const startIndex = (pageNumber - 1) * limit;
//       const paginatedUsers = filteredUsers.slice(
//         startIndex,
//         startIndex + limit
//       );

//       return new Response(JSON.stringify(paginatedUsers), {
//         status: 200,
//         headers: { 'Content-Type': 'application/json' },
//       });
//     }
//   } catch (error) {
//     console.error('Error fetching users:', error);
//     return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
//       status: 500,
//     });
//   }
// }

// // معالجة PUT
// export async function PUT(req) {
//   try {
//     const { email, image, name } = await req.json();
//     const users = await fetchCsvData(csvUrls.User);

//     // تحديث المستخدم
//     const userIndex = users.findIndex((user) => user.email === email);
//     if (userIndex === -1) {
//       return new Response(JSON.stringify({ error: 'User not found' }), {
//         status: 404,
//       });
//     }

//     users[userIndex].image = image;
//     users[userIndex].name = name;

//     return new Response(JSON.stringify(users[userIndex]), { status: 200 });
//   } catch (error) {
//     console.error('Error updating user:', error);
//     return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
//       status: 500,
//     });
//   }
// }

// // معالجة DELETE
// export async function DELETE(req) {
//   try {
//     const { email } = await req.json();
//     const users = await fetchCsvData(csvUrls.User);

//     // التحقق من وجود المستخدم
//     const userIndex = users.findIndex((user) => user.email === email);
//     if (userIndex === -1) {
//       return new Response(JSON.stringify({ error: 'User not found' }), {
//         status: 404,
//       });
//     }

//     // حذف المستخدم
//     users.splice(userIndex, 1);

//     return new Response(
//       JSON.stringify({ message: 'User deleted successfully' }),
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error('Error deleting user:', error);
//     return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
//       status: 500,
//     });
//   }
// }

import { supabase } from '../../../lib/supabaseClient1';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const pageNumber = parseInt(searchParams.get('pageNumber') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '5', 10);
  const searchQuery = searchParams.get('searchQuery') || '';
  const isAdmin = searchParams.get('isAdmin') === 'true';
  try {
    if (searchQuery && isAdmin) {
      let { data: User, error } = await supabase
        .from('User')
        .select('*')
        .like('email', `%${searchQuery}%`) // استخدم like للبحث الجزئي
        .range((pageNumber - 1) * limit, pageNumber * limit - 1);

      // console.log('User', User);
      if (error) throw error;
      return Response.json(User);
    } else if (isAdmin) {
      let { data: User, error } = await supabase
        .from('User')
        .select('email')
        .order('createdAt', { ascending: false })
        .range((pageNumber - 1) * limit, pageNumber * limit - 1);

      if (error) throw error;
      // console.log('User', User);
      // console.log('User', User?.length);
      return Response.json(User);
    }
  } catch (error) {
    console.error('Error fetching User:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
    });
  }
}

export async function PUT(req) {
  try {
    const { email, image, name } = await req.json();

    const { data: user, error } = await supabase
      .from('User')
      .update({ image, name })
      .eq('email', email)
      .single();

    if (error) throw error;

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.error('Error updating user:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
    });
  }
}

export async function DELETE(req) {
  try {
    const { email } = await req.json();

    // التحقق من وجود المستخدم قبل محاولة حذفه
    const { data: existingUser, error: fetchError } = await supabase
      .from('User')
      .select('*')
      .eq('email', email)
      .single();

    if (fetchError || !existingUser) {
      console.error(`User with email ${email} not found.`);
      return new Response(JSON.stringify({ error: 'User not found' }), {
        status: 404,
      });
    }

    const { data: deletedUser, error: deleteError } = await supabase
      .from('User')
      .delete()
      .eq('email', email);

    if (deleteError) throw deleteError;

    return new Response(JSON.stringify(deletedUser), { status: 200 });
  } catch (error) {
    console.error('Error deleting user:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
    });
  }
}
