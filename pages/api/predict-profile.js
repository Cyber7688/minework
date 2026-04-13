export default async function handler(req, res) {
  const { address } = req.query

  if (!address || !/^0x[0-9a-fA-F]{40}$/.test(address)) {
    return res.status(400).json({ error: 'Invalid address' })
  }

  const headers = { 'User-Agent': 'minework-dashboard/0.1' }
  const base = 'https://api.agentpredict.work/api/v1'

  try {
    const [agentRes, predictionsRes, equityRes, epochRes] = await Promise.all([
      fetch(`${base}/agents/${address}`, { headers }),
      fetch(`${base}/agents/${address}/predictions?limit=20`, { headers }),
      fetch(`${base}/agents/${address}/equity-curve`, { headers }),
      fetch(`${base}/epochs/current`, { headers }),
    ])

    const [agentText, predictionsText, equityText, epochText] = await Promise.all([
      agentRes.text(),
      predictionsRes.text(),
      equityRes.text(),
      epochRes.text(),
    ])

    const parse = (text) => {
      try {
        return JSON.parse(text)
      } catch {
        return null
      }
    }

    const agentJson = parse(agentText)
    const predictionsJson = parse(predictionsText)
    const equityJson = parse(equityText)
    const epochJson = parse(epochText)

    if (!agentRes.ok) {
      return res.status(agentRes.status || 502).json({
        error: 'Predict upstream error',
        detail: agentJson || agentText.slice(0, 500),
      })
    }

    return res.status(200).json({
      profile: agentJson?.data || null,
      history: predictionsJson?.data?.data || [],
      equity: equityJson?.data || null,
      epoch: epochJson?.data || null,
    })
  } catch (error) {
    return res.status(500).json({ error: 'Failed to reach predict upstream', detail: String(error) })
  }
}
