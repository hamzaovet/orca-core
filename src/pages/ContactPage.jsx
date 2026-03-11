import React, { useState, useContext } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../firebase/config.js'
import { AppContext } from '../context/AppContext.jsx'
import { PageWrapper } from '../components/PageWrapper.jsx'
import { CheckCircle2 } from '../components/icons.jsx'

export default function ContactPage() {
  const { t, user } = useContext(AppContext)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: 'web',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user) return
    setIsSubmitting(true)
    try {
      await addDoc(collection(db, 'service_requests'), {
        name: formData.name,
        email: formData.email,
        service: formData.service,
        message: formData.message,
        createdAt: new Date().toISOString(),
      })
      setSuccess(true)
      setFormData({
        name: '',
        email: '',
        company: '',
        service: 'web',
        message: '',
      })
      setTimeout(() => setSuccess(false), 5000)
    } catch (error) {
      console.error('Error submitting form', error)
    }
    setIsSubmitting(false)
  }

  return (
    <PageWrapper className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
          {t.contact.title}
        </h1>
        <p className="text-lg text-slate-400">{t.contact.desc}</p>
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass-card border-white/5 p-8 md:p-12 relative overflow-hidden"
      >
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] -z-10 pointer-events-none" />
        <AnimatePresence mode="wait">
          {success ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center py-20"
            >
              <div className="w-20 h-20 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                {t.contact.success}
              </h3>
              <p className="text-slate-400">We will get back to you shortly.</p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="space-y-6 relative z-10"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                    {t.contact.name}
                  </label>
                  <input
                    required
                    type="text"
                    className="form-input"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                    {t.contact.email}
                  </label>
                  <input
                    required
                    type="email"
                    className="form-input"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                    {t.contact.company}
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                    {t.contact.service}
                  </label>
                  <select
                    className="form-input appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M5%207l5%205%205-5%22%20stroke%3D%22%2394a3b8%22%20stroke-width%3D%221.5%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[position:right_1rem_center]"
                    value={formData.service}
                    onChange={(e) =>
                      setFormData({ ...formData, service: e.target.value })
                    }
                  >
                    <option className="bg-slate-900" value="web">
                      {t.services.web.title}
                    </option>
                    <option className="bg-slate-900" value="accounting">
                      {t.services.acc.title}
                    </option>
                    <option className="bg-slate-900" value="both">
                      Integrated Solution
                    </option>
                    <option className="bg-slate-900" value="other">
                      Other
                    </option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  {t.contact.message}
                </label>
                <textarea
                  required
                  rows="5"
                  className="form-input resize-none"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full py-4 text-lg mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </span>
                ) : (
                  t.contact.submit
                )}
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </PageWrapper>
  )
}

