import { useEffect, useState } from 'react'
import { apiBaseUrl, fetchEndpoint } from '../api.js'

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchEndpoint(`${apiBaseUrl}/api/leaderboard/`).then(setEntries).catch((requestError) => setError(requestError.message)) }, [])
  return <section className="data-view"><PageHeading eyebrow="THE RACE" title="Leaderboard" copy="A little friendly pressure goes a long way." />{error ? <ErrorNotice message={error} /> : <div className="leaderboard-list">{entries.length ? entries.map((entry, index) => <article className={`leader-row rank-${entry.rank || index + 1}`} key={entry._id || entry.id || entry.user?._id}><span className="rank">{String(entry.rank || index + 1).padStart(2, '0')}</span><span className="avatar small-avatar">{initials(entry.user?.displayName || entry.user?.username || 'Member')}</span><span className="leader-name"><b>{entry.user?.displayName || entry.user?.username || 'OctoFit member'}</b><small>{entry.period || 'Current period'}</small></span><strong>{(entry.points || 0).toLocaleString()}<small> pts</small></strong></article>) : <EmptyState label="No leaderboard data yet" />}</div>}</section>
}
export default Leaderboard
function PageHeading({ eyebrow, title, copy }) { return <div className="page-heading"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{copy}</p></div> }
function ErrorNotice({ message }) { return <div className="notice error-notice">{message}. Check that the API is running on port 8000.</div> }
function EmptyState({ label }) { return <div className="empty-state">{label}</div> }
function initials(name) { return name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase() }
