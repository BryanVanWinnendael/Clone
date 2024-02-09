import { useState, useEffect } from "react"
import settingsimg from "../../assets/setting.svg"
import { useAuth } from "../../contexts/AuthContext"
import "./style.css"
import Settings from "./Settings"
import { db } from "../../util/firebaseapp"
import ImageCard from "../ImageCard"

export default function Index() {
  const [buttonPopupSettings, setbuttonPopupSettings] = useState(false)
  const { currProfileImage } = useAuth()
  const [imagesToLoad, setImagesToLoad] = useState()
  const { currentUser } = useAuth()

  useEffect(() => {
    if (!imagesToLoad) {
      const refImages = db.ref("images")
      refImages.on(
        "value",
        (snapshot) => {
          var data = snapshot.val()
          var images = []

          for (var i in data) {
            if (currentUser.displayName === data[i].username) {
              var image = data[i].image
              var username = data[i].username
              var profileImage = data[i].profileImage
              var id = data[i].id
              images.unshift({ image, username, profileImage, id })
            }
          }
          setImagesToLoad(images)
        },
        (errorObject) => {
          console.log("The read failed: " + errorObject.name)
        },
      )
    }
  }, [currentUser.displayName, imagesToLoad])

  return (
    <div>
      <img alt="profile" src={currProfileImage} className="profileimg" />

      <div className="yourPhotosBox">
        {imagesToLoad
          ? imagesToLoad.map((image, index) => (
              <ImageCard imageToShow={image} deletable={true} />
            ))
          : ""}
      </div>
      <img
        src={settingsimg}
        className="settingsimg"
        onClick={() => setbuttonPopupSettings(true)}
        alt="settings"
      />
      <Settings
        trigger={buttonPopupSettings}
        setTrigger={setbuttonPopupSettings}
      />
    </div>
  )
}
