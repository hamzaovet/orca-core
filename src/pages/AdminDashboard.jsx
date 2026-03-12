import React, { useState, useEffect, useContext } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
  addDoc,
} from 'firebase/firestore'
import { db } from '../firebase/config.js'
import { AppContext } from '../context/AppContext.jsx'
import { PageWrapper } from '../components/PageWrapper.jsx'
import { Mail, Layers, Trash2 } from '../components/icons.jsx'

export default function AdminDashboard() {
  const { t, user } = useContext(AppContext)
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('requests')

  useEffect(() => {
    if (!user) return
    const q = query(
      collection(db, 'service_requests')
    )
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        if (!snapshot || snapshot.empty) { setRequests([]); setLoading(false); return }
        const list = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }))
        list.sort((a,b)=> (b.createdAt?.seconds||0) - (a.createdAt?.seconds||0))
        setRequests(list)
        setLoading(false)
      },
      (err) => {
        console.error(err)
        setLoading(false)
      },
    )
    return () => unsubscribe()
  }, [user])

  const deleteRequest = async (id) => {
    if (!user) return
    await deleteDoc(doc(db, 'service_requests', id))
  }

  return (
    <PageWrapper className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-8">
      <div className="w-full md:w-64 glass-card border-white/5 p-4 h-fit sticky top-28 bg-[#020617]/50">
        <div className="flex items-center gap-4 px-2 mb-8 mt-2">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center font-bold text-white shadow-lg">
            A
          </div>
          <div>
            <h2 className="text-white font-bold leading-none">Admin OS</h2>
            <span className="text-[10px] uppercase tracking-widest text-cyan-400">
              Superuser
            </span>
          </div>
        </div>
        <nav className="space-y-1">
          <button
            type="button"
            onClick={() => setActiveTab('requests')}
            className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors text-sm font-medium ${
              activeTab === 'requests'
                ? 'bg-white/10 text-white border border-white/5'
                : 'text-slate-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <Mail className="w-4 h-4" />{' '}
            <span>{t.dashboard.admin.requests}</span>
          </button>
          
          <button
            type="button"
            onClick={() => setActiveTab('projects')}
            className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors text-sm font-medium ${
              activeTab === 'projects'
                ? 'bg-white/10 text-white border border-white/5'
                : 'text-slate-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <span>Projects</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('invoices')}
            className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors text-sm font-medium ${
              activeTab === 'invoices'
                ? 'bg-white/10 text-white border border-white/5'
                : 'text-slate-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <span>Invoices</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('portfolio')}
            className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors text-sm font-medium ${
              activeTab === 'portfolio'
                ? 'bg-white/10 text-white border border-white/5'
                : 'text-slate-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4" />{' '}
            <span>{t.dashboard.admin.portfolio}</span>
          </button>
        </nav>
      </div>

      <div className="flex-1 glass-card border-white/5 p-6 md:p-8 bg-[#020617]/50 min-h-[600px]">
        <AnimatePresence mode="wait">
          {activeTab === 'requests' && (
            <motion.div
              key="req"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="flex justify-between items-center mb-8 pb-6 border-b border-white/5">
                <h2 className="text-2xl font-bold text-white tracking-tight">
                  {t.dashboard.admin.requests}
                </h2>
                <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                  {requests.length} Total
                </span>
              </div>

              {loading ? (
                <div className="text-slate-500 animate-pulse text-sm font-medium uppercase tracking-widest">
                  {t.common.loading}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm whitespace-nowrap">
                    <thead className="text-xs uppercase tracking-wider text-slate-500 border-b border-white/5">
                      <tr>
                        <th className="pb-4 font-semibold px-2">
                          Client Details
                        </th>
                        <th className="pb-4 font-semibold px-2">Service</th>
                        <th className="pb-4 font-semibold px-2">Date</th>
                        <th className="pb-4 font-semibold px-2">Status</th>
                        <th className="pb-4 font-semibold px-2 text-right">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {requests.length === 0 && (
                        <tr>
                          <td
                            colSpan="4"
                            className="py-12 text-center text-slate-500"
                          >
                            No requests found.
                          </td>
                        </tr>
                      )}
                      {requests.map((req) => (
                        <tr
                          key={req.id}
                          className="hover:bg-white/[0.02] transition-colors group"
                        >
                          <td className="py-4 px-2">
                            <p className="font-medium text-white">{req.name}</p>
                            <p className="text-xs text-slate-500 mt-0.5">
                              {req.email}{' '}
                              {req.company ? `• ${req.company}` : ''}
                            </p>
                          </td>
                          <td className="py-4 px-2">
                            <span className="bg-white/5 border border-white/10 px-2.5 py-1 rounded text-[11px] uppercase tracking-wider text-slate-300">
                              {req.service}
                            </span>
                          </td>
                          <td className="py-4 px-2 text-slate-400 text-xs">
                            {req.createdAt
                              ? new Date(req.createdAt).toLocaleDateString()
                              : '-'}
                          </td>
                          <td className="py-4 px-2">
                            <select
                              value={req.status}
                              onChange={async (e) => {
                                const newStatus = e.target.value
                                
                                try {
                                  // Update the request status
                                  await updateDoc(doc(db, 'service_requests', req.id), { status: newStatus })
                                  
                                  // If approved, create a project automatically
                                  if (newStatus === 'Approved' && req.status !== 'Approved') {
                                    await addDoc(collection(db, 'projects'), {
                                      title: `${req.service} for ${req.company || req.name}`,
                                      clientId: req.userId,
                                      serviceType: req.service,
                                      status: 'Active',
                                      progress: 0,
                                      requestId: req.id,
                                      createdAt: new Date()
                                    })
                                  }
                                } catch (error) {
                                  console.error("Error updating status or creating project: ", error)
                                }
                              }}
                              className="bg-[#020617] text-xs border border-white/10 rounded px-2 py-1 text-slate-300 focus:outline-none"
                            >
                              <option value="Pending">Pending</option>
                              <option value="Approved">Approved / Create Project</option>
                              <option value="In Progress">In Progress</option>
                              <option value="Completed">Completed</option>
                              <option value="Rejected">Rejected</option>
                            </select>
                          </td>
                          <td className="py-4 px-2 text-right">
                            <button
                              type="button"
                              onClick={() => deleteRequest(req.id)}
                              className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded transition-colors opacity-0 group-hover:opacity-100"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'projects' && (
            <motion.div
              key="proj"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="flex justify-between items-center mb-8 pb-6 border-b border-white/5">
                <h2 className="text-2xl font-bold text-white tracking-tight">
                  Projects Management
                </h2>
              </div>
              <AdminProjectsTab />
            </motion.div>
          )}

          {activeTab === 'invoices' && (
            <motion.div
              key="inv"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="flex justify-between items-center mb-8 pb-6 border-b border-white/5">
                <h2 className="text-2xl font-bold text-white tracking-tight">
                  Invoices Management
                </h2>
              </div>
              <AdminInvoicesTab />
            </motion.div>
          )}

          {activeTab === 'portfolio' && (
            <motion.div
              key="port"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="flex justify-between items-center mb-8 pb-6 border-b border-white/5">
                <h2 className="text-2xl font-bold text-white tracking-tight">
                  {t.dashboard.admin.portfolio} Management
                </h2>
              </div>
              
              <PortfolioAdminTab />

            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageWrapper>
  )
}

function PortfolioAdminTab() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  
  const [formData, setFormData] = useState({
    title: '', description: '', url: '', category: 'Website'
  })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const q = query(collection(db, 'portfolio_projects'))
    const unsub = onSnapshot(q, (snapshot) => {
      if (!snapshot || snapshot.empty) { setProjects([]); setLoading(false); return }
      const list = snapshot.docs.map(d => ({ id: d.id, ...d.data() }))
      list.sort((a,b)=> (b.createdAt?.seconds||0) - (a.createdAt?.seconds||0))
      setProjects(list)
      setLoading(false)
    })
    return () => unsub()
  }, [])

  const handleAdd = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await addDoc(collection(db, 'portfolio_projects'), {
        ...formData,
        createdAt: new Date()
      })
      setFormData({ title: '', description: '', url: '', category: 'Website' })
    } catch (err) {
      console.error(err)
    }
    setSubmitting(false)
  }

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this project?")) {
      await deleteDoc(doc(db, 'portfolio_projects', id))
    }
  }

  return (
    <div className="space-y-10">
      
      {/* Add Project Form */}
      <div className="bg-white/5 p-6 rounded-lg border border-white/10">
        <h3 className="text-lg font-semibold text-white mb-4">Add New Project</h3>
        <form onSubmit={handleAdd} className="grid md:grid-cols-2 gap-4">
          <input 
            type="text" placeholder="Project Title" required
            value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})}
            className="bg-[#020617] border border-white/10 p-3 rounded"
          />
          <input 
            type="url" placeholder="Project URL" required
            value={formData.url} onChange={e => setFormData({...formData, url: e.target.value})}
            className="bg-[#020617] border border-white/10 p-3 rounded"
          />
          <input 
            type="text" placeholder="Category" required
            value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}
            className="bg-[#020617] border border-white/10 p-3 rounded"
          />
          <input 
            type="text" placeholder="Short Description"
            value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}
            className="bg-[#020617] border border-white/10 p-3 rounded"
          />
          <button 
            type="submit" disabled={submitting}
            className="md:col-span-2 bg-blue-600 hover:bg-blue-700 py-3 rounded font-semibold transition"
          >
            {submitting ? "Adding..." : "Add Project"}
          </button>
        </form>
      </div>

      {/* Projects List */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Existing Projects</h3>
        {loading ? (
          <div className="text-slate-400">Loading...</div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {projects.map(p => (
              <div key={p.id} className="bg-white/5 p-4 rounded-lg border border-white/10 flex justify-between items-start">
                <div>
                  <h4 className="text-white font-medium">{p.title}</h4>
                  <p className="text-xs text-slate-400 mt-1">{p.url}</p>
                  <span className="text-[10px] uppercase tracking-wider text-blue-400 mt-2 block">{p.category}</span>
                </div>
                <button 
                  onClick={() => handleDelete(p.id)}
                  className="text-red-400 hover:text-red-300 p-2"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            {projects.length === 0 && <p className="text-slate-400">No projects found.</p>}
          </div>
        )}
      </div>

    </div>
  )
}

function AdminProjectsTab() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const q = query(collection(db, 'projects'))
    const unsub = onSnapshot(q, (snapshot) => {
      if (!snapshot || snapshot.empty) { setProjects([]); setLoading(false); return }
      const list = snapshot.docs.map(d => ({ id: d.id, ...d.data() }))
      list.sort((a,b)=> (b.createdAt?.seconds||0) - (a.createdAt?.seconds||0))
      setProjects(list)
      setLoading(false)
    })
    return () => unsub()
  }, [])

  return (
    <div className="overflow-x-auto">
      {loading ? <div className="text-slate-500">Loading projects...</div> : projects.length === 0 ? <div className="text-slate-500 py-10">No projects found.</div> : (
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="text-xs uppercase tracking-wider text-slate-500 border-b border-white/5">
            <tr>
              <th className="pb-4 font-semibold px-2">Project</th>
              <th className="pb-4 font-semibold px-2">Progress</th>
              <th className="pb-4 font-semibold px-2">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {projects.map(proj => (
              <tr key={proj.id} className="hover:bg-white/[0.02] transition-colors">
                <td className="py-4 px-2">
                  <p className="font-medium text-white">{proj.title}</p>
                  <p className="text-xs text-slate-500 mt-0.5">Client ID: {proj.clientId}</p>
                </td>
                <td className="py-4 px-2">
                  <div className="flex items-center gap-2">
                    <input 
                      type="range" min="0" max="100" value={proj.progress || 0}
                      onChange={async (e) => {
                        await updateDoc(doc(db, 'projects', proj.id), { progress: parseInt(e.target.value) })
                      }}
                      className="w-24 accent-blue-500"
                    />
                    <span className="text-slate-300 text-xs">{proj.progress || 0}%</span>
                  </div>
                </td>
                <td className="py-4 px-2">
                  <select
                    value={proj.status}
                    onChange={async (e) => {
                      await updateDoc(doc(db, 'projects', proj.id), { status: e.target.value })
                    }}
                    className="bg-[#020617] text-xs border border-white/10 rounded px-2 py-1 text-slate-300 focus:outline-none"
                  >
                    <option value="Active">Active</option>
                    <option value="On Hold">On Hold</option>
                    <option value="Completed">Completed</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

function AdminInvoicesTab() {
  const [invoices, setInvoices] = useState([])
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({ projectId: '', clientId: '', amount: '' })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const q = query(collection(db, 'invoices'))
    const unsub = onSnapshot(q, (snapshot) => {
      if (!snapshot || snapshot.empty) { setInvoices([]); setLoading(false); return }
      const list = snapshot.docs.map(d => ({ id: d.id, ...d.data() }))
      list.sort((a,b)=> (b.createdAt?.seconds||0) - (a.createdAt?.seconds||0))
      setInvoices(list)
      setLoading(false)
    })
    return () => unsub()
  }, [])

  const handleCreate = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await addDoc(collection(db, 'invoices'), {
        ...formData,
        amount: parseFloat(formData.amount),
        status: 'Unpaid',
        createdAt: new Date()
      })
      setFormData({ projectId: '', clientId: '', amount: '' })
    } catch (err) {
      console.error(err)
    }
    setSubmitting(false)
  }

  const deleteInvoice = async (id) => {
    if (confirm("Delete invoice?")) await deleteDoc(doc(db, 'invoices', id))
  }

  return (
    <div className="space-y-10">
      <div className="bg-white/5 p-6 rounded-lg border border-white/10">
        <h3 className="text-lg font-semibold text-white mb-4">Create Invoice</h3>
        <form onSubmit={handleCreate} className="grid md:grid-cols-3 gap-4">
          <input type="text" placeholder="Project ID" required value={formData.projectId} onChange={e => setFormData({...formData, projectId: e.target.value})} className="bg-[#020617] border border-white/10 p-3 rounded" />
          <input type="text" placeholder="Client ID" required value={formData.clientId} onChange={e => setFormData({...formData, clientId: e.target.value})} className="bg-[#020617] border border-white/10 p-3 rounded" />
          <input type="number" placeholder="Amount ($)" required value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} className="bg-[#020617] border border-white/10 p-3 rounded" />
          <button type="submit" disabled={submitting} className="md:col-span-3 bg-blue-600 hover:bg-blue-700 py-3 rounded font-semibold transition">
            {submitting ? "Creating..." : "Create Invoice"}
          </button>
        </form>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Invoices List</h3>
        {loading ? <div className="text-slate-500">Loading...</div> : (
          <div className="grid md:grid-cols-2 gap-4">
            {invoices.map(inv => (
              <div key={inv.id} className="bg-white/5 p-4 rounded-lg border border-white/10 flex justify-between items-start">
                <div>
                  <h4 className="text-white font-medium">${inv.amount} <span className={`text-xs ml-2 px-2 py-0.5 rounded ${inv.status === 'Paid' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>{inv.status}</span></h4>
                  <p className="text-xs text-slate-400 mt-1">Project: {inv.projectId}</p>
                  <p className="text-xs text-slate-400 mt-1">Client: {inv.clientId}</p>
                </div>
                <button onClick={() => deleteInvoice(inv.id)} className="text-red-400 hover:text-red-300 p-2"><Trash2 className="w-4 h-4" /></button>
              </div>
            ))}
            {invoices.length === 0 && <p className="text-slate-400">No invoices generated yet.</p>}
          </div>
        )}
      </div>
    </div>
  )
}
