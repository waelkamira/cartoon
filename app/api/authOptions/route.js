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

// import { createClient } from '@supabase/supabase-js';
// import bcrypt from 'bcrypt';
// import { v4 as uuidv4 } from 'uuid';
// import CredentialsProvider from 'next-auth/providers/credentials';
// import GoogleProvider from 'next-auth/providers/google';
// import { fetchSignInMethodsForEmail } from 'firebase/auth'; // استيراد دالة التحقق من Firebase
// import { auth } from '../../../components/authContext/firebase'; // استيراد إعدادات Firebase

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

//         // التحقق من صحة البريد الإلكتروني باستخدام Firebase
//         try {
//           const signInMethods = await fetchSignInMethodsForEmail(auth, email);

//           if (signInMethods.length === 0) {
//             throw new Error('البريد الإلكتروني غير مسجل في جوجل');
//           }
//         } catch (error) {
//           throw new Error(
//             'حدث خطأ أثناء التحقق من البريد الإلكتروني: ' + error.message
//           );
//         }

//         // التحقق من البيانات في Supabase
//         const { data: user, error } = await supabase
//           .from('User')
//           .select('*')
//           .eq('email', email)
//           .single();

//         if (error || !user) {
//           throw new Error('البريد الإلكتروني غير موجود في قاعدة البيانات');
//         }

//         const checkPassword = await bcrypt.compare(password, user.password);

//         if (!checkPassword) {
//           throw new Error('كلمة المرور غير صحيحة');
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
//           const newId = uuidv4();

//           const { error } = await supabase.from('User').insert({
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
//     signIn: '/auth/signin',
//     signOut: '/auth/signout',
//   },
// };

import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token; // حفظ التوكن
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken; // إضافة التوكن إلى الجلسة
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin', // صفحة تخصيص تسجيل الدخول
  },
};
