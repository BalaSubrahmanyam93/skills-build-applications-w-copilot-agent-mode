import { useEffect, useState } from 'react'
import { apiBaseUrl, fetchEndpoint } from '../api.js'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchEndpoint(`${apiBaseUrl}/api/workouts/`).then(setWorkouts).catch((requestError) => setError(requestError.message)) }, [])
  return <section className="data-view"><PageHeading eyebrow="PERSONALIZED PROGRAMMING" title="Workouts" copy="A focused plan for wherever your energy is today." />{error ? <ErrorNotice message={error} /> : <div className="workout-grid">{workouts.length ? workouts.map((workout) => <article className="workout-card" key={workout._id || workout.id || workout.name}><div className="workout-meta"><span>{workout.focus || 'Full body'}</span><span>{workout.durationMinutes || 0} min</span></div><h2>{workout.name || 'Untitled workout'}</h2><p>{workout.exercises?.slice(0, 3).join(' - ') || 'A balanced session for your next effort.'}</p><div className="workout-bottom"><span className={`difficulty ${workout.difficulty || 'beginner'}`}>{workout.difficulty || 'beginner'}</span><button type="button" aria-label={`Start ${workout.name || 'workout'}`}>Start -&gt;</button></div></article>) : <EmptyState label="No workouts available" />}</div>}</section>
}
export default Workouts
function PageHeading({ eyebrow, title, copy }) { return <div className="page-heading"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{copy}</p></div> }
function ErrorNotice({ message }) { return <div className="notice error-notice">{message}. Check that the API is running on port 8000.</div> }
function EmptyState({ label }) { return <div className="empty-state">{label}</div> }
