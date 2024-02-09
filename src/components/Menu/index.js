import { useState, useRef } from "react"
import Login from "./Login"
import Register from "./Register"
import "./style.css"
import loginimg from "../../assets/login.svg"
import { useAuth } from "../../contexts/AuthContext"

export default function Index() {
  const [forgot, setForgot] = useState(false)
  const [create, setCreate] = useState(false)

  const [errorReset, setErrorReset] = useState("")
  const { resetPassword } = useAuth()
  const [loadingReset, setLoadingReset] = useState(false)
  const [ResetSucces, setResetSucces] = useState(false)
  const emailResetRef = useRef()

  function showForgot() {
    setForgot(true)
  }

  function showCreate() {
    setCreate(true)
  }

  function showLogin() {
    setForgot(false)
    setErrorReset(false)
    setCreate(false)
    setResetSucces(false)
  }

  async function handleSubmitReset(e) {
    e.preventDefault()

    try {
      setErrorReset("")
      setLoadingReset(true)
      resetPassword(emailResetRef.current.value)
        .then(() => setResetSucces(true))
        .catch((err) => {
          console.log(err)
          switch (err.code) {
            case "auth/too-many-requests":
              setErrorReset("Too many tries. Try again later.")
              break
            case "auth/invalid-email":
              setErrorReset("Email is invalid.")
              break
            default:
              setErrorReset("Email is invalid")
          }
        })
    } catch {
      setErrorReset("Email invalidd")
    }
    setLoadingReset(false)
  }

  return (
    <div className="menudiv">
      <div className="cardMenu">
        <img src={loginimg} className="imagemenu" alt="login" />
        {errorReset && (
          <p
            style={{
              color: "#A71313",
            }}
          >
            {errorReset}
          </p>
        )}
        {ResetSucces && (
          <p
            style={{
              color: "#69aa5e",
            }}
          >
            Email has been send!
          </p>
        )}
        {!forgot && !create && (
          <div>
            <p className="textlogin">
              {" "}
              <b>Welcome to Clone </b>
            </p>
            <p>
              <b>Sign in now or create an account</b>
            </p>
            <Login />
            <p
              onClick={showForgot}
              style={{
                fontWeight: "bold",
                cursor: "pointer",
                fontSize: "small",
                color: "#8c56d8",
                textDecoration: "underline",
              }}
            >
              Forgot password?
            </p>
            <p
              onClick={showCreate}
              style={{
                fontWeight: "bold",
                cursor: "pointer",
                fontSize: "small",
                color: "#8c56d8",
                textDecoration: "underline",
              }}
            >
              Create account
            </p>
          </div>
        )}

        {create && (
          <div>
            <p className="textlogin">
              {" "}
              <b>Create an account </b>
            </p>
            <Register />
            <p
              onClick={showLogin}
              style={{
                fontWeight: "bold",
                cursor: "pointer",
                fontSize: "small",
                color: "#8c56d8",
                textDecoration: "underline",
              }}
            >
              Login
            </p>
          </div>
        )}

        {forgot && (
          <div>
            <form className="loginform" onSubmit={handleSubmitReset} novalidate>
              <input
                type="text"
                placeholder="Email"
                ref={emailResetRef}
              ></input>
              <button type="submit" disabled={loadingReset}>
                Send mail
              </button>
            </form>
            <p
              onClick={showLogin}
              style={{
                fontWeight: "bold",
                cursor: "pointer",
                fontSize: "small",
                color: "#8c56d8",
                textDecoration: "underline",
              }}
            >
              Login
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
