import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';

const filePath = path.join(process.cwd(), 'csv', 'User.csv');

// دالة لقراءة البيانات من CSV
function readCSV() {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const parsedData = Papa.parse(fileContent, { header: true });
  return parsedData.data;
}

// دالة لكتابة البيانات إلى CSV
function writeCSV(data) {
  const updatedCSV = Papa.unparse(data);
  fs.writeFileSync(filePath, updatedCSV);
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email') || '';

  try {
    const users = readCSV();

    if (email) {
      const user = users.find((u) => u.email === email);
      if (!user) {
        return new Response(JSON.stringify({ error: 'User not found' }), {
          status: 404,
        });
      }
      return new Response(JSON.stringify(user), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      return new Response(JSON.stringify(users), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
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
    let users = readCSV();

    const userIndex = users.findIndex((u) => u.email === email);
    if (userIndex === -1) {
      return new Response(JSON.stringify({ error: 'User not found' }), {
        status: 404,
      });
    }

    users[userIndex].image = image;
    users[userIndex].name = name;

    writeCSV(users);

    return new Response(JSON.stringify(users[userIndex]), { status: 200 });
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
    let users = readCSV();

    const userIndex = users.findIndex((u) => u.email === email);
    if (userIndex === -1) {
      return new Response(JSON.stringify({ error: 'User not found' }), {
        status: 404,
      });
    }

    const deletedUser = users.splice(userIndex, 1);

    writeCSV(users);

    return new Response(JSON.stringify(deletedUser), { status: 200 });
  } catch (error) {
    console.error('Error deleting user:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
    });
  }
}

// import { createClient } from '@supabase/supabase-js';

// // إعداد Supabase Client
// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL, // عنوان URL الخاص بـ Supabase
//   process.env.NEXT_PUBLIC_SUPABASE_API // مفتاح API العمومي الخاص بـ Supabase
// );

// export async function GET(req) {
//   const { searchParams } = new URL(req.url);
//   const email = searchParams.get('email') || '';

//   // console.log('Full Query String:', req.url);
//   // console.log('email', email);
//   try {
//     if (email) {
//       let { data: User, error } = await supabase
//         .from('User')
//         .select('*')
//         .eq('email', email);
//       if (error) throw error;
//       // console.log('User', User);
//       return Response.json(User);
//     }
//   } catch (error) {
//     console.error('Error fetching User:', error);
//     return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
//       status: 500,
//     });
//   }
// }

// export async function PUT(req) {
//   try {
//     const { email, image, name } = await req.json();

//     const { data: user, error } = await supabase
//       .from('User')
//       .update({ image, name })
//       .eq('email', email)
//       .single();

//     if (error) throw error;

//     return new Response(JSON.stringify(user), { status: 200 });
//   } catch (error) {
//     console.error('Error updating user:', error);
//     return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
//       status: 500,
//     });
//   }
// }

// export async function DELETE(req) {
//   try {
//     const { email } = await req.json();

//     // التحقق من وجود المستخدم قبل محاولة حذفه
//     const { data: existingUser, error: fetchError } = await supabase
//       .from('User')
//       .select('*')
//       .eq('email', email)
//       .single();

//     if (fetchError || !existingUser) {
//       console.error(`User with email ${email} not found.`);
//       return new Response(JSON.stringify({ error: 'User not found' }), {
//         status: 404,
//       });
//     }

//     const { data: deletedUser, error: deleteError } = await supabase
//       .from('User')
//       .delete()
//       .eq('email', email);

//     if (deleteError) throw deleteError;

//     return new Response(JSON.stringify(deletedUser), { status: 200 });
//   } catch (error) {
//     console.error('Error deleting user:', error);
//     return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
//       status: 500,
//     });
//   }
// }
