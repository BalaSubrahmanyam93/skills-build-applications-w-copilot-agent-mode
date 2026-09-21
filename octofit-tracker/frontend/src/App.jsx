import { NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

const navigation = [
  { to: '/', label: 'Overview', icon: 'O', end: true },
  { to: '/activities', label: 'Activities', icon: 'A' },
  { to: '/teams', label: 'Teams', icon: 'T' },
  { to: '/leaderboard', label: 'Leaderboard', icon: 'L' },
  { to: '/workouts', label: 'Workouts', icon: 'W' },
  { to: '/users', label: 'Members', icon: 'M' },
]

function Overview() {
  return (
    <section className="overview-view">
      <div className="overview-hero">
        <div>
          <p className="eyebrow">OCTOFIT / COMMAND CENTER</p>
          <h1>Move with<br /><em>momentum.</em></h1>
          <p className="hero-copy">A clear view of your team&apos;s rhythm, progress, and next best effort.</p>
        </div>
        <div className="hero-mark" aria-hidden="true"><span>08</span><small>WEEK<br />SPRINT</small></div>
      </div>
      <div className="overview-grid">
        <NavLink className="overview-card card-teal" to="/activities"><span className="card-kicker">THIS WEEK</span><strong>132<span>min</span></strong><span className="card-note">Activity logged <b>+ 18%</b></span></NavLink>
        <NavLink className="overview-card card-coral" to="/leaderboard"><span className="card-kicker">TEAM RANK</span><strong>#<span>04</span></strong><span className="card-note">Trailblazers <b>of 12 teams</b></span></NavLink>
        <NavLink className="overview-card card-ink" to="/workouts"><span className="card-kicker">NEXT UP</span><strong>20<span>min</span></strong><span className="card-note">Foundation Flow <b>-&gt;</b></span></NavLink>
      </div>
      <div className="overview-footer"><div><span className="live-dot" /> System healthy</div><span>Keep showing up. The compound effect is real.</span></div>
    </section>
  )
}

function App() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <NavLink className="brand" to="/" aria-label="OctoFit home"><span className="brand-symbol">O</span><span>OCTOFIT<small>TRACKER</small></span></NavLink>
        <div className="sidebar-label">Workspace</div>
        <nav className="main-nav" aria-label="Primary navigation">
          {navigation.map((item) => <NavLink key={item.to} to={item.to} end={item.end} className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}><span className="nav-icon" aria-hidden="true">{item.icon}</span>{item.label}</NavLink>)}
        </nav>
        <div className="sidebar-bottom"><div className="profile-chip"><span className="avatar">MC</span><span><b>Maya Chen</b><small>Member</small></span><span className="chevron">v</span></div><p>OCTOFIT TRACKER<br /><span>v1.0.0 - September 2026</span></p></div>
      </aside>
      <main className="main-content">
        <header className="topbar"><div className="mobile-brand"><span className="brand-symbol">O</span> OCTOFIT</div><div className="topbar-status"><span className="live-dot" /> Live workspace <span className="divider">/</span> September 21, 2026</div><button className="notification-button" type="button" aria-label="Notifications">!<span /></button></header>
        <div className="page-content"><Routes><Route path="/" element={<Overview />} /><Route path="/activities" element={<Activities />} /><Route path="/teams" element={<Teams />} /><Route path="/leaderboard" element={<Leaderboard />} /><Route path="/workouts" element={<Workouts />} /><Route path="/users" element={<Users />} /></Routes></div>
      </main>
    </div>
  )
}

export default App
