import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext.jsx'
import { PageWrapper, FadeUpSection } from '../components/PageWrapper.jsx'
import { collection, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore'
import { db, auth } from '../firebase/config.js'

export default function PortfolioPage() {
  const { t } = useContext(AppContext)

  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  const defaultProjects = [
    { title: "Fullmark Work", url: "https://fullmarkwork.net/", category: "Website" },
    { title: "Jozour AC", url: "https://jozourac.com/", category: "Website" },
    { title: "Fullmark Portfolio", url: "https://fullmarkwork-portfolio.vercel.app/", category: "Website" },
    { title: "Lomda Website", url: "https://lomda-website.vercel.app/", category: "Website" }
  ]

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'portfolio_projects'), async (snapshot) => {
      if (snapshot.empty && loading) {
        // Seed default projects
        console.log("Seeding default projects...")
        try {
          for (const proj of defaultProjects) {
            await addDoc(collection(db, 'portfolio_projects'), {
              ...proj,
              createdAt: serverTimestamp()
            })
          }
        } catch (e) {
          console.error("Error seeding projects:", e)
        }
      } else {
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        setProjects(data)
        setLoading(false)
      }
    })

    return () => unsub()
  }, [])

  return (
    <PageWrapper className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            {t.portfolio.title}
          </h1>
          <p className="text-sm text-slate-400 mt-2 max-w-xl">
            Selected projects and internal systems we&apos;ve built for clients in
            finance, logistics, and professional services.
          </p>
        </div>
      </div>

      <FadeUpSection>
        {loading ? (
             <div className="glass-card border border-dashed border-slate-700/70 p-10 text-center text-sm text-slate-400">
               Loading projects...
             </div>
        ) : projects.length === 0 ? (
          <div className="glass-card border border-dashed border-slate-700/70 p-10 text-center text-sm text-slate-400">
            {t.portfolio.noProjects}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <a
                href={project.url}
                target="_blank"
                rel="noreferrer"
                key={project.id}
                className="glass-card border border-slate-700/70 p-5 flex flex-col justify-between hover:border-blue-500/50 transition-colors"
              >
                <h2 className="text-lg font-semibold text-white">
                  {project.title}
                </h2>
                <span className="text-xs uppercase tracking-wider text-slate-500 mt-1 mb-3 block">
                  {project.category}
                </span>
                <p className="text-xs text-slate-400 mt-2 line-clamp-3">
                  {project.description || "No description provided."}
                </p>
                <button
                  type="button"
                  className="mt-4 text-xs text-blue-400 hover:text-blue-300 text-left"
                >
                  {t.portfolio.viewProject} &rarr;
                </button>
              </a>
            ))}
          </div>
        )}
      </FadeUpSection>
    </PageWrapper>
  )
}

