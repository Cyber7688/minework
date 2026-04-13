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
  { name: 'miner-local-extra', role: 'miner', host: 'local', address: '0x605E8042b009Fbc54424A3d957948ba155a285d9' },
]

const COLORS = {
  bg: '#03060d',
  bg2: '#090d18',
  panel: 'rgba(10, 18, 32, 0.82)',
  panelStrong: 'rgba(12, 22, 40, 0.94)',
  border: 'rgba(94, 234, 212, 0.18)',
  text: '#e6f7ff',
  subtext: '#87a3c3',
  cyan: '#67e8f9',
  green: '#4ade80',
  yellow: '#facc15',
  red: '#fb7185',
  blue: '#60a5fa',
  purple: '#a78bfa',
}

function fmt(n, digits = 2) {
  if (n == null || Number.isNaN(Number(n))) return '-'
  return Number(n).toLocaleString(undefined, { maximumFractionDigits: digits })
}

function short(addr) {
  return addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : '-'
}

function extractSummary(profile, history, wallet) {
  const miner = profile?.miner || {}
  const validator = profile?.validator || {}
  const currentEpochMiner = profile?.current_epoch?.miner || {}
  const currentEpochValidator = profile?.current_epoch?.validator || {}
  const minerSummary = profile?.miner_summary || {}
  const validatorSummary = profile?.validator_summary || {}
  const totalRewards = wallet.role === 'validator'
    ? (validatorSummary?.total_rewards ?? 0)
    : (minerSummary?.total_rewards ?? history.reduce((sum, item) => sum + (Number(item.reward_amount) || 0), 0))
  const qualifiedEpochs = history.filter((x) => x.qualified).length

  return {
    online: wallet.role === 'validator' ? Boolean(validator.online) : Boolean(miner.online),
    credit: wallet.role === 'validator' ? (validator.credit ?? 0) : (miner.credit ?? 0),
    taskCount: wallet.role === 'validator' ? (currentEpochValidator.eval_count ?? 0) : (currentEpochMiner.task_count ?? 0),
    avgScore: wallet.role === 'validator' ? (currentEpochValidator.accuracy ?? 0) : (currentEpochMiner.avg_score ?? 0),
    totalRewards,
    qualifiedEpochs,
  }
}

function getStatus(summary) {
  if (!summary) return { label: 'UNKNOWN', color: COLORS.yellow }
  if (summary.online) return { label: 'RUNNING', color: COLORS.green }
  return { label: 'STOPPED', color: COLORS.red }
}

