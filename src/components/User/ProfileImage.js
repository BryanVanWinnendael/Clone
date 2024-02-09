import React, { useState, useRef } from "react"
import { storage } from "../../util/firebaseapp"
import defaultimg from "../../assets/default.png"
import { useAuth } from "../../contexts/AuthContext"

export default function ProfileImage() {
  const { currentUser, currProfileImage, setProfileImage } = useAuth()

  const profileimageRef = useRef()
  const [progress, setProgress] = useState(false)
  const [upload, setUpload] = useState(false)
  const [profileimageupload, setProfileimageupload] = useState("")
  const [url, setUrl] = useState(currProfileImage)

  async function handleSubmitProfile(e) {
    e.preventDefault()
    storage
      .ref(`ProfileImages/${currentUser.uid}/profileImage`)
      .put(profileimageupload)
      .then(() => {
        storage
          .ref(`ProfileImages/${currentUser.uid}`)
          .child("profileImage")
          .getDownloadURL()
          .then((url) => {
            setUrl(url)
            console.log(url)
            setProfileImage(url)
          })
      })
      .catch((error) => {
        console.log(error)
      })
    setProgress(true)
  }

  async function preview(e) {
    console.log(currentUser.uid)
    setProgress(false)
    let fileuploadImage = await e.target.files[0]
    setProfileimageupload(e.target.files[0])
    var reader

    reader = new FileReader()
    reader.onload = function () {
      setUrl(reader.result)
      setUpload(true)
    }
    reader.readAsDataURL(fileuploadImage)
  }

  return (
    <div
      style={{
        margin: "100px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {progress && (
        <p
          style={{
            color: "#69aa5e",
          }}
        >
          Profile Image changed successfully
        </p>
      )}

      {url && <img src={url} className="profileimgshow" alt="profile" />}
      {!url && (
        <img src={defaultimg} className="profileimgshow" alt="profile" />
      )}

      <form className="profileform" onSubmit={handleSubmitProfile}>
        <label for="file-upload" class="custom-file-upload">
          Choose image
        </label>
        <input
          style={{
            width: "100%",
            border: "none",
          }}
          type="file"
          placeholder="new password"
          onChange={preview}
          id="file-upload"
        ></input>

        <input
          style={{
            width: "100%",
            border: "none",
          }}
          type="file"
          placeholder="new password"
          ref={profileimageRef}
          onChange={preview}
        ></input>
        {upload && <button type="submit">Change Profile Image</button>}
      </form>
    </div>
  )
}
