import React, { useContext, useEffect, useMemo, useState } from 'react'
import { AppContext } from '../context/AppContext.jsx'
import { PageWrapper } from '../components/PageWrapper.jsx'
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore'
import { db, auth } from '../firebase/config.js'

export default function ClientDashboard() {
  const { t, user, navigate } = useContext(AppContext)

  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const currentUser = auth.currentUser
    if (!currentUser) return

    const q = query(
      collection(db, 'service_requests'),
      where('userId', '==', currentUser.uid),
      orderBy('createdAt', 'desc')
    )

    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }))
      setRequests(data)
      setLoading(false)
    })

    return () => unsub()
  }, [])

  const stats = useMemo(() => {
    const active = requests.filter((r) => r.status === 'In Progress').length
    const pending = requests.filter((r) => r.status === 'Pending').length
    const completed = requests.filter((r) => r.status === 'Completed').length

    return {
      active,
      pending,
      completed
    }
  }, [requests])

  const statusColor = (s) => {
    if (s === 'Completed') return 'bg-green-500/20 text-green-300 border-green-500/30'
    if (s === 'In Progress') return 'bg-blue-500/20 text-blue-300 border-blue-500/30'
    return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
  }

  return (
    <PageWrapper className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-slate-500 mb-1">
            Client Dashboard
          </p>

          <h1 className="text-2xl md:text-3xl font-semibold text-white flex items-center gap-3">
            Welcome {user?.email}

            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
              Online
            </span>
          </h1>
        </div>

        <button
          onClick={() => navigate('/request')}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm"
        >
          New Request
        </button>
      </header>

      <section className="grid md:grid-cols-3 gap-4">

        <StatCard title="Active Projects" value={stats.active} />

        <StatCard title="Pending Requests" value={stats.pending} />

        <StatCard title="Completed Projects" value={stats.completed} />

      </section>

      <div className="glass-card border border-slate-700/70 p-6 overflow-x-auto">

        {loading ? (
          <div className="text-slate-400 text-sm">Loading your requests...</div>
        ) : requests.length === 0 ? (
          <div className="text-slate-400 text-sm text-center py-10">
            You have not submitted any requests yet.
          </div>
        ) : (
          <table className="w-full text-sm">

            <thead className="text-xs uppercase text-slate-500 border-b border-white/10">
              <tr>
                <th className="py-3 px-2 text-left">Service</th>
                <th className="py-3 px-2 text-left">Budget</th>
                <th className="py-3 px-2 text-left">Status</th>
                <th className="py-3 px-2 text-left">Created</th>
              </tr>
            </thead>

            <tbody>

              {requests.map((r) => (

                <tr key={r.id} className="border-b border-white/5">

                  <td className="py-3 px-2 text-slate-200">
                    {r.serviceType}
                  </td>

                  <td className="py-3 px-2 text-slate-300">
                    {r.budget || '-'}
                  </td>

                  <td className="py-3 px-2">

                    <span className={`px-2 py-1 text-xs rounded border ${statusColor(r.status)}`}>
                      {r.status}
                    </span>

                  </td>

                  <td className="py-3 px-2 text-xs text-slate-400">
                    {r.createdAt?.toDate
                      ? r.createdAt.toDate().toLocaleString()
                      : '-'}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>
        )}

      </div>

    </PageWrapper>
  )
}

function StatCard({ title, value }) {
  return (
    <div className="glass-card border border-slate-700/70 p-4">
      <p className="text-[11px] uppercase tracking-widest text-slate-400 mb-1">
        {title}
      </p>
      <p className="text-2xl font-semibold text-white">{value}</p>
    </div>
  )
}