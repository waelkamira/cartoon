import { createProxyMiddleware } from 'http-proxy-middleware';

export default createProxyMiddleware({
  target: 'https://a.magsrv.com',
  changeOrigin: true,
  pathRewrite: {
    '^/api/ad': '', // تطابق مسار الجافاسكربت مع الخادم الهدف
  },
});
