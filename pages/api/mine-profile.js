export default async function handler(req, res) {
  const { address } = req.query

  if (!address || !/^0x[0-9a-fA-F]{40}$/.test(address)) {
    return res.status(400).json({ error: 'Invalid address' })
  }

  try {
    const upstream = await fetch(`https://minework.net/api/miners/${address}`, {
      headers: { 'User-Agent': 'minework-dashboard/0.1' },
    })

    const text = await upstream.text()
    let data
    try {
      data = JSON.parse(text)
    } catch {
      return res.status(upstream.status || 502).json({ error: 'Upstream returned non-JSON', raw: text.slice(0, 500) })
    }

    return res.status(upstream.status).json(data)
  } catch (error) {
    return res.status(500).json({ error: 'Failed to reach upstream', detail: String(error) })
  }
}
