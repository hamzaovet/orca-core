import React, { useEffect, useMemo, useState } from 'react'
import {
  collection,
  query,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore'
import { db } from '../../firebase/config.js'
import { PageWrapper } from '../../components/PageWrapper.jsx'

import { Globe, ExternalLink, Users, CreditCard } from 'lucide-react'

const STATUS = ['All','Pending','In Progress','Completed']

export default function AdminDashboardPage() {

  const [tab, setTab] = useState('requests')
  const [requests,setRequests] = useState([])
  const [aiWebsites, setAiWebsites] = useState([])
  const [usersInfo, setUsersInfo] = useState([])
  const [subscriptions, setSubscriptions] = useState([])
  const [loading,setLoading] = useState(true)

  const [search,setSearch] = useState('')
  const [statusFilter,setStatusFilter] = useState('All')

  const [selected,setSelected] = useState(null)
  const [edit,setEdit] = useState(null)

  useEffect(()=>{

    const q = query(
      collection(db,'service_requests')
    )

    const unsub = onSnapshot(q,(snap)=>{
      if(!snap || snap.empty) { setRequests([]); return }

      const data = snap.docs.map(d=>({
        id:d.id,
        ...d.data()
      }))

      data.sort((a,b)=> (b.createdAt?.seconds||0) - (a.createdAt?.seconds||0))

      setRequests(data)
    })

    const qWeb = query(
      collection(db, 'ai_websites')
    )

    const unsubWeb = onSnapshot(qWeb, (snap) => {
      if(!snap || snap.empty) { setAiWebsites([]); setLoading(false); return }
      const data = snap.docs.map(d => ({ id: d.id, ...d.data() }))
      data.sort((a,b)=> (b.createdAt?.seconds||0) - (a.createdAt?.seconds||0))
      setAiWebsites(data)
      setLoading(false)
    })

    const unsubUsers = onSnapshot(query(collection(db, 'users')), (snap) => {
      if(!snap || snap.empty) { setUsersInfo([]); return }
      setUsersInfo(snap.docs.map(d => ({ id: d.id, ...d.data() })))
    })

    const unsubSubs = onSnapshot(query(collection(db, 'subscriptions')), (snap) => {
      if(!snap || snap.empty) { setSubscriptions([]); return }
      setSubscriptions(snap.docs.map(d => ({ id: d.id, ...d.data() })))
    })

    return () => {
       unsub()
       unsubWeb()
       unsubUsers()
       unsubSubs()
    }

  },[])

  const normalize = r => ({
    id:r.id,
    name:r.name || '',
    email:r.email || '',
    service:r.serviceType || r.service || '',
    message:r.description || r.message || '',
    budget:r.budget || '',
    status:r.status || 'Pending',
    createdAt:r.createdAt?.toDate ? r.createdAt.toDate() : null,
    raw:r
  })

  const normalized = useMemo(()=>requests.map(normalize),[requests])

  const filtered = useMemo(()=>{

    let data = normalized

    if(statusFilter !== 'All'){
      data = data.filter(r=>r.status === statusFilter)
    }

    if(search.trim()){
      const s = search.toLowerCase()
      data = data.filter(r =>
        r.name.toLowerCase().includes(s) ||
        r.email.toLowerCase().includes(s)
      )
    }

    return data

  },[normalized,search,statusFilter])

  const stats = useMemo(()=>{

    return {
      total:normalized.length,
      pending:normalized.filter(r=>r.status==='Pending').length,
      progress:normalized.filter(r=>r.status==='In Progress').length,
      done:normalized.filter(r=>r.status==='Completed').length
    }

  },[normalized])

  const updateStatus = async(id,status)=>{
    await updateDoc(doc(db,'service_requests',id),{status})
  }

  const saveEdit = async()=>{

    const ref = doc(db,'service_requests',edit.id)

    await updateDoc(ref,{
      name:edit.name,
      email:edit.email,
      serviceType:edit.service,
      description:edit.message,
      budget:edit.budget
    })

    setEdit(null)
  }

  const remove = async(id)=>{

    if(!confirm('Delete this request?')) return

    await deleteDoc(doc(db,'service_requests',id))
  }

  const statusColor = s =>{
    if(s==='Completed') return 'bg-green-500/20 text-green-300 border-green-500/30'
    if(s==='In Progress') return 'bg-blue-500/20 text-blue-300 border-blue-500/30'
    return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
  }

  return(

    <PageWrapper className="max-w-7xl mx-auto px-4 py-10 space-y-8">

      <div className="flex flex-col lg:flex-row justify-between gap-4">

        <div className="flex flex-wrap gap-4 mb-4 border-b border-slate-800 pb-4">
           <button onClick={() => setTab('requests')} className={`text-xl font-semibold px-4 py-2 ${tab === 'requests' ? 'text-white border-b-2 border-blue-500' : 'text-slate-500 hover:text-slate-300'}`}>
             Service Requests
           </button>
           <button onClick={() => setTab('websites')} className={`text-xl font-semibold px-4 py-2 flex items-center gap-2 ${tab === 'websites' ? 'text-white border-b-2 border-purple-500' : 'text-slate-500 hover:text-slate-300'}`}>
             <Globe className="w-5 h-5"/> AI Websites
           </button>
           <button onClick={() => setTab('users')} className={`text-xl font-semibold px-4 py-2 flex items-center gap-2 ${tab === 'users' ? 'text-white border-b-2 border-green-500' : 'text-slate-500 hover:text-slate-300'}`}>
             <Users className="w-5 h-5"/> Users
           </button>
           <button onClick={() => setTab('subscriptions')} className={`text-xl font-semibold px-4 py-2 flex items-center gap-2 ${tab === 'subscriptions' ? 'text-white border-b-2 border-yellow-500' : 'text-slate-500 hover:text-slate-300'}`}>
             <CreditCard className="w-5 h-5"/> Subscriptions
           </button>
        </div>

        {tab === 'requests' && (
        <div className="flex flex-wrap gap-2">

          {STATUS.map(s=>(
            <button
              key={s}
              onClick={()=>setStatusFilter(s)}
              className={`px-3 py-1 rounded-full text-xs border ${
                statusFilter===s
                  ? 'bg-blue-600 text-white border-blue-500'
                  : 'border-slate-700 text-slate-300'
              }`}
            >
              {s}
            </button>
          ))}

        </div>
        )}

      </div>

      {tab === 'requests' ? (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

            <Stat title="Total" value={stats.total}/>
            <Stat title="Pending" value={stats.pending}/>
            <Stat title="In Progress" value={stats.progress}/>
            <Stat title="Completed" value={stats.done}/>

          </div>

          <input
            placeholder="Search by name or email..."
            value={search}
            onChange={e=>setSearch(e.target.value)}
            className="bg-slate-900 border border-slate-700 text-sm rounded-lg px-3 py-2 w-full max-w-sm text-slate-200"
          />

          <div className="glass-card border border-slate-700 p-6 overflow-x-auto">

            {loading ? (
              <div className="text-slate-400">Loading...</div>
            ):(
              <table className="w-full text-sm">

                <thead className="text-xs uppercase text-slate-500 border-b border-white/10">
                  <tr>
                    <th className="py-3 px-2 text-left">Name</th>
                    <th className="py-3 px-2 text-left">Email</th>
                    <th className="py-3 px-2 text-left">Service</th>
                    <th className="py-3 px-2 text-left">Status</th>
                    <th className="py-3 px-2 text-left">Created</th>
                    <th className="py-3 px-2 text-left">Action</th>
                  </tr>
                </thead>

                <tbody>

                  {filtered.map(r=>(

                    <tr key={r.id} className="border-b border-white/5">

                      <td className="py-3 px-2 text-slate-100">
                        {r.name}
                      </td>

                      <td className="py-3 px-2 text-slate-300">
                        {r.email}
                      </td>

                      <td className="py-3 px-2 text-slate-300">
                        {r.service}
                      </td>

                      <td className="py-3 px-2">

                        <span className={`px-2 py-1 text-xs rounded border ${statusColor(r.status)}`}>
                          {r.status}
                        </span>

                      </td>

                      <td className="py-3 px-2 text-xs text-slate-400">
                        {r.createdAt?.toLocaleString() || '-'}
                      </td>

                      <td className="py-3 px-2 flex gap-2">

                        <button onClick={()=>setSelected(r)} className="text-xs bg-slate-700 px-2 py-1 rounded">
                          View
                        </button>

                        <button onClick={()=>setEdit(r)} className="text-xs bg-blue-600 px-2 py-1 rounded">
                          Edit
                        </button>

                        <button onClick={()=>remove(r.id)} className="text-xs bg-red-600 px-2 py-1 rounded">
                          Delete
                        </button>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>
            )}

          </div>
        </>
      ) : tab === 'websites' ? (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Stat title="Total AI Sites" value={aiWebsites.length} />
            <Stat title="Active Deployments" value={aiWebsites.filter(w => w.deploymentStatus === 'live').length} />
          </div>

          <div className="glass-card border border-slate-700 p-6 overflow-x-auto">
            {loading ? (
              <div className="text-slate-400">Loading...</div>
            ) : aiWebsites.length === 0 ? (
              <div className="text-slate-400 text-center py-6">No generic websites have been launched yet.</div>
            ) : (
              <table className="w-full text-sm">
                <thead className="text-xs uppercase text-slate-500 border-b border-white/10">
                  <tr>
                    <th className="py-3 px-2 text-left">Business Name</th>
                    <th className="py-3 px-2 text-left">Type</th>
                    <th className="py-3 px-2 text-left">Industry</th>
                    <th className="py-3 px-2 text-left">Deployment</th>
                    <th className="py-3 px-2 text-left">Created</th>
                    <th className="py-3 px-2 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {aiWebsites.map(w => (
                    <tr key={w.id} className="border-b border-white/5">
                      <td className="py-3 px-2 text-slate-100 font-semibold">{w.name || w.businessName || w.title || 'Untitled'}</td>
                      <td className="py-3 px-2"><span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 uppercase">{w.websiteType || 'Business'}</span></td>
                      <td className="py-3 px-2 text-slate-300">{w.industry}</td>
                      <td className="py-3 px-2">
                        {w.deploymentUrl ? (
                          <a href={w.deploymentUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300">
                             Live Link <ExternalLink className="w-3 h-3"/>
                          </a>
                        ) : (
                          <span className="text-slate-500 text-xs text-italic">Pending</span>
                        )}
                      </td>
                      <td className="py-3 px-2 text-xs text-slate-400">{w.createdAt?.toDate ? w.createdAt.toDate().toLocaleDateString() : '-'}</td>
                      <td className="py-3 px-2 flex gap-2">
                        <button onClick={async () => { if(confirm('Delete AI Website architecture?')) await deleteDoc(doc(db,'ai_websites', w.id)) }} className="text-xs bg-red-600/20 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white px-2 py-1 rounded transition">
                          Nuke
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      ) : tab === 'users' ? (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Stat title="Total Registered Users" value={usersInfo.length} />
          </div>
          <div className="glass-card border border-slate-700 p-6 overflow-x-auto">
             <table className="w-full text-sm">
                <thead className="text-xs uppercase text-slate-500 border-b border-white/10">
                  <tr>
                    <th className="py-3 px-2 text-left">UID Key</th>
                    <th className="py-3 px-2 text-left">Email Address</th>
                    <th className="py-3 px-2 text-left">Role</th>
                  </tr>
                </thead>
                <tbody>
                  {usersInfo.map(u => (
                    <tr key={u.id} className="border-b border-white/5">
                      <td className="py-3 px-2 text-xs text-slate-400 font-mono">{u.id}</td>
                      <td className="py-3 px-2 text-slate-100">{u.email}</td>
                      <td className="py-3 px-2"><span className={`text-[10px] px-2 py-0.5 rounded-full border uppercase ${u.role === 'admin' ? 'bg-purple-500/20 text-purple-400 border-purple-500/30' : 'bg-slate-500/20 text-slate-400 border-slate-500/30'}`}>{u.role || 'client'}</span></td>
                    </tr>
                  ))}
                </tbody>
             </table>
          </div>
        </>
      ) : (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Stat title="Total Subscriptions" value={subscriptions.length} />
            <Stat title="Agency Tiers" value={subscriptions.filter(s => s.plan === 'Agency').length} />
          </div>
          <div className="glass-card border border-slate-700 p-6 overflow-x-auto">
             <table className="w-full text-sm">
                <thead className="text-xs uppercase text-slate-500 border-b border-white/10">
                  <tr>
                    <th className="py-3 px-2 text-left">User ID</th>
                    <th className="py-3 px-2 text-left">Active Plan</th>
                    <th className="py-3 px-2 text-left">Generations Run</th>
                  </tr>
                </thead>
                <tbody>
                  {subscriptions.map(s => (
                    <tr key={s.id} className="border-b border-white/5">
                      <td className="py-3 px-2 text-xs text-slate-400 font-mono">{s.id}</td>
                      <td className="py-3 px-2 text-slate-100 font-semibold">{s.plan}</td>
                      <td className="py-3 px-2 text-slate-300">{s.generationsCount || 0}</td>
                    </tr>
                  ))}
                </tbody>
             </table>
          </div>
        </>
      )}

      {selected && (
        <Modal
          title="Request Details"
          onClose={()=>setSelected(null)}
        >
          <p><b>Name:</b> {selected.name}</p>
          <p><b>Email:</b> {selected.email}</p>
          <p><b>Service:</b> {selected.service}</p>
          <p><b>Message:</b> {selected.message}</p>
          <p><b>Budget:</b> {selected.budget}</p>

          <div className="flex gap-2 pt-4">
            <button onClick={()=>updateStatus(selected.id,'Pending')} className="px-3 py-1 text-xs bg-yellow-600 rounded">Pending</button>
            <button onClick={()=>updateStatus(selected.id,'In Progress')} className="px-3 py-1 text-xs bg-blue-600 rounded">Progress</button>
            <button onClick={()=>updateStatus(selected.id,'Completed')} className="px-3 py-1 text-xs bg-green-600 rounded">Completed</button>
          </div>
        </Modal>
      )}

      {edit && (
        <Modal title="Edit Request" onClose={()=>setEdit(null)}>

          <input value={edit.name} onChange={e=>setEdit({...edit,name:e.target.value})} className="input"/>
          <input value={edit.email} onChange={e=>setEdit({...edit,email:e.target.value})} className="input"/>
          <input value={edit.service} onChange={e=>setEdit({...edit,service:e.target.value})} className="input"/>
          <textarea value={edit.message} onChange={e=>setEdit({...edit,message:e.target.value})} className="input"/>
          <input value={edit.budget} onChange={e=>setEdit({...edit,budget:e.target.value})} className="input"/>

          <button onClick={saveEdit} className="mt-3 px-3 py-1 bg-blue-600 rounded text-sm">
            Save
          </button>

        </Modal>
      )}

    </PageWrapper>

  )
}

function Stat({title,value}){
  return(
    <div className="border border-slate-700 rounded-xl p-4 bg-slate-900">
      <div className="text-xs text-slate-400">{title}</div>
      <div className="text-2xl text-white font-semibold">{value}</div>
    </div>
  )
}

function Modal({title,children,onClose}){
  return(
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

      <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 w-full max-w-md space-y-3">

        <h2 className="text-white font-semibold">{title}</h2>

        <div className="space-y-2 text-sm text-slate-300">
          {children}
        </div>

        <div className="text-right pt-2">
          <button onClick={onClose} className="text-xs px-3 py-1 bg-slate-700 rounded">
            Close
          </button>
        </div>

      </div>

    </div>
  )
}