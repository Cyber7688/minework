import { useMemo, useState } from 'react'

const MINE_WALLETS = [
  { name: 'validator-0001', role: 'validator', host: '1387', datasets: ['validator'], address: '0x0001A97906Ac0a12E6F97eba3c3C4a44399614c4' },
  { name: 'miner1387', role: 'miner', host: '1387', datasets: ['ds_arxiv'], address: '0x9e3278Dc6A10B54ED08296F999a9e214edf4164a' },
  { name: 'miner1', role: 'miner', host: '1691', datasets: ['ds_wikipedia'], address: '0x1410e83a725DE68494AC6f4c4F8c91a0c821Af1d' },
  { name: 'miner2', role: 'miner', host: '1691', datasets: ['ds_wikipedia'], address: '0x4C363FC335eAf5c5D4330Ec5b493ECCB5162193A' },
  { name: 'miner3', role: 'miner', host: '1691', datasets: ['ds_wikipedia'], address: '0x83c9fc9F42F33437721d7d7baA63FD3127aB7E73' },
  { name: 'miner4', role: 'miner', host: '1691', datasets: ['ds_wikipedia'], address: '0x5940DE4e11B44d24a15bB745Fca823Ae61df3F96' },
  { name: 'miner5', role: 'miner', host: '1691', datasets: ['ds_arxiv'], address: '0x2f5Da0c177C7BBF56977A944c9Db93e504ba1BD8' },
  { name: 'miner6', role: 'miner', host: '1691', datasets: ['ds_arxiv'], address: '0x1ca521653a57854BB547E4e63119aC97a0284BEF' },
  { name: 'miner7', role: 'miner', host: '1691', datasets: ['ds_arxiv'], address: '0x5451Cc662D5D2aC93694ba49811Bc58121A8784a' },
  { name: 'miner8', role: 'miner', host: '1691', datasets: ['ds_wikipedia'], address: '0x4508cca9Db55f7a2fAe07D56e1647899C3025CEf' },
  { name: 'miner9', role: 'miner', host: '1691', datasets: ['ds_wikipedia'], address: '0x03f35db06529f78B99C1a405D3153D7Df87cb642' },
  { name: 'miner10', role: 'miner', host: '1691', datasets: ['ds_wikipedia'], address: '0xcb7efeB724a980E6c4493bD1b0A527E407560461' },
  { name: 'miner11', role: 'miner', host: '1691', datasets: ['ds_wikipedia'], address: '0x1B71eDDa2607c4eB15d9116774c0C3D8fAF3f090' },
  { name: 'miner12', role: 'miner', host: '1691', datasets: ['ds_wikipedia'], address: '0x88c483135fAD4a2FB46946F3225044E12Acf0A68' },
  { name: 'miner13', role: 'miner', host: '1691', datasets: ['ds_wikipedia'], address: '0xEAD6D012E5530a6287b9A85bBB5e2d55add79d26' },
  { name: 'miner14', role: 'miner', host: '1691', datasets: ['ds_wikipedia'], address: '0x7b1a5efA12F53be548bb2400D6905c0a884Db590' },
  { name: 'miner15', role: 'miner', host: '1691', datasets: ['ds_wikipedia'], address: '0xb1107E59E6628433Dd4ca33B7C495380dff54D0f' },
  { name: 'miner16', role: 'miner', host: '1691', datasets: ['ds_arxiv'], address: '0xbD4CE9f6F3f84b65A1c6e09E2cAc1f95fEAec54D' },
  { name: 'miner17', role: 'miner', host: '1691', datasets: ['ds_arxiv'], address: '0xa0c93250f1e8dA03beF26f5D96955ba0E01501fA' },
  { name: 'miner-local-extra', role: 'miner', host: 'local', datasets: ['ds_wikipedia', 'ds_linkedin_company'], address: '0x605E8042b009Fbc54424A3d957948ba155a285d9' },
]

