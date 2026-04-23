const LAST_GOOD_CACHE = global.__MINEWORK_LAST_GOOD_CACHE__ || new Map()
if (!global.__MINEWORK_LAST_GOOD_CACHE__) {
  global.__MINEWORK_LAST_GOOD_CACHE__ = LAST_GOOD_CACHE
}

const CACHE_TTL_MS = 10 * 60 * 1000

function isValidAddress(address) {
  return /^0x[0-9a-fA-F]{40}$/.test(address)
}

function normalizeAddress(address) {
  return String(address || '').toLowerCase()
}

function isEmptyMineSnapshot(data) {
  if (!data || typeof data !== 'object') return true
  const profile = data.profile || null
  const history = Array.isArray(data.history) ? data.history : []
  return !profile && history.length === 0
}

function withMeta(payload, meta) {
  return {
    ...payload,
    _meta: {
      ...(payload?._meta || {}),
      ...meta,
    },
  }
}

export default async function handler(req, res) {
  const { address } = req.query

  if (!address || !isValidAddress(address)) {
    return res.status(400).json({ error: 'Invalid address' })
  }

  const now = Date.now()
  const cacheKey = normalizeAddress(address)
  const cached = LAST_GOOD_CACHE.get(cacheKey)
  const cacheFresh = cached && (now - cached.savedAt <= CACHE_TTL_MS)

  try {
    const upstream = await fetch(`https://minework.net/api/miners/${address}`, {
      headers: { 'User-Agent': 'minework-dashboard/0.2' },
      signal: AbortSignal.timeout(15000),
      cache: 'no-store',
    })

    const text = await upstream.text()
    let data
    try {
      data = JSON.parse(text)
    } catch {
      if (cacheFresh) {
        return res.status(200).json(withMeta(cached.payload, {
          source: 'cache',
          fallbackReason: 'upstream_non_json',
          upstreamStatus: upstream.status || 502,
          cachedAt: new Date(cached.savedAt).toISOString(),
          cacheAgeMs: now - cached.savedAt,
        }))
      }
      return res.status(upstream.status || 502).json({ error: 'Upstream returned non-JSON', raw: text.slice(0, 500) })
    }

    const emptySnapshot = isEmptyMineSnapshot(data)
    if (upstream.ok && !emptySnapshot) {
      LAST_GOOD_CACHE.set(cacheKey, {
        savedAt: now,
        payload: withMeta(data, {
          source: 'upstream',
          cachedAt: new Date(now).toISOString(),
          cacheAgeMs: 0,
        }),
      })
      return res.status(200).json(withMeta(data, {
        source: 'upstream',
        cachedAt: new Date(now).toISOString(),
        cacheAgeMs: 0,
      }))
    }

    if (cacheFresh) {
      return res.status(200).json(withMeta(cached.payload, {
        source: 'cache',
        fallbackReason: emptySnapshot ? 'empty_snapshot' : 'upstream_not_ok',
        upstreamStatus: upstream.status || null,
        cachedAt: new Date(cached.savedAt).toISOString(),
        cacheAgeMs: now - cached.savedAt,
      }))
    }

    return res.status(upstream.status || 502).json(withMeta(data, {
      source: 'upstream',
      fallbackReason: emptySnapshot ? 'empty_snapshot_no_cache' : 'upstream_not_ok_no_cache',
      cachedAt: null,
      cacheAgeMs: null,
    }))
  } catch (error) {
    if (cacheFresh) {
      return res.status(200).json(withMeta(cached.payload, {
        source: 'cache',
        fallbackReason: 'upstream_fetch_error',
        cachedAt: new Date(cached.savedAt).toISOString(),
        cacheAgeMs: now - cached.savedAt,
        detail: String(error),
      }))
    }
    return res.status(500).json({ error: 'Failed to reach upstream', detail: String(error) })
  }
}
