export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const SUPABASE_URL = 'https://halnoikqqjiggbkutff.supabase.co';
    
    // Test if we can fetch Supabase at all
    const test = await fetch(SUPABASE_URL + '/rest/v1/', {
      headers: { apikey: 'test' }
    }).then(r => r.text()).catch(e => 'FETCH_ERROR: ' + e.message + ' cause: ' + JSON.stringify(e.cause));

    // Try main proxy
    let path = req.url || '/';
    if (path.startsWith('/api')) path = path.replace('/api','');
    const targetUrl = SUPABASE_URL + path;
    
    const headers = {};
    if (req.headers['apikey']) headers['apikey'] = req.headers['apikey'];
    if (req.headers['authorization']) headers['authorization'] = req.headers['authorization'];
    headers['Content-Type'] = 'application/json';

    const r = await fetch(targetUrl, { method: req.method, headers });
    const t = await r.text();
    
    res.status(r.status).send(t + '\n\n---TEST---\n' + test);
    
  } catch (err) {
    res.status(500).json({ 
      error: err.message, 
      cause: err.cause ? err.cause.message : 'no cause',
      full: err.toString()
    });
  }
}
