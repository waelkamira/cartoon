import './globals.css';
import { Inter } from 'next/font/google';
import { Rubik } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import { InputsContextProvider } from '../components/Context';
import AuthContextProvider from '../components/authContext/AuthContext';
import Script from 'next/script'; // لاستيراد عنصر Script من Next.js
import BackButton from '../components/BackButton';

const inter = Inter({ subsets: ['latin'] });
const rubik = Rubik({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-rubik',
});

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="!scroll-smooth" dir="rtl">
      <head>
        {/* إضافة كود Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id=GTM-M53ZGKJ4';f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-M53ZGKJ4');`,
          }}
        />
      </head>
      <body className={rubik.className}>
        {/* <HappyTagAd /> */}
        <BackButton />
        {/* إضافة كود Google Tag Manager (noscript) بعد بداية <body> */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-M53ZGKJ4"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>

        <Toaster />
        <AuthContextProvider>
          <InputsContextProvider>{children}</InputsContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
