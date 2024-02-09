import React, { useState, useRef } from "react"
import cancelimg from "../../assets/cancel.svg"
import { useAuth } from "../../contexts/AuthContext"
import passimg from "../../assets/key.png"
import emailimg from "../../assets/email.png"
import userimg from "../../assets/user.png"
import ProfileImage from "./ProfileImage"
import { useNav } from "../../contexts/NavContext"
import { usetheme } from "../../util/theme"

export default function Settings(props) {
  const { setActive } = useNav()
  const [classpopupsetting, setclasspopupsetting] = useState(
    "classsettingup settingcard",
  )
  const [classpopupprofile, setclasspopupprofile] = useState(
    "classprofileup profilebox",
  )

  const [theme, setTheme] = useState(localStorage.getItem("theme"))
  const { logout, updatePassword, updateEmail } = useAuth()

  const [showPassword, setshowPassword] = useState(false)
  const [showEmail, setshowEmail] = useState(false)
  const [showProfile, setshowProfile] = useState(false)

  const newpasswordRef = useRef()
  const confirmnewpasswordRef = useRef()

  const newemailRef = useRef()
  const confirmnewemailRef = useRef()

  const [error, setError] = useState("")
  const [noError, setnoError] = useState(false)
  const [loading, setLoading] = useState(false)

  const [errorMail, setErrorMail] = useState("")
  const [noErrorMail, setnoErrorMail] = useState(false)
  const [loadingMail, setLoadingMail] = useState(false)

  function menudownsettings() {
    setnoError(false)
    setnoErrorMail(false)
    setshowPassword(false)
    setshowEmail(false)
    setErrorMail(false)
    setError(false)

    setclasspopupsetting("classsettingdown settingcard")
    setTimeout(() => {
      props.setTrigger(false)
      setclasspopupsetting("classsettingup settingcard")
    }, 800)
  }

  function changeTheme() {
    if (theme === "darkmode") {
      localStorage.setItem("theme", "lightmode")
      setTheme("lightmode")
    } else {
      localStorage.setItem("theme", "darkmode")
      setTheme("darkmode")
    }
    usetheme()
  }

  async function handleLogout() {
    try {
      setActive("home")
      await logout()
    } catch {
      console.log("error")
    }
  }

  async function handleSubmitPassword(e) {
    e.preventDefault()

    if (newpasswordRef.current.value !== confirmnewpasswordRef.current.value) {
      return setError("Password does not match")
    }

    try {
      setError("")
      setLoading(true)
      updatePassword(newpasswordRef.current.value)
        .then(() => {
          setnoError(true)
        })
        .catch((err) => {
          switch (err.code) {
            case "auth/too-many-requests":
              setError("Too many tries. Try again later.")
              break
            case "auth/weak-password":
              setError("Password must be atleast 6 digits long.")
              break
            default:
              setError("Error, please logout en log back in .")
          }
        })
    } catch {
      setError("Email or password is invalidd")
    }
    setLoading(false)
  }

  async function handleSubmitEmail(e) {
    e.preventDefault()

    if (newemailRef.current.value !== confirmnewemailRef.current.value) {
      return setErrorMail("Email does not match")
    }

    try {
      setErrorMail("")
      setLoadingMail(true)
      updateEmail(newemailRef.current.value)
        .then(() => {
          setnoErrorMail(true)
        })
        .catch((err) => {
          console.log(err)
          switch (err.code) {
            case "auth/too-many-requests":
              setErrorMail("Too many tries. Try again later.")
              break
            case "auth/email-already-in-use":
              setErrorMail("Email is already in use.")
              break
            case "auth/invalid-email":
              setErrorMail("Email is invalid.")
              break
            default:
              setErrorMail("Error, please logout en log back in .")
          }
        })
    } catch {
      setErrorMail("Email or password is invalidd")
    }
    setLoadingMail(false)
  }

  function showPasswordBox() {
    setnoError(false)
    if (showPassword) {
      setshowPassword(false)
    } else {
      setshowPassword(true)
    }
  }

  function showProfileBox() {
    if (showProfile) {
      setshowProfile(false)
    } else {
      setshowProfile(true)
    }
  }

  function menudownprofile() {
    setclasspopupprofile("classprofiledown profilebox")
    setTimeout(() => {
      setshowProfile(false)
      setclasspopupprofile("classprofileup profilebox")
    }, 800)
  }

  function showEmailBox() {
    setnoErrorMail(false)
    if (showEmail) {
      setshowEmail(false)
    } else {
      setshowEmail(true)
    }
  }

  return props.trigger ? (
    <div className="popupSettings">
      <div className="blurSettings" />

      {showProfile && (
        <div className={classpopupprofile}>
          <img
            alt="cancel"
            src={cancelimg}
            className="cancelimg"
            onClick={menudownprofile}
          />
          <ProfileImage />
        </div>
      )}

      <div className={classpopupsetting}>
        <div className="settingsList">
          <img
            alt="cancel"
            src={cancelimg}
            className="cancelimg"
            onClick={menudownsettings}
          />

          <div className="profileP">
            <div
              onClick={() => {
                showProfileBox()
              }}
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <img alt="settings" src={userimg} className="settingsicon" />
              <p>Change Profile Image</p>
            </div>
          </div>

          <div className="passwordP">
            <div
              onClick={() => {
                showPasswordBox()
              }}
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <img alt="settings" src={passimg} className="settingsicon" />
              <p>Change Password</p>
            </div>
            {showPassword && (
              <div>
                {error && (
                  <p
                    style={{
                      color: "#A71313",
                    }}
                  >
                    {error}
                  </p>
                )}

                {noError && (
                  <p
                    style={{
                      color: "#69aa5e",
                    }}
                  >
                    Password changed successfully
                  </p>
                )}

                <form className="passwordform" onSubmit={handleSubmitPassword}>
                  <input
                    type="password"
                    placeholder="new password"
                    ref={newpasswordRef}
                  ></input>
                  <input
                    type="password"
                    placeholder="confirm new password"
                    ref={confirmnewpasswordRef}
                  ></input>
                  <button type="submit" disabled={loading}>
                    Change password
                  </button>
                </form>
              </div>
            )}
          </div>

          <div className="emailP">
            <div
              onClick={() => {
                showEmailBox()
              }}
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <img alt="settings" src={emailimg} className="settingsicon" />
              <p>Change Email</p>
            </div>

            {showEmail && (
              <div>
                {errorMail && (
                  <p
                    style={{
                      color: "#A71313",
                    }}
                  >
                    {errorMail}
                  </p>
                )}

                {noErrorMail && (
                  <p
                    style={{
                      color: "#69aa5e",
                    }}
                  >
                    Email changed successfully
                  </p>
                )}

                <form className="passwordform" onSubmit={handleSubmitEmail}>
                  <input
                    type="email"
                    placeholder="new email"
                    ref={newemailRef}
                  ></input>
                  <input
                    type="email"
                    placeholder="confirm new email"
                    ref={confirmnewemailRef}
                  ></input>
                  <button type="submit" disabled={loadingMail}>
                    Change email
                  </button>
                </form>
              </div>
            )}
          </div>

          <div className="darkmodeP">
            <label>Darkmode:</label>
            <label class="switch">
              <input
                type="checkbox"
                defaultChecked={theme === "darkmode"}
                onChange={changeTheme}
              />
              <span className="slider round"></span>
            </label>
          </div>

          <button onClick={handleLogout} className="logoutbutton">
            Logout
          </button>
        </div>
      </div>
    </div>
  ) : (
    ""
  )
}
