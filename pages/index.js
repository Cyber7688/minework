import { useMemo, useState } from 'react'

const DEFAULT_WALLETS = [
  { name: 'validator-0001', role: 'validator', host: '1387', address: '0x0001A97906Ac0a12E6F97eba3c3C4a44399614c4' },
  { name: 'miner1387', role: 'miner', host: '1387', address: '0x9e3278Dc6A10B54ED08296F999a9e214edf4164a' },
  { name: 'miner1', role: 'miner', host: '1691', address: '0x1410e83a725DE68494AC6f4c4F8c91a0c821Af1d' },
  { name: 'miner2', role: 'miner', host: '1691', address: '0x4C363FC335eAf5c5D4330Ec5b493ECCB5162193A' },
  { name: 'miner3', role: 'miner', host: '1691', address: '0x83c9fc9F42F33437721d7d7baA63FD3127aB7E73' },
  { name: 'miner4', role: 'miner', host: '1691', address: '0x5940DE4e11B44d24a15bB745Fca823Ae61df3F96' },
  { name: 'miner5', role: 'miner', host: '1691', address: '0x2f5Da0c177C7BBF56977A944c9Db93e504ba1BD8' },
  { name: 'miner6', role: 'miner', host: '1691', address: '0x1ca521653a57854BB547E4e63119aC97a0284BEF' },
  { name: 'miner7', role: 'miner', host: '1691', address: '0x5451Cc662D5D2aC93694ba49811Bc58121A8784a' },
  { name: 'miner8', role: 'miner', host: '1691', address: '0x4508cca9Db55f7a2fAe07D56e1647899C3025CEf' },
  { name: 'miner9', role: 'miner', host: '1691', address: '0x03f35db06529f78B99C1a405D3153D7Df87cb642' },
  { name: 'miner10', role: 'miner', host: '1691', address: '0xcb7efeB724a980E6c4493bD1b0A527E407560461' },
  { name: 'miner11', role: 'miner', host: '1691', address: '0x1B71eDDa2607c4eB15d9116774c0C3D8fAF3f090' },
  { name: 'miner12', role: 'miner', host: '1691', address: '0x88c483135fAD4a2FB46946F3225044E12Acf0A68' },
  { name: 'miner13', role: 'miner', host: '1691', address: '0xEAD6D012E5530a6287b9A85bBB5e2d55add79d26' },
  { name: 'miner14', role: 'miner', host: '1691', address: '0x7b1a5efA12F53be548bb2400D6905c0a884Db590' },
  { name: 'miner15', role: 'miner', host: '1691', address: '0xb1107E59E6628433Dd4ca33B7C495380dff54D0f' },
  { name: 'miner16', role: 'miner', host: '1691', address: '0xbD4CE9f6F3f84b65A1c6e09E2cAc1f95fEAec54D' },
  { name: 'miner17', role: 'miner', host: '1691', address: '0xa0c93250f1e8dA03beF26f5D96955ba0E01501fA' },
  { name: '1', role: 'miner', host: 'LOKAL', address: '0x605E8042b009Fbc54424A3d957948ba155a285d9' },
]

function fmt(n) {
  if (n == null || Number.isNaN(Number(n))) return '-'
  return Number(n).toLocaleString(undefined, { maximumFractionDigits: 2 })
}

function short(addr) {
  return addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : '-'
}

function extractSummary(profile, history) {
  const miner = profile?.miner || {}
  const currentEpochMiner = profile?.current_epoch?.miner || {}
  const minerSummary = profile?.miner_summary || {}
  const totalRewards = minerSummary?.total_rewards ?? history.reduce((sum, item) => sum + (Number(item.reward_amount) || 0), 0)
  const qualifiedEpochs = history.filter((x) => x.qualified).length
  return {
    credit: miner.credit ?? 0,
    avgScore: currentEpochMiner.avg_score ?? 0,
    taskCount: currentEpochMiner.task_count ?? 0,
    online: Boolean(miner.online),
    totalRewards,
    qualifiedEpochs,
  }
}

