import React from 'react'
import { PageWrapper, FadeUpSection } from '../components/PageWrapper.jsx'

export default function Terms() {
  return (
    <PageWrapper className="max-w-4xl mx-auto px-4 py-20 min-h-screen text-slate-300">
      <h1 className="text-4xl font-bold text-white mb-8">Terms of Service</h1>
      <FadeUpSection delay={0.1} className="prose prose-invert max-w-none">
        <p className="mb-6">Effective Date: [Insert Date]</p>
        
        <h2 className="text-2xl font-semibold text-white mt-10 mb-4">1. Acceptance of Terms</h2>
        <p className="mb-4">By accessing or using Nexara (“the Platform”), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Platform.</p>

        <h2 className="text-2xl font-semibold text-white mt-10 mb-4">2. Description of Service</h2>
        <p className="mb-4">Nexara is an AI-powered SaaS platform providing tools for digital agencies, including AI website generation, content creation, and hosting deployment simulations.</p>

        <h2 className="text-2xl font-semibold text-white mt-10 mb-4">3. User Responsibilities</h2>
        <p className="mb-4">You are responsible for safeguarding your account and any activities or actions under your account. You agree not to disclose your password to any third party.</p>

        <h2 className="text-2xl font-semibold text-white mt-10 mb-4">4. Subscriptions and Billing</h2>
        <p className="mb-4">Nexara offers tiered subscription plans. By subscribing, you agree to pay the fees associated with your selected plan. Billing is managed via Stripe.</p>

        <h2 className="text-2xl font-semibold text-white mt-10 mb-4">5. Disclaimer of Warranties</h2>
        <p className="mb-4">The Platform is provided "as is" without warranty of any kind, either express or implied, including, but not limited to, the implied warranties of merchantability and fitness for a particular purpose.</p>
      </FadeUpSection>
    </PageWrapper>
  )
}
