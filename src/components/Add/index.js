import React, { useState, useRef } from "react"
import { storage, db } from "../../util/firebaseapp"
import { useAuth } from "../../contexts/AuthContext"
import "./style.css"
import { useNav } from "../../contexts/NavContext"
import { useUrl } from "../../contexts/UrlContext"

export default function Add() {
  const { setUrl } = useUrl()
  const { setActive } = useNav()
  const { currentUser, currProfileImage } = useAuth()
  const addimageRef = useRef()
  const [progress, setProgress] = useState(false)
  const [addimageupload, setAddimageupload] = useState("")
  const [currUrl, setCurrUrl] = useState("")
  const [classPreview, setclassPreview] = useState("previewAdd")

  var fileuploadImage
  async function handleSubmitProfile(e) {
    e.preventDefault()
    const uploadTask = storage
      .ref(`images/${currentUser.uid}-${new Date().getTime()}`)
      .put(addimageupload)
    uploadTask.on("state_changed", (error) => {
      console.log(error)
    })
    const refImages = db.ref("images/")
    refImages.push({
      image: currUrl,
      username: currentUser.displayName,
      profileImage: currProfileImage,
      id: currentUser.uid,
    })
    setProgress(true)

    uploadAnimation()
  }

  async function preview(e) {
    setProgress(false)
    fileuploadImage = await e.target.files[0]
    setAddimageupload(e.target.files[0])
    var reader
    reader = new FileReader()
    reader.onload = function () {
      setCurrUrl(reader.result)
    }
    try {
      reader.readAsDataURL(fileuploadImage)
    } catch (e) {
      console.log(e)
    }
  }

  function uploadAnimation() {
    setclassPreview("previewAdd2")
    setUrl(currUrl)
    setActive("home")
    setTimeout(function () {
      setCurrUrl("")
      setTimeout(function () {
        setUrl("")
        setTimeout(function () {
          setActive("add")
        }, 700)
      }, 1200)
    }, 1000)
    setProgress(true)
    return
  }

  return (
    <div className="divAdd">
      {currUrl && (
        <div className={classPreview}>
          <img src={currUrl} className="previewAddimg" alt="upload" />
        </div>
      )}

      <form className="addform" onSubmit={handleSubmitProfile}>
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
          ref={addimageRef}
          onChange={preview}
          id="file-upload"
        ></input>
        {progress && (
          <p
            style={{
              color: "#69aa5e",
            }}
          >
            Image uploaded successfully
          </p>
        )}
        {currUrl && <button type="submit">Upload image</button>}
      </form>
    </div>
  )
}
