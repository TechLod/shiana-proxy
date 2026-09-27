export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const SUPABASE_URL = 'https://halnoikqjqijqgbkutff.supabase.co';

    let path = req.url || '/';
    if (path.startsWith('/api')) path = path.replace('/api', '');
    if (!path) path = '/';

    const targetUrl = SUPABASE_URL + path;

    const headers = {};
    // Copy important headers
    if (req.headers['apikey']) headers['apikey'] = req.headers['apikey'];
    if (req.headers['authorization']) headers['authorization'] = req.headers['authorization'];
    if (req.headers['content-type']) headers['Content-Type'] = req.headers['content-type'];
    if (req.headers['x-client-info']) headers['x-client-info'] = req.headers['x-client-info'];
    
    // If no apikey header, use your anon key as fallback
    if (!headers['apikey']) {
      headers['apikey'] = 'sb_publishable_kfSsqhkT-pCn5BV6xN5ymA_JB5K4rEB';
    }

    const opts = { method: req.method, headers };
    if (req.method !== 'GET' && req.method !== 'HEAD' && req.body) {
      opts.body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
    }

    const r = await fetch(targetUrl, opts);
    const data = await r.text();
    
    res.status(r.status);
    const ct = r.headers.get('content-type');
    if (ct) res.setHeader('Content-Type', ct);
    return res.send(data);

  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
