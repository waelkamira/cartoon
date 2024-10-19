export default async function handler(req, res) {
  const response = await fetch('https://cartoonz.top/', {
    method: req.method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(req.body),
  });

  const data = await response.json();

  res.status(200).json(data);
}
