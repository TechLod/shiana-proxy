export default async function handler(req, res) {
  try {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', '*');
    
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }

    // Get path after /api
    let path = req.url || '/';
    // Remove /api prefix if present
    if (path.startsWith('/api')) {
      path = path.replace('/api', '') || '/';
    }
    if (!path.startsWith('/')) path = '/' + path;

    const targetUrl = 'https://halnoikqqjiggbkutff.supabase.co' + path;
    
    const headers = {};
    if (req.headers['apikey']) headers['apikey'] = req.headers['apikey'];
    if (req.headers['authorization']) headers['authorization'] = req.headers['authorization'];
    if (req.headers['content-type']) headers['Content-Type'] = req.headers['content-type'];
    else headers['Content-Type'] = 'application/json';

    const options = {
      method: req.method,
      headers: headers,
    };

    if (req.method !== 'GET' && req.method !== 'HEAD' && req.body) {
      options.body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
    }

    const response = await fetch(targetUrl, options);
    const data = await response.text();
    
    res.status(response.status);
    // Copy content type
    const ct = response.headers.get('content-type');
    if (ct) res.setHeader('Content-Type', ct);
    return res.send(data);
    
  } catch (err) {
    return res.status(500).json({ error: err.message, stack: err.stack });
  }
}
