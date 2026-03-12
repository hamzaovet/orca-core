import { useState, useContext } from "react"
import { 
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendEmailVerification
} from "firebase/auth"
import { auth, db } from "../firebase/config"
import { doc, setDoc, serverTimestamp } from "firebase/firestore"
import { AppContext } from "../context/AppContext.jsx"

export default function Signup(){

  const { navigate } = useContext(AppContext)

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState("")

  const signup = async (e)=>{

    e.preventDefault()
    setLoading(true)
    setError("")

    try{

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )

      const user = userCredential.user

      await sendEmailVerification(user)

      await setDoc(doc(db,"users",user.uid),{
        email:user.email,
        role:"client",
        plan:"starter",
        aiGenerations:0,
        websites:0,
        createdAt:serverTimestamp()
      })

      navigate("/dashboard")

    }catch(err){

      if(err.code === "auth/email-already-in-use"){
        setError("Email already registered")
      }else{
        setError("Signup failed")
      }

    }

    setLoading(false)

  }

  const signupWithGoogle = async ()=>{

    setLoading(true)
    setError("")

    try{

      const provider = new GoogleAuthProvider()

      const result = await signInWithPopup(auth,provider)

      const user = result.user

      await setDoc(doc(db,"users",user.uid),{
        email:user.email,
        role:"client",
        plan:"starter",
        aiGenerations:0,
        websites:0,
        createdAt:serverTimestamp()
      },{ merge:true })

      navigate("/dashboard")

    }catch(err){

      setError("Google signup failed")

    }

    setLoading(false)

  }

  return(

    <div className="max-w-md mx-auto py-20">

      <h1 className="text-2xl text-white mb-6">
        Create Account
      </h1>

      {error && (
        <div className="text-red-400 mb-4">
          {error}
        </div>
      )}

      <button
        onClick={signupWithGoogle}
        disabled={loading}
        className="w-full bg-white text-black p-3 rounded hover:bg-gray-200 mb-4"
      >
        Continue with Google
      </button>

      <form onSubmit={signup} className="space-y-4">

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
          {loading ? "Creating account..." : "Sign Up"}
        </button>

      </form>

    </div>

  )
}