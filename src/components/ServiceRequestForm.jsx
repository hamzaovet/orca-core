import { useState } from "react"
import { db, auth } from "../firebase/config.js"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"

export default function ServiceRequestForm() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    serviceType: "Website Development",
    description: "",
    budget: ""
  })

  const [loading,setLoading] = useState(false)
  const [success,setSuccess] = useState(false)
  const [error,setError] = useState("")

  const handleChange = (e)=>{
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async(e)=>{

    e.preventDefault()

    setError("")
    setLoading(true)

    const user = auth.currentUser

    if(!user){
      setError("You must login before submitting a request.")
      setLoading(false)
      return
    }

    try{

      await addDoc(collection(db,"service_requests"),{

        userId:user.uid,
        userEmail:user.email,

        name:formData.name,
        email:formData.email,
        phone:formData.phone,
        company:formData.company,
        serviceType:formData.serviceType,
        description:formData.description,
        budget:formData.budget,

        status:"Pending",
        createdAt:serverTimestamp()

      })

      setSuccess(true)

      setFormData({
        name:"",
        email:"",
        phone:"",
        company:"",
        serviceType:"Website Development",
        description:"",
        budget:""
      })

    }catch(err){

      console.error(err)
      setError("Failed to submit request. Please try again.")

    }

    setLoading(false)

  }

  return(

    <div className="bg-[#0f172a] p-8 rounded-2xl shadow-xl">

      {success && (
        <div className="mb-6 text-green-400">
          Your request has been submitted successfully.
        </div>
      )}

      {error && (
        <div className="mb-6 text-red-400">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid gap-5">

        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="p-3 rounded-lg bg-[#020617] border border-slate-700"
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
          className="p-3 rounded-lg bg-[#020617] border border-slate-700"
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          className="p-3 rounded-lg bg-[#020617] border border-slate-700"
        />

        <input
          type="text"
          name="company"
          placeholder="Company Name"
          value={formData.company}
          onChange={handleChange}
          className="p-3 rounded-lg bg-[#020617] border border-slate-700"
        />

        <select
          name="serviceType"
          value={formData.serviceType}
          onChange={handleChange}
          className="p-3 rounded-lg bg-[#020617] border border-slate-700"
        >
          <option>Website Development</option>
          <option>Accounting System</option>
        </select>

        <textarea
          name="description"
          placeholder="Project Description"
          rows="4"
          value={formData.description}
          onChange={handleChange}
          className="p-3 rounded-lg bg-[#020617] border border-slate-700"
        />

        <input
          type="text"
          name="budget"
          placeholder="Estimated Budget"
          value={formData.budget}
          onChange={handleChange}
          className="p-3 rounded-lg bg-[#020617] border border-slate-700"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 transition p-3 rounded-lg font-semibold"
        >
          {loading ? "Submitting..." : "Submit Request"}
        </button>

      </form>

    </div>
  )
}