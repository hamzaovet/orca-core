import React from 'react'
import { PageWrapper, FadeUpSection } from '../components/PageWrapper.jsx'

export default function Privacy() {
  return (
    <PageWrapper className="max-w-4xl mx-auto px-4 py-20 min-h-screen text-slate-300">
      <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy</h1>
      <FadeUpSection delay={0.1} className="prose prose-invert max-w-none">
        <p className="mb-6">Effective Date: [Insert Date]</p>
        
        <h2 className="text-2xl font-semibold text-white mt-10 mb-4">1. Information We Collect</h2>
        <p className="mb-4">We collect information you provide directly to us when you create an account, such as your email address and billing details. We also collect data regarding your usage of the AI generator tools to improve the Platform.</p>

        <h2 className="text-2xl font-semibold text-white mt-10 mb-4">2. How We Use Your Information</h2>
        <p className="mb-4">We use the information we collect to operate, maintain, and provide the features and functionality of the Platform, as well as to process payments and communicate directly with you.</p>

        <h2 className="text-2xl font-semibold text-white mt-10 mb-4">3. Information Sharing</h2>
        <p className="mb-4">We do not sell your personal information. We may share information with third-party vendors, consultants, and service providers who need access to such information to carry out work on our behalf.</p>

        <h2 className="text-2xl font-semibold text-white mt-10 mb-4">4. Data Security</h2>
        <p className="mb-4">We take reasonable measures to help protect information about you from loss, theft, misuse, and unauthorized access, disclosure, alteration, and destruction.</p>
      </FadeUpSection>
    </PageWrapper>
  )
}
