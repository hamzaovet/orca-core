import ServiceRequestForm from "../components/ServiceRequestForm.jsx"

export default function RequestService() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-20">

      <h1 className="text-4xl font-bold text-center mb-10">
        Start Your Project
      </h1>

      <p className="text-center text-slate-400 mb-12">
        Tell us about your project and we will contact you shortly.
      </p>

      <ServiceRequestForm />

    </div>
  )
}