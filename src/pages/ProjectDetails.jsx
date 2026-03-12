import React, { useState, useEffect, useContext, useRef } from 'react'
import { AppContext } from '../context/AppContext.jsx'
import { PageWrapper } from '../components/PageWrapper.jsx'
import { 
  doc, getDoc, collection, query, where, orderBy, onSnapshot, addDoc, serverTimestamp 
} from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { db, auth, storage } from '../firebase/config.js'
import { MessageSquare, Paperclip, Send, ArrowLeft, FileText, Download } from 'lucide-react'

export default function ProjectDetails({ id }) {
  const { user, navigate } = useContext(AppContext)

  const [project, setProject] = useState(null)
  const [messages, setMessages] = useState([])
  const [files, setFiles] = useState([])
  
  const [newMessage, setNewMessage] = useState('')
  const [uploading, setUploading] = useState(false)
  const [loading, setLoading] = useState(true)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    if (!user) return

    const fetchProject = async () => {
      const docRef = doc(db, 'projects', id)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        const data = docSnap.data()
        // Simple security check on client side
        if (user.role === 'client' && data.clientId !== user.uid) navigate('/dashboard')
        setProject({ id: docSnap.id, ...data })
      }
      setLoading(false)
    }

    fetchProject()

    const qMsgs = query(collection(db, 'messages'), where('projectId', '==', id))
    const unsubMsgs = onSnapshot(qMsgs, (snap) => {
      if (!snap || snap.empty) { setMessages([]); return }
      const list = snap.docs.map(d => ({id: d.id, ...d.data()}))
      list.sort((a,b)=> (a.createdAt?.seconds||0) - (b.createdAt?.seconds||0))
      setMessages(list)
    })

    const qFiles = query(collection(db, 'files'), where('projectId', '==', id))
    const unsubFiles = onSnapshot(qFiles, (snap) => {
      if (!snap || snap.empty) { setFiles([]); return }
      const list = snap.docs.map(d => ({id: d.id, ...d.data()}))
      list.sort((a,b)=> (b.createdAt?.seconds||0) - (a.createdAt?.seconds||0))
      setFiles(list)
    })

    return () => { unsubMsgs(); unsubFiles(); }
  }, [id, user, navigate])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!newMessage.trim() || !user) return
    
    await addDoc(collection(db, 'messages'), {
      projectId: id,
      senderId: user.uid,
      senderRole: user.role,
      senderEmail: user.email,
      message: newMessage,
      createdAt: serverTimestamp()
    })
    setNewMessage('')
  }

  const handleFileUpload = async (e) => {
    const file = e.target.files[0]
    if (!file || !user) return

    setUploading(true)
    try {
      // Create storage reference
      const storageRef = ref(storage, `projects/${id}/${Date.now()}_${file.name}`)
      await uploadBytes(storageRef, file)
      const downloadURL = await getDownloadURL(storageRef)

      // Add file record to firestore
      await addDoc(collection(db, 'files'), {
        projectId: id,
        fileName: file.name,
        fileUrl: downloadURL,
        uploadedBy: user.uid,
        uploaderRole: user.role,
        createdAt: serverTimestamp()
      })
    } catch (err) {
      console.error("Upload error:", err)
      alert("Error uploading file.")
    }
    setUploading(false)
  }

  if (loading) return <PageWrapper className="p-8"><div className="text-slate-500">Loading project workspace...</div></PageWrapper>
  if (!project) return <PageWrapper className="p-8"><div className="text-red-400">Project not found or access denied.</div></PageWrapper>

  return (
    <PageWrapper className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-[calc(100vh-80px)] flex flex-col">
      <header className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate(-1)} className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            Workspace: {project.title}
            <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded ${project.status==='Active' ? 'bg-blue-500/20 text-blue-300' : 'bg-green-500/20 text-green-300'}`}>
              {project.status}
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">Project ID: {project.id}</p>
        </div>
      </header>

      <div className="flex-1 min-h-0 grid md:grid-cols-3 gap-6">
        
        {/* Chat Section */}
        <div className="md:col-span-2 glass-card flex flex-col overflow-hidden border border-slate-700/70">
          <div className="p-4 border-b border-white/5 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-blue-400" />
            <h2 className="font-medium text-white">Team Chat</h2>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && <div className="text-slate-500 text-center text-sm py-10">Say hello! Start the conversation.</div>}
            
            {messages.map(msg => {
              const isMine = msg.senderId === user.uid
              const isAdmin = msg.senderRole === 'admin'
              return (
                <div key={msg.id} className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm ${
                    isMine ? 'bg-blue-600 text-white rounded-br-none' : 
                    isAdmin ? 'bg-cyan-600/30 border border-cyan-500/30 text-white rounded-bl-none' : 
                    'bg-slate-800 text-slate-200 rounded-bl-none'
                  }`}>
                    {!isMine && <p className={`text-[10px] font-semibold mb-1 ${isAdmin ? 'text-cyan-400' : 'text-slate-400'}`}>{isAdmin ? 'Nexara Support' : 'Client'}</p>}
                    <p>{msg.message}</p>
                    <p className={`text-[9px] mt-1 text-right ${isMine ? 'text-blue-200' : 'text-slate-500'}`}>
                      {msg.createdAt?.toDate ? new Intl.DateTimeFormat('en', { timeStyle: 'short' }).format(msg.createdAt.toDate()) : '...'}
                    </p>
                  </div>
                </div>
              )
            })}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSendMessage} className="p-3 bg-white/5 border-t border-white/5 flex gap-2 items-center">
            <input 
              type="text" 
              value={newMessage}
              onChange={e => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-[#020617] text-sm text-slate-200 px-4 py-2.5 rounded-full border border-white/10 focus:outline-none focus:border-blue-500"
            />
            <button type="submit" disabled={!newMessage.trim()} className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:hover:bg-blue-600 text-white p-2.5 rounded-full transition">
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Files & Progress Section */}
        <div className="flex flex-col gap-6 overflow-y-auto">
          
          {/* Progress */}
          <div className="glass-card p-5 border border-slate-700/70">
             <h3 className="text-sm uppercase tracking-widest text-slate-400 mb-4">Project Progress</h3>
             <div className="flex justify-between items-end mb-2">
                <span className="text-3xl font-light text-white">{project.progress || 0}%</span>
             </div>
             <div className="w-full bg-slate-800 rounded-full h-2">
               <div className="bg-gradient-to-r from-blue-500 to-cyan-400 h-2 rounded-full transition-all duration-1000" style={{ width: `${project.progress || 0}%` }}></div>
             </div>
          </div>

          {/* Files */}
          <div className="glass-card p-5 border border-slate-700/70 flex-1 flex flex-col min-h-0">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm uppercase tracking-widest text-slate-400 flex items-center gap-2">
                <Paperclip className="w-4 h-4" /> Shared Files
              </h3>
              
              <label className="cursor-pointer bg-white/10 hover:bg-white/20 text-xs px-3 py-1.5 rounded transition">
                {uploading ? 'Uploading...' : 'Upload'}
                <input type="file" className="hidden" onChange={handleFileUpload} disabled={uploading} />
              </label>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2">
              {files.length === 0 && <p className="text-slate-500 text-xs py-4 text-center">No files uploaded yet.</p>}
              
              {files.map(f => (
                <a href={f.fileUrl} target="_blank" rel="noreferrer" key={f.id} className="flex items-center justify-between p-3 rounded bg-[#020617]/50 hover:bg-[#020617] border border-white/5 transition group">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <FileText className="w-5 h-5 text-blue-400 shrink-0" />
                    <div className="truncate">
                      <p className="text-sm text-slate-200 truncate">{f.fileName}</p>
                      <p className="text-[10px] text-slate-500">
                        {f.createdAt?.toDate ? f.createdAt.toDate().toLocaleDateString() : ''} • {f.uploaderRole === 'admin' ? 'Nexara' : 'Client'}
                      </p>
                    </div>
                  </div>
                  <Download className="w-4 h-4 text-slate-500 group-hover:text-blue-400 shrink-0" />
                </a>
              ))}
            </div>
          </div>

        </div>

      </div>
    </PageWrapper>
  )
}
