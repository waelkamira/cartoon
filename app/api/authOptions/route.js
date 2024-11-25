// import { createClient } from '@supabase/supabase-js';
// import bcrypt from 'bcrypt';
// import { v4 as uuidv4 } from 'uuid'; // استيراد مكتبة uuid
// import CredentialsProvider from 'next-auth/providers/credentials';
// import GoogleProvider from 'next-auth/providers/google';

// // إعداد Supabase
// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL1,
//   process.env.NEXT_PUBLIC_SUPABASE_API1
// );

// export const authOptions = {
//   secret: process.env.NEXT_PUBLIC_SECRET,
//   providers: [
//     GoogleProvider({
//       clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
//       clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
//       allowDangerousEmailAccountLinking: true,
//     }),
//     CredentialsProvider({
//       name: 'credentials',
//       credentials: {
//         name: { label: 'Your name', type: 'text', placeholder: 'Your name' },
//         email: {
//           label: 'Your email',
//           type: 'email',
//           placeholder: 'Your email',
//         },
//         password: {
//           label: 'Your password',
//           type: 'password',
//           placeholder: 'Your password',
//         },
//       },
//       async authorize(credentials) {
//         const email = credentials?.email;
//         const password = credentials?.password;

//         const { data: user, error } = await supabase
//           .from('User')
//           .select('*')
//           .eq('email', email)
//           .single();

//         if (error || !user) {
//           throw new Error('Email not found');
//         }

//         const checkPassword = await bcrypt.compare(password, user.password);

//         if (!checkPassword) {
//           throw new Error('Incorrect password');
//         }

//         return user;
//       },
//     }),
//   ],
//   callbacks: {
//     async signIn({ account, profile }) {
//       if (account.provider === 'google') {
//         const { data: existingUser, error: existingUserError } = await supabase
//           .from('User')
//           .select('*')
//           .eq('email', profile.email)
//           .single();

//         if (existingUserError && existingUserError.code !== 'PGRST116') {
//           throw new Error(existingUserError.message);
//         }

//         if (!existingUser) {
//           // إنشاء id جديد باستخدام uuid
//           const newId = uuidv4();

//           const { error } = await supabase.from('User').insert({
//             // id: newId, // إضافة id جديد
//             email: profile.email,
//             name: profile.name,
//             image: profile.picture,
//             googleId: profile.sub,
//           });

//           if (error) {
//             throw new Error(error.message);
//           }
//         } else {
//           if (!existingUser.googleId) {
//             const { error } = await supabase
//               .from('User')
//               .update({ googleId: profile.sub })
//               .eq('email', profile.email);

//             if (error) {
//               throw new Error(error.message);
//             }
//           }
//         }

//         return true;
//       }
//       return true;
//     },
//   },

//   session: {
//     strategy: 'jwt',
//   },
//   debug: process.env.NODE_ENV === 'development',
//   pages: {
//     signIn: '/auth/signin', // صفحة تسجيل الدخول
//     signOut: '/auth/signout', // صفحة تسجيل الخروج
//   },
// };

import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid'; // استيراد مكتبة uuid
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

// إعداد Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL1,
  process.env.NEXT_PUBLIC_SUPABASE_API1
);

export const authOptions = {
  secret: process.env.NEXT_PUBLIC_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
      params: {
        prompt: 'consent', // يجبر Google على استخدام نافذة منبثقة
        access_type: 'offline',
        response_type: 'code',
      },
      allowDangerousEmailAccountLinking: true,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        name: { label: 'Your name', type: 'text', placeholder: 'Your name' },
        email: {
          label: 'Your email',
          type: 'email',
          placeholder: 'Your email',
        },
        password: {
          label: 'Your password',
          type: 'password',
          placeholder: 'Your password',
        },
      },
      async authorize(credentials) {
        const email = credentials?.email;
        const password = credentials?.password;

        const { data: user, error } = await supabase
          .from('User')
          .select('*')
          .eq('email', email)
          .single();

        if (error || !user) {
          throw new Error('Email not found');
        }

        const checkPassword = await bcrypt.compare(password, user.password);

        if (!checkPassword) {
          throw new Error('Incorrect password');
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account.provider === 'google') {
        const { data: existingUser, error: existingUserError } = await supabase
          .from('User')
          .select('*')
          .eq('email', profile.email)
          .single();

        if (existingUserError && existingUserError.code !== 'PGRST116') {
          throw new Error(existingUserError.message);
        }

        if (!existingUser) {
          // إنشاء id جديد باستخدام uuid
          const newId = uuidv4();

          const { error } = await supabase.from('User').insert({
            email: profile.email,
            name: profile.name,
            image: profile.picture,
            googleId: profile.sub,
          });

          if (error) {
            throw new Error(error.message);
          }
        } else {
          if (!existingUser.googleId) {
            const { error } = await supabase
              .from('User')
              .update({ googleId: profile.sub })
              .eq('email', profile.email);

            if (error) {
              throw new Error(error.message);
            }
          }
        }

        return true;
      }
      return true;
    },
    async redirect({ url, baseUrl }) {
      // تحقق من صحة عنوان URL قبل إعادة التوجيه
      if (url.includes('https://cartoon-alpha.vercel.app')) {
        // إذا كان المستخدم قد سجل الدخول بنجاح، قم بإعادة التوجيه إلى الصفحة الرئيسية أو صفحة أخرى مناسبة
        return '/';
      } else {
        // إذا كان هناك خطأ، قم بإعادة التوجيه إلى صفحة الخطأ
        return '/error';
      }
    },
    // async redirect({ url, baseUrl }) {
    //   console.log('url', url);
    //   console.log('baseUrl', baseUrl);
    //   return process.env.NODE_ENV === 'development'
    //     ? 'http://localhost:3000'
    //     : 'https://cartoon-alpha.vercel.app'; // التأكد من العودة إلى التطبيق بعد تسجيل الدخول
    // },
  },

  session: {
    strategy: 'jwt',
  },
  debug: process.env.NODE_ENV === 'development',
  pages: {
    signIn: '/auth/signin', // صفحة تسجيل الدخول
    signOut: '/auth/signout', // صفحة تسجيل الخروج
  },
};