export default function Home() {
  const [profiles, setProfiles] = useState({})
  const [loading, setLoading] = useState(false)
  const [lastUpdated, setLastUpdated] = useState(null)

  const rows = useMemo(() => {
    return DEFAULT_WALLETS.map((wallet) => {
      const row = profiles[wallet.address]
      return {
        wallet,
        profile: row?.profile || null,
        history: row?.history || [],
        summary: row?.summary || null,
        error: row?.error || null,
      }
    })
  }, [profiles])

  const totals = useMemo(() => {
    const summaries = rows.map((x) => x.summary).filter(Boolean)
    return {
      running: summaries.filter((x) => x.online).length,
      stopped: DEFAULT_WALLETS.length - summaries.filter((x) => x.online).length,
      tasks: summaries.reduce((sum, x) => sum + (Number(x.taskCount) || 0), 0),
      rewards: summaries.reduce((sum, x) => sum + (Number(x.totalRewards) || 0), 0),
      avgScore: summaries.length ? summaries.reduce((sum, x) => sum + (Number(x.avgScore) || 0), 0) / summaries.length : 0,
      qualifiedEpochs: summaries.reduce((sum, x) => sum + (Number(x.qualifiedEpochs) || 0), 0),
    }
  }, [rows])

  async function loadAll() {
    setLoading(true)
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
          summary: extractSummary(profile, history, wallet),
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
    setLastUpdated(new Date())
    setLoading(false)
  }

  return (
    <div style={{ minHeight: '100vh', background: `radial-gradient(circle at top left, rgba(103,232,249,0.10), transparent 25%), radial-gradient(circle at top right, rgba(167,139,250,0.12), transparent 22%), linear-gradient(180deg, ${COLORS.bg2} 0%, ${COLORS.bg} 100%)`, color: COLORS.text, fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace' }}>
      <div style={{ maxWidth: 1650, margin: '0 auto', padding: '30px 20px 50px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 16, flexWrap: 'wrap', marginBottom: 26 }}>
          <div>
            <div style={{ color: COLORS.green, fontSize: 13, letterSpacing: 3, marginBottom: 10, textTransform: 'uppercase' }}>
              &gt;_ minework // cyber ops console
            </div>
            <h1 style={{ margin: 0, fontSize: 38, lineHeight: 1.05, textShadow: '0 0 20px rgba(103,232,249,0.18)' }}>Fleet Monitoring Dashboard</h1>
            <p style={{ color: COLORS.subtext, marginTop: 12, marginBottom: 0, maxWidth: 860, lineHeight: 1.6 }}>
              Live wallet lookup view for validator + miner fleet. Optimized for quick scanning, terminal vibes, and late-night ops checks.
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <button onClick={loadAll} disabled={loading} style={{ background: loading ? '#12304a' : '#0f766e', color: 'white', border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: '12px 18px', fontWeight: 700, cursor: 'pointer', boxShadow: '0 0 24px rgba(20,184,166,0.18)' }}>
              {loading ? 'SYNCING...' : 'REFRESH ALL'}
            </button>
            <div style={{ color: COLORS.subtext, fontSize: 12 }}>
              {lastUpdated ? `last sync :: ${lastUpdated.toLocaleString()}` : 'last sync :: never'}
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, minmax(0, 1fr))', gap: 12, marginBottom: 24 }}>
          <MetricCard label="RUNNING" value={fmt(totals.running, 0)} color={COLORS.green} />
          <MetricCard label="STOPPED" value={fmt(totals.stopped, 0)} color={COLORS.yellow} />
          <MetricCard label="TASKS" value={fmt(totals.tasks, 0)} color={COLORS.cyan} />
          <MetricCard label="QUALIFIED" value={fmt(totals.qualifiedEpochs, 0)} color={COLORS.purple} />
          <MetricCard label="REWARDS" value={fmt(totals.rewards)} color={COLORS.green} />
          <MetricCard label="AVG SCORE" value={fmt(totals.avgScore)} color={COLORS.cyan} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 16, marginBottom: 24 }}>
          <Panel title="HOST MAP">
            <HostLine host="1387" count={rows.filter((r) => r.wallet.host === '1387').length} />
            <HostLine host="1691" count={rows.filter((r) => r.wallet.host === '1691').length} />
          </Panel>
          <Panel title="ROLE SPLIT">
            <HostLine host="miners" count={rows.filter((r) => r.wallet.role === 'miner').length} />
            <HostLine host="validators" count={rows.filter((r) => r.wallet.role === 'validator').length} />
          </Panel>
          <Panel title="OPS NOTES">
            <div style={{ color: COLORS.subtext, fontSize: 13, lineHeight: 1.7 }}>
              - Public wallet-only dashboard, no secrets exposed.<br />
              - Rewards/task data comes from MineWork wallet lookup.<br />
              - Use VPS scripts for process-level control and proxy checks.
            </div>
          </Panel>
        </div>

        <div style={{ overflowX: 'auto', background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 18, boxShadow: '0 10px 50px rgba(0,0,0,0.35), inset 0 0 40px rgba(96,165,250,0.04)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: COLORS.panelStrong }}>
                {['NAME', 'ROLE', 'HOST', 'WALLET', 'STATUS', 'CREDIT', 'TASKS', 'AVG SCORE', 'QUALIFIED', 'TOTAL REWARDS'].map((h) => (
                  <th key={h} style={{ padding: '14px 12px', textAlign: 'left', fontSize: 12, color: COLORS.subtext, letterSpacing: 1.2, borderBottom: `1px solid ${COLORS.border}` }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map(({ wallet, summary }) => {
                const status = getStatus(summary)
                return (
                  <tr key={wallet.address} style={{ borderBottom: `1px solid ${COLORS.border}` }}>
                    <td style={{ padding: 12, fontWeight: 700, color: COLORS.text }}>{wallet.name}</td>
                    <td style={{ padding: 12 }}>
                      <Badge color={wallet.role === 'validator' ? COLORS.yellow : COLORS.blue} text={wallet.role.toUpperCase()} />
                    </td>
                    <td style={{ padding: 12, color: COLORS.subtext }}>{wallet.host}</td>
                    <td style={{ padding: 12, color: COLORS.cyan }}>{short(wallet.address)}</td>
                    <td style={{ padding: 12 }}>
                      <Badge color={status.color} text={status.label} />
                    </td>
                    <td style={{ padding: 12 }}>{summary ? fmt(summary.credit) : '-'}</td>
                    <td style={{ padding: 12 }}>{summary ? fmt(summary.taskCount, 0) : '-'}</td>
                    <td style={{ padding: 12 }}>{summary ? fmt(summary.avgScore) : '-'}</td>
                    <td style={{ padding: 12 }}>{summary ? fmt(summary.qualifiedEpochs, 0) : '-'}</td>
                    <td style={{ padding: 12, color: COLORS.green }}>{summary ? fmt(summary.totalRewards) : '-'}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function MetricCard({ label, value, color }) {
  return (
    <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 16, padding: 16, boxShadow: 'inset 0 0 30px rgba(103,232,249,0.03)' }}>
      <div style={{ color: COLORS.subtext, fontSize: 12, letterSpacing: 1.4, marginBottom: 10 }}>{label}</div>
      <div style={{ fontSize: 30, fontWeight: 800, color, textShadow: `0 0 18px ${color}33` }}>{value}</div>
    </div>
  )
}

function Panel({ title, children }) {
  return (
    <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 16, padding: 16, boxShadow: 'inset 0 0 30px rgba(167,139,250,0.04)' }}>
      <div style={{ color: COLORS.cyan, fontSize: 13, marginBottom: 12, letterSpacing: 1.4 }}>{title}</div>
      {children}
    </div>
  )
}

function HostLine({ host, count }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', color: COLORS.text }}>
      <span style={{ textTransform: 'uppercase', color: COLORS.subtext }}>{host}</span>
      <strong style={{ color: COLORS.text }}>{count}</strong>
    </div>
  )
}

function Badge({ text, color }) {
  return (
    <span style={{ display: 'inline-block', padding: '6px 10px', borderRadius: 999, background: 'rgba(255,255,255,0.03)', border: `1px solid ${color}`, color, fontSize: 11, fontWeight: 700, letterSpacing: 1 }}>
      {text}
    </span>
  )
}
