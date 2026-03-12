import React, { useContext, useEffect, useMemo, useState } from 'react'
import { AppContext } from '../context/AppContext.jsx'
import { PageWrapper } from '../components/PageWrapper.jsx'
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase/config.js'
import { motion, AnimatePresence } from 'framer-motion'

export default function ClientDashboard() {

  const { user, navigate } = useContext(AppContext)

  const [requests, setRequests] = useState([])
  const [projects, setProjects] = useState([])
  const [invoices, setInvoices] = useState([])

  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('projects')

  useEffect(() => {

    if (!user?.uid) {
      setLoading(false)
      return
    }

    let unsubReq, unsubProj, unsubInv
    let fallbackTimeout

    try {
      // Fallback: If no snapshot fires within 2 seconds, turn off loading anyway
      fallbackTimeout = setTimeout(() => {
        setLoading(false)
      }, 2000)

      const qReq = query(
        collection(db, 'service_requests'),
        where('userId', '==', user.uid)
      )

      unsubReq = onSnapshot(qReq, (snap) => {
        if (!snap || snap.empty) { setRequests([]); return }
        const list = snap.docs.map(d => ({ id: d.id, ...d.data() }))
        list.sort((a,b)=> (b.createdAt?.seconds||0) - (a.createdAt?.seconds||0))
        setRequests(list)
      }, (err) => {
        console.error("Requests listener error", err)
      })


      const qProj = query(
        collection(db, 'projects'),
        where('clientId', '==', user.uid)
      )

      unsubProj = onSnapshot(qProj, (snap) => {
        if (!snap || snap.empty) { setProjects([]); return }
        const list = snap.docs.map(d => ({ id: d.id, ...d.data() }))
        list.sort((a,b)=> (b.createdAt?.seconds||0) - (a.createdAt?.seconds||0))
        setProjects(list)
      }, (err) => {
        console.error("Projects listener error", err)
      })


      const qInv = query(
        collection(db, 'invoices'),
        where('clientId', '==', user.uid)
      )

      unsubInv = onSnapshot(qInv, (snap) => {
        if (!snap || snap.empty) { 
          setInvoices([])
          setLoading(false)
          clearTimeout(fallbackTimeout)
          return
        }
        const list = snap.docs.map(d => ({ id: d.id, ...d.data() }))
        list.sort((a,b)=> (b.createdAt?.seconds||0) - (a.createdAt?.seconds||0))
        setInvoices(list)
        setLoading(false)
        clearTimeout(fallbackTimeout)
      }, (err) => {
        console.error("Invoices listener error", err)
        setLoading(false)
        clearTimeout(fallbackTimeout)
      })
    } catch (err) {
      console.error("Firestore listener error", err)
      setLoading(false)
    }

    return () => {
      if (fallbackTimeout) clearTimeout(fallbackTimeout)
      if (unsubReq) unsubReq()
      if (unsubProj) unsubProj()
      if (unsubInv) unsubInv()
    }

  }, [user])


  const stats = useMemo(() => {
    return {
      active: projects.filter(p => p.status === 'Active').length,
      pending: requests.filter(r => r.status === 'Pending').length,
      unpaid: invoices.filter(i => i.status === 'Unpaid').length
    }
  }, [requests, projects, invoices])


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
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm transition-colors"
        >
          New Request
        </button>

      </header>


      <section className="grid md:grid-cols-3 gap-4">
        <StatCard title="Active Projects" value={stats.active} />
        <StatCard title="Pending Requests" value={stats.pending} />
        <StatCard title="Unpaid Invoices" value={stats.unpaid} />
      </section>


      <div className="flex gap-4 border-b border-white/10 pb-2">

        <button
          onClick={() => setActiveTab('projects')}
          className={`text-sm tracking-wide font-medium px-4 py-2 rounded-t-lg transition ${
            activeTab === 'projects'
              ? 'bg-white/10 text-white'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          Projects
        </button>

        <button
          onClick={() => setActiveTab('requests')}
          className={`text-sm tracking-wide font-medium px-4 py-2 rounded-t-lg transition ${
            activeTab === 'requests'
              ? 'bg-white/10 text-white'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          Requests
        </button>

        <button
          onClick={() => setActiveTab('invoices')}
          className={`text-sm tracking-wide font-medium px-4 py-2 rounded-t-lg transition ${
            activeTab === 'invoices'
              ? 'bg-white/10 text-white'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          Invoices
        </button>

      </div>


      <div className="glass-card border border-slate-700/70 p-6 min-h-[400px]">

        {loading ? (
          <div className="text-slate-400 text-sm">
            Loading your data...
          </div>
        ) : (

          <AnimatePresence mode="wait">

            {activeTab === 'projects' && (

              <motion.div key="proj" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>

                {projects.length === 0 ? (

                  <p className="text-slate-400 text-sm text-center py-10">
                    No projects yet.
                  </p>

                ) : (

                  <div className="grid md:grid-cols-2 gap-4">

                    {projects.map(p => (

                      <div key={p.id} className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition group">

                        <div className="flex justify-between items-start mb-4">

                          <h3 className="text-lg font-semibold text-white">
                            {p.title}
                          </h3>

                          <span className={`text-xs px-2 py-1 rounded border ${
                            p.status === 'Active'
                              ? 'bg-blue-500/20 text-blue-300 border-blue-500/30'
                              : 'bg-green-500/20 text-green-300 border-green-500/30'
                          }`}>
                            {p.status}
                          </span>

                        </div>


                        <div className="space-y-2 mb-6">

                          <div className="flex justify-between text-xs font-semibold">
                            <span className="text-slate-400 uppercase tracking-wider">
                              Progress
                            </span>

                            <span className="text-blue-400">
                              {p.progress || 0}%
                            </span>
                          </div>

                          <div className="w-full bg-slate-800 rounded-full h-2">

                            <div
                              className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${p.progress || 0}%` }}
                            />

                          </div>

                        </div>


                        <button
                          onClick={() => navigate(`/project/${p.id}`)}
                          className="w-full bg-white/10 hover:bg-white/20 text-white text-sm py-2 rounded font-medium transition"
                        >
                          Open Workspace →
                        </button>

                      </div>

                    ))}

                  </div>

                )}

              </motion.div>

            )}

          </AnimatePresence>

        )}

      </div>

    </PageWrapper>

  )

}


function StatCard({ title, value }) {

  return (

    <div className="glass-card border border-slate-700/70 p-4 relative overflow-hidden group">

      <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition duration-500" />

      <p className="text-[11px] uppercase tracking-widest text-slate-400 mb-1 relative z-10">
        {title}
      </p>

      <p className="text-2xl font-semibold text-white relative z-10">
        {value}
      </p>

    </div>

  )

}