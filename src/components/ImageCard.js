import React, { useState, useEffect } from "react"
import { useAuth } from "../contexts/AuthContext"
import DeleteIcon from "@mui/icons-material/Delete"

export default function ImageCard({ imageToShow, deletable = false }) {
  const { getProfileImageById, removePhoto } = useAuth()
  const [profileImage, setProfileImage] = useState()

  const deleteImage = () => {
    removePhoto(imageToShow.image)
  }

  useEffect(() => {
    async function getAllProfileImage() {
      const img = await getProfileImageById(imageToShow.id)
      setProfileImage(img)
    }
    getAllProfileImage()
  }, [getProfileImageById, imageToShow.id])

  return (
    <div className="ImageBox">
      <div
        style={{
          display: "flex",
          margin: "10px",
        }}
      >
        <img src={profileImage} className="profileimgOnBox" alt="profile" />

        <p className="displayUsername">{imageToShow.username}</p>
        {deletable && (
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <DeleteIcon
              sx={{
                width: "30px",
                height: "45px",
                cursor: "pointer",
              }}
              onClick={deleteImage}
            />
          </div>
        )}
      </div>

      {imageToShow && (
        <img
          src={imageToShow.image}
          className="pictureToLoad"
          id={imageToShow.id}
          alt="pictureToLoad"
        />
      )}
    </div>
  )
}
