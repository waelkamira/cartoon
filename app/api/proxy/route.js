// pages/api/cors.js
export default function handler(req, res) {
  // السماح بالأصل
  res.setHeader('Access-Control-Allow-Origin', '*'); // استبدل '*' بالأصل المطلوب في الإنتاج
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // التعامل مع الطلب OPTIONS
  if (req.method === 'OPTIONS') {
    res.status(200).end(); // فقط رد على الطلبات OPTIONS
    return;
  }

  // هنا يمكنك التعامل مع الطلبات الأخرى (GET، POST، إلخ.)
  res.status(200).json({ message: 'CORS is configured!' });
}
