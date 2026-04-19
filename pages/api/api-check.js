const DEFAULT_ENDPOINTS = [
  { key: 'site_home', label: 'minework.net /', url: 'https://minework.net' },
  { key: 'site_miner_profile', label: 'minework.net /api/miners/:sample', url: 'https://minework.net/api/miners/0x95F92C1C955648473A4a6517dc300F789f2c4eC3' },
  { key: 'api_health', label: 'api.minework.net /health', url: 'https://api.minework.net/health' },
  { key: 'api_datasets', label: 'api.minework.net /api/core/v1/datasets', url: 'https://api.minework.net/api/core/v1/datasets' },
  { key: 'api_mining_health', label: 'api.minework.net /api/mining/v1/health', url: 'https://api.minework.net/api/mining/v1/health' },
]

async function checkOne(endpoint) {
  const startedAt = Date.now()
  try {
    const upstream = await fetch(endpoint.url, {
      method: 'GET',
      headers: { 'User-Agent': 'minework-dashboard/0.2 api-check' },
      signal: AbortSignal.timeout(12000),
      cache: 'no-store',
    })
    const text = await upstream.text()
    return {
      ...endpoint,
      ok: upstream.ok,
      status: upstream.status,
      elapsedMs: Date.now() - startedAt,
      headers: Object.fromEntries(Array.from(upstream.headers.entries()).slice(0, 12)),
      bodyPreview: text.slice(0, 500),
      error: null,
    }
  } catch (error) {
    return {
      ...endpoint,
      ok: false,
      status: null,
      elapsedMs: Date.now() - startedAt,
      headers: {},
      bodyPreview: '',
      error: String(error),
    }
  }
}

export default async function handler(req, res) {
  try {
    const keysRaw = req.query.keys
    const keys = Array.isArray(keysRaw)
      ? keysRaw.flatMap((x) => String(x).split(','))
      : keysRaw
        ? String(keysRaw).split(',')
        : []
    const wanted = new Set(keys.map((x) => x.trim()).filter(Boolean))
    const endpoints = wanted.size
      ? DEFAULT_ENDPOINTS.filter((x) => wanted.has(x.key))
      : DEFAULT_ENDPOINTS

    const results = await Promise.all(endpoints.map(checkOne))
    const summary = {
      total: results.length,
      ok: results.filter((x) => x.ok).length,
      failed: results.filter((x) => !x.ok).length,
      checkedAt: new Date().toISOString(),
      selectedKeys: endpoints.map((x) => x.key),
    }
    return res.status(200).json({ summary, results, endpoints: DEFAULT_ENDPOINTS })
  } catch (error) {
    return res.status(500).json({ error: 'Failed to run API checks', detail: String(error), endpoints: DEFAULT_ENDPOINTS })
  }
}
