import { useEffect, useState } from 'react'
import { apiBaseUrl, fetchEndpoint } from '../api.js'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const usersEndpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/users/`
  : `${apiBaseUrl}/api/users/`

function Users() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchEndpoint(usersEndpoint).then(setUsers).catch((requestError) => setError(requestError.message)) }, [])
  return <section className="data-view"><PageHeading eyebrow="YOUR COMMUNITY" title="Members" copy="The people making progress count, one session at a time." />{error ? <ErrorNotice message={error} /> : <div className="member-table"><div className="table-head"><span>Member</span><span>Role</span><span>Username</span><span>Status</span></div>{users.length ? users.map((user) => <div className="member-row" key={user._id || user.id || user.username}><span className="member-name"><span className="avatar">{initials(user.displayName || user.username || 'Member')}</span><b>{user.displayName || user.username || 'OctoFit member'}</b></span><span>{user.role || 'member'}</span><span className="muted">@{user.username || 'member'}</span><span className="status"><i /> Active</span></div>) : <EmptyState label="No members found" />}</div>}</section>
}
export default Users
function PageHeading({ eyebrow, title, copy }) { return <div className="page-heading"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{copy}</p></div> }
function ErrorNotice({ message }) { return <div className="notice error-notice">{message}. Check that the API is running on port 8000.</div> }
function EmptyState({ label }) { return <div className="empty-state">{label}</div> }
function initials(name) { return name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase() }
