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
            // id: newId, // إضافة id جديد
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
//     // تسجيل الدخول باستخدام Google
//     GoogleProvider({
//       clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
//       clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
//       // authorization: {
//       //   params: {
//       //     redirect_uri: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/callback/google`,
//       //   },
//       // },
//       allowDangerousEmailAccountLinking: true,
//     }),

//     // تسجيل الدخول باستخدام البريد وكلمة المرور
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

//         // البحث عن المستخدم في Supabase
//         const { data: user, error } = await supabase
//           .from('User')
//           .select('*')
//           .eq('email', email)
//           .single();

//         if (error || !user) {
//           throw new Error('Email not found');
//         }

//         // التحقق من كلمة المرور
//         const checkPassword = await bcrypt.compare(password, user.password);

//         if (!checkPassword) {
//           throw new Error('Incorrect password');
//         }

//         return user; // إذا كان التحقق ناجحًا، يتم إرجاع بيانات المستخدم
//       },
//     }),
//   ],

//   callbacks: {
//     // عند تسجيل الدخول
//     async signIn({ account, profile }) {
//       if (account.provider === 'google') {
//         const { data: existingUser, error: existingUserError } = await supabase
//           .from('User')
//           .select('*')
//           .eq('email', profile.email)
//           .single();

//         // إذا كان المستخدم غير موجود، قم بإنشاء حساب جديد
//         if (!existingUser) {
//           const newId = uuidv4(); // إنشاء UUID جديد
//           const { error } = await supabase.from('User').insert({
//             id: newId,
//             email: profile.email,
//             name: profile.name,
//             image: profile.picture,
//             googleId: profile.sub,
//           });

//           if (error) {
//             throw new Error(error.message);
//           }
//         } else if (!existingUser.googleId) {
//           // إذا كان المستخدم موجودًا لكن بدون Google ID
//           const { error } = await supabase
//             .from('User')
//             .update({ googleId: profile.sub })
//             .eq('email', profile.email);

//           if (error) {
//             throw new Error(error.message);
//           }
//         }

//         return true;
//       }

//       return true;
//     },

//     // إدارة الجلسة
//     async session({ session, token }) {
//       session.user.id = token.sub; // إضافة معرف المستخدم للجلسة
//       return session;
//     },

//     // إدارة الـ JWT
//     async jwt({ token, account }) {
//       if (account) {
//         token.accessToken = account.access_token; // إضافة رمز الوصول للجلسة
//       }
//       return token;
//     },

//     // إعادة توجيه المستخدم بعد تسجيل الدخول
//     async redirect({ url, baseUrl }) {
//       return url.startsWith(baseUrl) ? url : baseUrl;
//     },
//   },

//   session: {
//     strategy: 'jwt', // استخدام JWT لإدارة الجلسات
//   },

//   debug: process.env.NODE_ENV === 'development', // تفعيل التصحيح أثناء التطوير

//   pages: {
//     signIn: '/login', // تخصيص صفحة تسجيل الدخول
//   },
// };
