import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function Activities() {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchCollection('activities').then(setActivities).catch((requestError) => setError(requestError.message)) }, [])
  return <section className="data-view"><PageHeading eyebrow="MOVEMENT LOG" title="Activities" copy="Every session is a signal. Keep the streak visible." />{error ? <ErrorNotice message={error} /> : <div className="activity-list">{activities.length ? activities.map((activity) => <article className="activity-row" key={activity._id || activity.id || `${activity.type}-${activity.completedAt}`}><span className="activity-glyph">{activity.type === 'run' ? 'R' : activity.type === 'cycle' ? 'C' : 'S'}</span><span className="activity-main"><b>{activity.type || 'Workout'}</b><small>{activity.user?.displayName || activity.user?.username || 'OctoFit member'} - {formatDate(activity.completedAt)}</small></span><strong>{activity.durationMinutes || 0}<small> min</small></strong><span className="activity-calories">{activity.calories || 0} kcal</span></article>) : <EmptyState label="No activities logged yet" />}</div>}</section>
}
export default Activities
function PageHeading({ eyebrow, title, copy }) { return <div className="page-heading"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{copy}</p></div> }
function ErrorNotice({ message }) { return <div className="notice error-notice">{message}. Check that the API is running on port 8000.</div> }
function EmptyState({ label }) { return <div className="empty-state">{label}</div> }
function formatDate(date) { return date ? new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Recently' }