export default function Home() {
  const [profiles, setProfiles] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const totals = useMemo(() => {
    const values = Object.values(profiles)
    return {
      loaded: values.length,
      online: values.filter((x) => x.summary?.online).length,
      totalRewards: values.reduce((sum, x) => sum + (Number(x.summary?.totalRewards) || 0), 0),
      totalTasks: values.reduce((sum, x) => sum + (Number(x.summary?.taskCount) || 0), 0),
    }
  }, [profiles])

  async function loadAll() {
    setLoading(true)
    setError('')
    const next = {}
    for (const wallet of DEFAULT_WALLETS) {
      try {
        const res = await fetch(`/api/mine-profile?address=${wallet.address}`)
        const json = await res.json()
        const profile = json.profile || null
        const history = json.history || []
        next[wallet.address] = {
          wallet,
          profile,
          history,
          summary: extractSummary(profile, history),
        }
      } catch (e) {
        next[wallet.address] = {
          wallet,
          profile: null,
          history: [],
          summary: null,
          error: String(e),
        }
      }
    }
    setProfiles(next)
    setLoading(false)
  }

  return (
    <div style={{ background: '#0b0f19', minHeight: '100vh', color: '#e5e7eb', fontFamily: 'Inter, Arial, sans-serif' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: 24 }}>
        <h1 style={{ fontSize: 32, marginBottom: 8 }}>MineWork Ops Dashboard</h1>
        <p style={{ color: '#94a3b8', marginBottom: 20 }}>Wallet overview based on MineWork rewards lookup data</p>

        <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
          <button onClick={loadAll} disabled={loading} style={{ background: '#2563eb', color: 'white', border: 0, borderRadius: 10, padding: '10px 16px', cursor: 'pointer' }}>
            {loading ? 'Loading...' : 'Refresh all wallets'}
          </button>
        </div>

        {error ? <div style={{ color: '#fca5a5', marginBottom: 12 }}>{error}</div> : null}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0,1fr))', gap: 12, marginBottom: 24 }}>
          <StatCard label="Wallets loaded" value={totals.loaded} />
          <StatCard label="Online miners" value={totals.online} />
          <StatCard label="Current epoch tasks" value={fmt(totals.totalTasks)} />
          <StatCard label="Total rewards" value={fmt(totals.totalRewards)} />
        </div>

        <div style={{ overflowX: 'auto', background: '#111827', borderRadius: 16, border: '1px solid #1f2937' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#0f172a', textAlign: 'left' }}>
                {['Name', 'Role', 'Host', 'Wallet', 'Online', 'Credit', 'Epoch Tasks', 'Avg Score', 'Qualified Epochs', 'Total Rewards'].map((h) => (
                  <th key={h} style={{ padding: 12, fontSize: 13, color: '#93c5fd', borderBottom: '1px solid #1f2937' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {DEFAULT_WALLETS.map((wallet) => {
                const row = profiles[wallet.address]
                const summary = row?.summary
                return (
                  <tr key={wallet.address} style={{ borderBottom: '1px solid #1f2937' }}>
                    <td style={{ padding: 12 }}>{wallet.name}</td>
                    <td style={{ padding: 12 }}>{wallet.role}</td>
                    <td style={{ padding: 12 }}>{wallet.host}</td>
                    <td style={{ padding: 12, fontFamily: 'monospace' }}>{short(wallet.address)}</td>
                    <td style={{ padding: 12 }}>{summary ? (summary.online ? 'Yes' : 'No') : '-'}</td>
                    <td style={{ padding: 12 }}>{summary ? fmt(summary.credit) : '-'}</td>
                    <td style={{ padding: 12 }}>{summary ? fmt(summary.taskCount) : '-'}</td>
                    <td style={{ padding: 12 }}>{summary ? fmt(summary.avgScore) : '-'}</td>
                    <td style={{ padding: 12 }}>{summary ? fmt(summary.qualifiedEpochs) : '-'}</td>
                    <td style={{ padding: 12 }}>{summary ? fmt(summary.totalRewards) : '-'}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <p style={{ marginTop: 18, color: '#64748b', fontSize: 13 }}>
          Data source: minework.net rewards lookup endpoint proxy via /api/mine-profile. This dashboard is front-end only and Vercel-friendly.
        </p>
      </div>
    </div>
  )
}

function StatCard({ label, value }) {
  return (
    <div style={{ background: '#111827', border: '1px solid #1f2937', borderRadius: 16, padding: 16 }}>
      <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 28, fontWeight: 700 }}>{value}</div>
    </div>
  )
}
