const DEFAULT_MINER_ADDRESS = '0x95F92C1C955648473A4a6517dc300F789f2c4eC3'

const DEFAULT_ENDPOINTS = [
  { key: 'site_home', label: 'minework.net /', url: 'https://minework.net' },
  { key: 'site_miner_profile', label: 'minework.net /api/miners/:wallet', url: `https://minework.net/api/miners/${DEFAULT_MINER_ADDRESS}` },
  { key: 'api_health', label: 'api.minework.net /health', url: 'https://api.minework.net/health' },
  { key: 'api_signature_config', label: 'api.minework.net /api/public/v1/signature-config', url: 'https://api.minework.net/api/public/v1/signature-config' },
  { key: 'api_datasets', label: 'api.minework.net /api/core/v1/datasets', url: 'https://api.minework.net/api/core/v1/datasets' },
  { key: 'api_dedup_check', label: 'api.minework.net /api/core/v1/dedup/check (unauth probe)', url: 'https://api.minework.net/api/core/v1/dedup/check' },
  { key: 'api_mining_heartbeat', label: 'api.minework.net /api/mining/v1/heartbeat (unauth probe)', url: 'https://api.minework.net/api/mining/v1/heartbeat', okStatuses: [400, 401, 405] },
  { key: 'api_miner_ready', label: 'api.minework.net /api/mining/v1/miners/ready (unauth probe)', url: 'https://api.minework.net/api/mining/v1/miners/ready', okStatuses: [400, 401, 405] },
  { key: 'api_repeat_claim', label: 'api.minework.net /api/mining/v1/repeat-crawl-tasks/claim (unauth probe)', url: 'https://api.minework.net/api/mining/v1/repeat-crawl-tasks/claim', okStatuses: [400, 401, 405] },
  { key: 'api_ws_probe', label: 'api.minework.net /api/mining/v1/ws (HTTP probe)', url: 'https://api.minework.net/api/mining/v1/ws', okStatuses: [400, 404, 405, 426] },
  { key: 'api_mining_health', label: 'api.minework.net /api/mining/v1/health', url: 'https://api.minework.net/api/mining/v1/health' },
]

function isEndpointOk(endpoint, upstream) {
  if (upstream.ok) return true
  const accepted = Array.isArray(endpoint.okStatuses) ? endpoint.okStatuses : []
  return accepted.includes(upstream.status)
}

function endpointNote(endpoint, upstream) {
  if (!Array.isArray(endpoint.okStatuses) || !endpoint.okStatuses.includes(upstream.status)) {
    return null
  }
  return `accepted non-200 status ${upstream.status} for probe`
}

function buildEndpoints(minerAddress = DEFAULT_MINER_ADDRESS) {
  return DEFAULT_ENDPOINTS.map((endpoint) =>
    endpoint.key === 'site_miner_profile'
      ? { ...endpoint, url: `https://minework.net/api/miners/${minerAddress}` }
      : endpoint
  )
}

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
      ok: isEndpointOk(endpoint, upstream),
      status: upstream.status,
      elapsedMs: Date.now() - startedAt,
      headers: Object.fromEntries(Array.from(upstream.headers.entries()).slice(0, 12)),
      bodyPreview: text.slice(0, 500),
      note: endpointNote(endpoint, upstream),
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
    const minerAddressRaw = String(req.query.minerAddress || DEFAULT_MINER_ADDRESS).trim()
    const minerAddress = /^0x[a-fA-F0-9]{40}$/.test(minerAddressRaw) ? minerAddressRaw : DEFAULT_MINER_ADDRESS
    const allEndpoints = buildEndpoints(minerAddress)

    const keys = Array.isArray(keysRaw)
      ? keysRaw.flatMap((x) => String(x).split(','))
      : keysRaw
        ? String(keysRaw).split(',')
        : []
    const wanted = new Set(keys.map((x) => x.trim()).filter(Boolean))
    const endpoints = wanted.size
      ? allEndpoints.filter((x) => wanted.has(x.key))
      : allEndpoints

    const results = await Promise.all(endpoints.map(checkOne))
    const summary = {
      total: results.length,
      ok: results.filter((x) => x.ok).length,
      failed: results.filter((x) => !x.ok).length,
      checkedAt: new Date().toISOString(),
      selectedKeys: endpoints.map((x) => x.key),
      minerAddress,
    }
    return res.status(200).json({ summary, results, endpoints: allEndpoints })
  } catch (error) {
    return res.status(500).json({ error: 'Failed to run API checks', detail: String(error), endpoints: buildEndpoints(DEFAULT_MINER_ADDRESS) })
  }
}
