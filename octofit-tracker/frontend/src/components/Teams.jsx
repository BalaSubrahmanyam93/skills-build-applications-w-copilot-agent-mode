import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function Teams() {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchCollection('teams').then(setTeams).catch((requestError) => setError(requestError.message)) }, [])
  return <section className="data-view"><PageHeading eyebrow="COLLECTIVE ENERGY" title="Teams" copy="Find your people. Build something consistent together." />{error ? <ErrorNotice message={error} /> : <div className="team-grid">{teams.length ? teams.map((team) => <article className="team-card" key={team._id || team.id || team.name}><div className="team-card-top"><span className="team-symbol">{(team.name || 'T')[0]}</span><span className="team-count">{team.members?.length || 0} members</span></div><h2>{team.name || 'Unnamed team'}</h2><p>"{team.motto || 'Consistency compounds.'}"</p><div className="goal-bar"><span style={{ width: `${Math.min(100, (team.weeklyGoalMinutes || 0) / 4)}%` }} /></div><small>{team.weeklyGoalMinutes || 0} min weekly goal</small></article>) : <EmptyState label="No teams created yet" />}</div>}</section>
}
export default Teams
function PageHeading({ eyebrow, title, copy }) { return <div className="page-heading"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{copy}</p></div> }
function ErrorNotice({ message }) { return <div className="notice error-notice">{message}. Check that the API is running on port 8000.</div> }
function EmptyState({ label }) { return <div className="empty-state">{label}</div> }
