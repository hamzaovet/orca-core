import { useState, useContext } from "react"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth, db } from "../firebase/config"
import { doc, getDoc } from "firebase/firestore"
import { AppContext } from "../context/AppContext.jsx"

export default function Login(){

  const { navigate } = useContext(AppContext)

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [error,setError] = useState("")
  const [loading,setLoading] = useState(false)

  const login = async(e)=>{

    e.preventDefault()
    setLoading(true)
    setError("")

    try{

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )

      const user = userCredential.user

      const userDocRef = doc(db, "users", user.uid)
      const userDocSnap = await getDoc(userDocRef)
      
      let role = "client"
      if (userDocSnap.exists()) {
        role = userDocSnap.data().role || "client"
      }

      if(role === "admin"){
        navigate("/admin")
      }else{
        navigate("/dashboard")
      }

    }catch(err){
      setError("Invalid email or password")
    }

    setLoading(false)

  }

  return(

    <div className="max-w-md mx-auto py-20">

      <h1 className="text-2xl text-white mb-6">
        Login
      </h1>

      {error && (
        <div className="text-red-400 mb-4">
          {error}
        </div>
      )}

      <form onSubmit={login} className="space-y-4">

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e=>setEmail(e.target.value)}
          className="w-full p-3 bg-slate-900 border border-slate-700 rounded"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e=>setPassword(e.target.value)}
          className="w-full p-3 bg-slate-900 border border-slate-700 rounded"
        />

        <button
          disabled={loading}
          className="w-full bg-blue-600 p-3 rounded hover:bg-blue-700"
        >
          {loading ? "Signing in..." : "Login"}
        </button>

      </form>

      <p className="text-sm text-slate-400 mt-6 text-center">
        Don't have an account?
      </p>

      <button
        onClick={()=>navigate("/signup")}
        className="w-full mt-2 border border-blue-500 text-blue-400 p-3 rounded hover:bg-blue-500/10"
      >
        Create Account
      </button>

    </div>

  )
}