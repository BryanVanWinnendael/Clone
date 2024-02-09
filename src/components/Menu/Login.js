import { useState, useRef } from "react"
import { useAuth } from "../../contexts/AuthContext"

export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const [error, setError] = useState("")
  const { login } = useAuth()
  const [loading, setLoading] = useState(false)

  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
  }

  async function handleSubmit(e) {
    e.preventDefault()

    if (emailRef.current.value === "" || passwordRef.current.value === "") {
      return setError("Please fill in everything")
    }

    if (!validateEmail(emailRef.current.value)) {
      return setError("Please fill in a valid email")
    }

    try {
      setError("")
      setLoading(true)
      login(emailRef.current.value, passwordRef.current.value).catch((err) => {
        switch (err.code) {
          case "auth/too-many-requests":
            setError("Too many tries. Try again later.")
            break
          default:
            setError("Email or password is invalid")
        }
      })
    } catch {
      setError("Email or password is invalid")
    }
    setLoading(false)
  }

  return (
    <div className="login">
      {error && (
        <p
          style={{
            color: "#A71313",
          }}
        >
          {error}
        </p>
      )}
      <form className="loginform" onSubmit={handleSubmit} novalidate>
        <input type="email" placeholder="Email" ref={emailRef}></input>
        <input type="password" placeholder="Password" ref={passwordRef}></input>
        <button type="submit" disabled={loading}>
          Sign in
        </button>
      </form>
    </div>
  )
}