const PREDICT_WALLETS = [
  { name: 'predict1', role: 'predict', host: '1691', datasets: ['persona: chartist'], address: '0x8d3EB4AC0c33d03de6d4342d158f9Aaa75ed1D73' },
  { name: 'predict2', role: 'predict', host: '1691', datasets: ['persona: macro'], address: '0x301926AAeC232EBeb6d2919E1A87E0f9351f082E' },
  { name: 'predict3', role: 'predict', host: '1691', datasets: ['persona: sentiment'], address: '0xEF68BF14A49E11d153D9d2D975Db6bA6E81fe778' },
  { name: 'predict4', role: 'predict', host: '1691', datasets: ['persona: contrarian'], address: '0x8CDB337C54C03826B342b362102226B28365473f' },
  { name: 'predict5', role: 'predict', host: '1691', datasets: ['persona: degen'], address: '0x4D5C37ffbF149E03186776C381b14516E0eF6c66' },
  { name: 'predict6', role: 'predict', host: '1691', datasets: ['persona: conservative'], address: '0x95800cc443e613C0f8F11f2377070B969C449C8a' },
  { name: 'predict7', role: 'predict', host: '1691', datasets: ['persona: sniper'], address: '0x3357661EE6548a3ff5BDCBdD995E8C91EcDF585a' },
  { name: 'predict8', role: 'predict', host: '1691', datasets: ['persona: chartist'], address: '0x5107100D36E54dD28BEbB732621d8521A2A16181' },
  { name: 'predict9', role: 'predict', host: '1691', datasets: ['persona: macro'], address: '0xee9A8E4D5B3D2773964290F618119F29B92Adc9d' },
  { name: 'predict10', role: 'predict', host: '1691', datasets: ['persona: sentiment'], address: '0x73E29f56Bd9ecD82c2A70DF90E109e5B44B44441' },
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

function extractSummary(profile, history, wallet, extras = {}) {
  if (wallet.role === 'predict') {
    const stats = profile?.stats || {}
    const today = profile?.today || {}
    const epoch = extras?.epoch || {}
    const equity = extras?.equity || {}

    return {
      online: Number(today.balance ?? 0) > 0,
      credit: Number(today.balance ?? 0),
      taskCount: Number(today.submissions ?? stats.total_submissions ?? 0),
      avgScore: Number(today.accuracy ?? stats.accuracy ?? 0),
      totalRewards: Number(today.estimated_reward ?? stats.total_earned ?? 0),
      qualifiedEpochs: Number(today.correct ?? stats.correct ?? 0),
      resolved: Number(today.resolved ?? stats.total_resolved ?? 0),
      excess: Number(today.excess ?? stats.net_chips ?? 0),
      rank: Number(stats.rank ?? 0),
      pnl: Number(equity.final_pnl ?? 0),
      currentEpochPredictions: Number(epoch.predictions_today ?? 0),
      marketsResolved: Number(epoch.markets_resolved ?? 0),
    }
  }

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
  const [hostFilter, setHostFilter] = useState('all')
  const [roleFilter, setRoleFilter] = useState('all')
  const [copied, setCopied] = useState('')
  const [viewMode, setViewMode] = useState('mine')

  const activeWallets = viewMode === 'predict' ? PREDICT_WALLETS : MINE_WALLETS

  const rows = useMemo(() => {
    return activeWallets.map((wallet) => {
      const row = profiles[wallet.address]
      return {
        wallet,
        profile: row?.profile || null,
        history: row?.history || [],
        summary: row?.summary || null,
      }
    })
  }, [profiles, activeWallets])

  const filteredRows = useMemo(() => {
    return rows.filter(({ wallet }) => {
      const hostOk = hostFilter === 'all' || wallet.host === hostFilter
      const roleOk = roleFilter === 'all' || wallet.role === roleFilter
      return hostOk && roleOk
    })
  }, [rows, hostFilter, roleFilter])

  const hostOptions = useMemo(() => ['all', ...Array.from(new Set(activeWallets.map((wallet) => wallet.host)))], [activeWallets])
  const roleOptions = useMemo(() => ['all', ...Array.from(new Set(activeWallets.map((wallet) => wallet.role)))], [activeWallets])

  const totals = useMemo(() => {
    const summaries = filteredRows.map((x) => x.summary).filter(Boolean)
    return {
      running: summaries.filter((x) => x.online).length,
      stopped: filteredRows.length - summaries.filter((x) => x.online).length,
      tasks: summaries.reduce((sum, x) => sum + (Number(x.taskCount) || 0), 0),
      rewards: summaries.reduce((sum, x) => sum + (Number(x.totalRewards) || 0), 0),
      avgScore: summaries.length ? summaries.reduce((sum, x) => sum + (Number(x.avgScore) || 0), 0) / summaries.length : 0,
      qualifiedEpochs: summaries.reduce((sum, x) => sum + (Number(x.qualifiedEpochs) || 0), 0),
    }
  }, [filteredRows])

  async function loadAll() {
    setLoading(true)
    const next = {}
    for (const wallet of activeWallets) {
      try {
        const endpoint = wallet.role === 'predict' ? 'predict-profile' : 'mine-profile'
        const res = await fetch(`/api/${endpoint}?address=${wallet.address}`)
        const json = await res.json()
        const profile = json.profile || null
        const history = json.history || []
        const extras = {
          equity: json.equity || null,
          epoch: json.epoch || null,
        }
        next[wallet.address] = {
          wallet,
          profile,
          history,
          summary: extractSummary(profile, history, wallet, extras),
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

  async function copyAddress(addr) {
    try {
      await navigator.clipboard.writeText(addr)
      setCopied(addr)
      setTimeout(() => setCopied(''), 1500)
    } catch {}
  }

  function switchView(nextView) {
    setViewMode(nextView)
    setProfiles({})
    setHostFilter('all')
    setRoleFilter('all')
    setLastUpdated(null)
  }

  return (
    <div style={{ minHeight: '100vh', background: `radial-gradient(circle at top left, rgba(103,232,249,0.10), transparent 25%), radial-gradient(circle at top right, rgba(167,139,250,0.12), transparent 22%), linear-gradient(180deg, ${COLORS.bg2} 0%, ${COLORS.bg} 100%)`, color: COLORS.text, fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace' }}>
      <div style={{ maxWidth: 1650, margin: '0 auto', padding: '30px 16px 50px' }}>
        <style>{`
          @media (max-width: 900px) {
            .metrics-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
            .panels-grid { grid-template-columns: 1fr !important; }
            .desktop-table { display: none !important; }
            .mobile-cards { display: block !important; }
            .top-controls { flex-direction: column !important; align-items: stretch !important; }
          }
          @media (min-width: 901px) {
            .mobile-cards { display: none !important; }
          }
        `}</style>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 16, flexWrap: 'wrap', marginBottom: 26 }}>
          <div>
            <div style={{ color: COLORS.green, fontSize: 13, letterSpacing: 3, marginBottom: 10, textTransform: 'uppercase' }}>
              &gt;_ {viewMode === 'predict' ? 'predict worknet' : 'minework'} // cyber ops console
            </div>
            <h1 style={{ margin: 0, fontSize: 38, lineHeight: 1.05, textShadow: '0 0 20px rgba(103,232,249,0.18)' }}>
              {viewMode === 'predict' ? 'Predict Fleet Dashboard' : 'Fleet Monitoring Dashboard'}
            </h1>
            <p style={{ color: COLORS.subtext, marginTop: 12, marginBottom: 0, maxWidth: 860, lineHeight: 1.6 }}>
              {viewMode === 'predict'
                ? 'Separate view for Predict wallets with persona labels, wallet visibility, and quick ops refresh.'
                : 'Full wallet visibility, filters, copyable addresses, and a mobile-friendly ops view.'}
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

        <div className="top-controls" style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 18 }}>
          <ViewToggle value={viewMode} onChange={switchView} />
          <FilterBox label="HOST" value={hostFilter} onChange={setHostFilter} options={hostOptions} />
          <FilterBox label="ROLE" value={roleFilter} onChange={setRoleFilter} options={roleOptions} />
        </div>

        <div className="metrics-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(6, minmax(0, 1fr))', gap: 12, marginBottom: 24 }}>
          <MetricCard label="RUNNING" value={fmt(totals.running, 0)} color={COLORS.green} />
          <MetricCard label="STOPPED" value={fmt(totals.stopped, 0)} color={COLORS.yellow} />
          <MetricCard label={viewMode === 'predict' ? 'SUBMISSIONS' : 'TASKS'} value={fmt(totals.tasks, 0)} color={COLORS.cyan} />
          <MetricCard label={viewMode === 'predict' ? 'CORRECT' : 'QUALIFIED'} value={fmt(totals.qualifiedEpochs, 0)} color={COLORS.purple} />
          <MetricCard label={viewMode === 'predict' ? 'EST. REWARD' : 'REWARDS'} value={fmt(totals.rewards)} color={COLORS.green} />
          <MetricCard label={viewMode === 'predict' ? 'ACCURACY' : 'AVG SCORE'} value={fmt(totals.avgScore)} color={COLORS.cyan} />
        </div>

        <div className="panels-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 16, marginBottom: 24 }}>
          <Panel title="HOST MAP">
            {hostOptions.filter((host) => host !== 'all').map((host) => (
              <HostLine key={host} host={host} count={rows.filter((r) => r.wallet.host === host).length} />
            ))}
          </Panel>
          <Panel title="ROLE SPLIT">
            {roleOptions.filter((role) => role !== 'all').map((role) => (
              <HostLine key={role} host={role} count={rows.filter((r) => r.wallet.role === role).length} />
            ))}
          </Panel>
          <Panel title="OPS NOTES">
            <div style={{ color: COLORS.subtext, fontSize: 13, lineHeight: 1.7 }}>
              - Tap/click COPY to grab a full wallet address.<br />
              - Mobile switches to stacked cards automatically.<br />
              - {viewMode === 'predict' ? 'Persona hints below are static ops labels for predict wallets.' : 'Dataset hints below are static ops labels, not secrets.'}
            </div>
          </Panel>
        </div>

        <div className="desktop-table" style={{ overflowX: 'auto', background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 18, boxShadow: '0 10px 50px rgba(0,0,0,0.35), inset 0 0 40px rgba(96,165,250,0.04)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: COLORS.panelStrong }}>
                {(viewMode === 'predict'
                  ? ['NAME', 'ROLE', 'HOST', 'WALLET', 'STATUS', 'PERSONA', 'BALANCE', 'SUBMITS', 'ACCURACY', 'EST. REWARD']
                  : ['NAME', 'ROLE', 'HOST', 'WALLET', 'STATUS', 'DATASETS', 'CREDIT', 'TASKS', 'AVG SCORE', 'TOTAL REWARDS']
                ).map((h) => (
                  <th key={h} style={{ padding: '14px 12px', textAlign: 'left', fontSize: 12, color: COLORS.subtext, letterSpacing: 1.2, borderBottom: `1px solid ${COLORS.border}` }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredRows.map(({ wallet, summary }) => {
                const status = getStatus(summary)
                return (
                  <tr key={wallet.address} style={{ borderBottom: `1px solid ${COLORS.border}` }}>
                    <td style={{ padding: 12, fontWeight: 700 }}>{wallet.name}</td>
                    <td style={{ padding: 12 }}><Badge color={wallet.role === 'validator' ? COLORS.yellow : wallet.role === 'predict' ? COLORS.purple : COLORS.blue} text={wallet.role.toUpperCase()} /></td>
                    <td style={{ padding: 12, color: COLORS.subtext }}>{wallet.host}</td>
                    <td style={{ padding: 12, maxWidth: 360 }}>
                      <div style={{ color: COLORS.cyan, fontSize: 12, wordBreak: 'break-all', marginBottom: 8 }}>{wallet.address}</div>
                      <button onClick={() => copyAddress(wallet.address)} style={{ background: 'transparent', color: copied === wallet.address ? COLORS.green : COLORS.subtext, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: '6px 10px', fontSize: 11, cursor: 'pointer' }}>
                        {copied === wallet.address ? 'COPIED' : 'COPY'}
                      </button>
                    </td>
                    <td style={{ padding: 12 }}><Badge color={status.color} text={status.label} /></td>
                    <td style={{ padding: 12, color: COLORS.subtext, fontSize: 12 }}>{wallet.datasets.join(', ')}</td>
                    <td style={{ padding: 12 }}>{summary ? fmt(summary.credit) : '-'}</td>
                    <td style={{ padding: 12 }}>{summary ? fmt(summary.taskCount, 0) : '-'}</td>
                    <td style={{ padding: 12 }}>{summary ? fmt(summary.avgScore) : '-'}</td>
                    <td style={{ padding: 12, color: COLORS.green }}>{summary ? fmt(summary.totalRewards) : '-'}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <div className="mobile-cards" style={{ display: 'none' }}>
          {filteredRows.map(({ wallet, summary }) => {
            const status = getStatus(summary)
            return (
              <div key={wallet.address} style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 16, padding: 14, marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <strong>{wallet.name}</strong>
                  <Badge color={status.color} text={status.label} />
                </div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 10 }}>
                  <Badge color={wallet.role === 'validator' ? COLORS.yellow : wallet.role === 'predict' ? COLORS.purple : COLORS.blue} text={wallet.role.toUpperCase()} />
                  <Badge color={COLORS.purple} text={`HOST ${wallet.host}`} />
                </div>
                <div style={{ color: COLORS.cyan, wordBreak: 'break-all', fontSize: 12, marginBottom: 10 }}>{wallet.address}</div>
                <button onClick={() => copyAddress(wallet.address)} style={{ background: 'transparent', color: copied === wallet.address ? COLORS.green : COLORS.subtext, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: '6px 10px', fontSize: 11, cursor: 'pointer', marginBottom: 12 }}>
                  {copied === wallet.address ? 'COPIED' : 'COPY ADDRESS'}
                </button>
                <div style={{ color: COLORS.subtext, fontSize: 12, marginBottom: 12 }}>Datasets: {wallet.datasets.join(', ')}</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0,1fr))', gap: 10, fontSize: 13 }}>
                  <SmallField label="Credit" value={summary ? fmt(summary.credit) : '-'} />
                  <SmallField label="Tasks" value={summary ? fmt(summary.taskCount, 0) : '-'} />
                  <SmallField label="Avg Score" value={summary ? fmt(summary.avgScore) : '-'} />
                  <SmallField label="Qualified" value={summary ? fmt(summary.qualifiedEpochs, 0) : '-'} />
                  <SmallField label="Rewards" value={summary ? fmt(summary.totalRewards) : '-'} />
                </div>
              </div>
            )
          })}
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

function SmallField({ label, value }) {
  return (
    <div style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 10 }}>
      <div style={{ color: COLORS.subtext, fontSize: 11, marginBottom: 6 }}>{label}</div>
      <div style={{ color: COLORS.text, fontWeight: 700 }}>{value}</div>
    </div>
  )
}

function ViewToggle({ value, onChange }) {
  const options = [
    { value: 'mine', label: 'MINE' },
    { value: 'predict', label: 'PREDICT' },
  ]

  return (
    <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: '10px 12px', display: 'flex', flexDirection: 'column', minWidth: 180 }}>
      <span style={{ color: COLORS.subtext, fontSize: 11, marginBottom: 8 }}>VIEW</span>
      <div style={{ display: 'flex', gap: 8 }}>
        {options.map((opt) => {
          const active = value === opt.value
          return (
            <button
              key={opt.value}
              onClick={() => onChange(opt.value)}
              style={{
                background: active ? 'rgba(103,232,249,0.16)' : 'transparent',
                color: active ? COLORS.cyan : COLORS.subtext,
                border: `1px solid ${active ? COLORS.cyan : COLORS.border}`,
                borderRadius: 10,
                padding: '8px 12px',
                fontSize: 11,
                fontWeight: 700,
                cursor: 'pointer',
                letterSpacing: 1,
              }}
            >
              {opt.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function FilterBox({ label, value, onChange, options }) {
  return (
    <label style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: '10px 12px', display: 'flex', flexDirection: 'column', minWidth: 160 }}>
      <span style={{ color: COLORS.subtext, fontSize: 11, marginBottom: 6 }}>{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} style={{ background: 'transparent', color: COLORS.text, border: 0, outline: 'none', fontFamily: 'inherit' }}>
        {options.map((opt) => <option key={opt} value={opt} style={{ color: 'black' }}>{opt}</option>)}
      </select>
    </label>
  )
}
