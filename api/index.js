export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  if (req.method === 'OPTIONS') return res.status(200).end();
  const target = 'https://halnoikqqjiggbkutff.supabase.co' + (req.url || '');
  const headers = {};
  if (req.headers.apikey) headers.apikey = req.headers.apikey;
  if (req.headers.authorization) headers.authorization = req.headers.authorization;
  headers['Content-Type'] = 'application/json';
  const r = await fetch(target, { method: req.method, headers });
  const t = await r.text();
  res.status(r.status).send(t);
}
