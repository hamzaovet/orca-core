import React, { useState, useEffect, Suspense, lazy } from "react"
import "./styles/globals.css"
import { AnimatePresence } from "framer-motion"

import { onAuthStateChanged } from "firebase/auth"
import { auth, db } from "./firebase/config.js"
import { doc, getDoc } from "firebase/firestore"

import { AppContext } from "./context/AppContext.jsx"
import { translations } from "./context/translations.js"

import Navbar from "./components/Navbar.jsx"
import Footer from "./components/Footer.jsx"
import FloatingWhatsApp from "./components/FloatingWhatsApp.jsx"
import BackgroundGlows from "./components/BackgroundGlows.jsx"

const HomePage      = lazy(() => import("./pages/HomePage.jsx"))
const ServicesPage  = lazy(() => import("./pages/ServicesPage.jsx"))
const PortfolioPage = lazy(() => import("./pages/PortfolioPage.jsx"))
const ContactPage   = lazy(() => import("./pages/ContactPage.jsx"))
const Pricing       = lazy(() => import("./pages/Pricing.jsx"))
const Terms         = lazy(() => import("./pages/Terms.jsx"))
const Privacy       = lazy(() => import("./pages/Privacy.jsx"))
const RequestService = lazy(() => import("./pages/RequestService.jsx"))
const Login         = lazy(() => import("./pages/Login.jsx"))
const Signup        = lazy(() => import("./pages/Signup.jsx"))
const ClientDashboard    = lazy(() => import("./pages/ClientDashboard.jsx"))
const AdminDashboardPage = lazy(() => import("./pages/AdminDashboard.jsx"))
const ProjectDetails     = lazy(() => import("./pages/ProjectDetails.jsx"))

export default function App() {

  const [lang, setLang]             = useState("en")
  const [user, setUser]             = useState(null)
  const [loading, setLoading]       = useState(true)
  const [currentRoute, setCurrentRoute] = useState(window.location.pathname)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const t   = translations[lang]
  const dir = lang === "ar" ? "rtl" : "ltr"

  /* ── Auth listener ────────────────────────────── */
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null)
        setLoading(false)
        return
      }
      try {
        const snap = await getDoc(doc(db, "users", firebaseUser.uid))
        setUser({
          uid:   firebaseUser.uid,
          email: firebaseUser.email,
          role:  snap.exists() ? (snap.data().role || "client") : "client"
        })
      } catch {
        setUser({ uid: firebaseUser.uid, email: firebaseUser.email, role: "client" })
      }
      setLoading(false)
    })
    return () => unsub()
  }, [])

  /* ── Browser history ──────────────────────────── */
  useEffect(() => {
    const onPop = () => setCurrentRoute(window.location.pathname)
    window.addEventListener("popstate", onPop)
    return () => window.removeEventListener("popstate", onPop)
  }, [])

  /* ── Navigation helper ────────────────────────── */
  const navigate = (route) => {
    window.history.pushState({}, "", route)
    setCurrentRoute(route)
    setIsMenuOpen(false)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const toggleLang = () => setLang(prev => prev === "en" ? "ar" : "en")

  const contextValue = { lang, setLang, t, dir, user, navigate }
  const isAdmin = user?.role === "admin"

  /* ── Routing ──────────────────────────────────── */
  const renderPage = () => {
    if (loading) return <div className="text-center py-40 text-slate-400">Loading...</div>

    if (currentRoute === "/login") {
      if (user && isAdmin) return <AdminDashboardPage />
      if (user)            return <ClientDashboard />
      return <Login />
    }

    if (currentRoute === "/signup") {
      if (user && isAdmin) return <AdminDashboardPage />
      if (user)            return <ClientDashboard />
      return <Signup />
    }

    if (currentRoute.startsWith("/project/")) {
      if (!user) return <Login />
      return <ProjectDetails id={currentRoute.split("/project/")[1]} />
    }

    const pages = {
      "/":          <HomePage />,
      "/services":  <ServicesPage />,
      "/portfolio": <PortfolioPage />,
      "/pricing":   <Pricing />,
      "/contact":   <ContactPage />,
      "/terms":     <Terms />,
      "/privacy":   <Privacy />,
      "/request":   user ? <RequestService /> : <Login />,
      "/dashboard": user && !isAdmin ? <ClientDashboard /> : <Login />,
      "/admin":     user && isAdmin  ? <AdminDashboardPage /> : <Login />,
    }

    return pages[currentRoute] || <HomePage />
  }

  /* ── UI ───────────────────────────────────────── */
  return (
    <AppContext.Provider value={contextValue}>
      <div
        dir={dir}
        className={`min-h-screen bg-[#020617] text-slate-200 font-sans transition-colors duration-300 selection:bg-blue-600/30 overflow-hidden ${dir === "rtl" ? "font-arabic" : ""}`}
      >
        <BackgroundGlows />

        <Navbar
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          toggleLang={toggleLang}
        />

        <main className="pt-24 pb-16 min-h-[calc(100vh-80px)] relative z-10">
          <AnimatePresence mode="wait">
            <Suspense fallback={<div className="text-center py-40 text-slate-400">Loading page...</div>}>
              {renderPage()}
            </Suspense>
          </AnimatePresence>
        </main>

        <Footer />
        <FloatingWhatsApp />
      </div>
    </AppContext.Provider>
  )
}