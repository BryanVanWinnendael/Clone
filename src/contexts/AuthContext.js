import React, { useContext, useState, useEffect } from "react"
import { auth, dbn, storage, db } from "../util/firebaseapp"
import DefaultProfileImage from "../assets/default.png"

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [currProfileImage, setCurrProfileImage] = useState()

  const [loading, setLoading] = useState(true)

  async function removePhoto(url) {
    const refImages = db.ref("images")
    refImages.on(
      "value",
      (snapshot) => {
        var data = snapshot.val()

        for (var i in data) {
          if (data[i].image === url) {
            console.log(i)

            const image = db.ref("images/" + i)
            console.log(image)

            image
              .remove()
              .then(() => {
                console.log("removed")
              })
              .catch(() => {
                console.log("errpr")
              })
          }
        }
      },
      (errorObject) => {
        console.log("The read failed: " + errorObject.name)
      },
    )

    console.log()
  }

  async function signup(email, password, username) {
    try {
      await auth
        .createUserWithEmailAndPassword(email, password)
        .then(function (res) {
          res.user.updateProfile({
            displayName: username,
          })
        })
        .then(function () {
          auth.onAuthStateChanged((user) => {
            const USERID = user.uid
            setName(username, USERID)
          })
        })
    } catch (err) {
      throw err
    }
  }

  function setName(name, uid) {
    dbn.collection("displayname").doc(uid).set({
      name,
    })
  }

  async function getNames() {
    var res = []
    const snapshot = await dbn.collection("displayname").get()
    const arr = snapshot.docs.map((doc) => doc.data())

    for (var i of arr) {
      res.push(i.name)
    }
    return res
  }

  async function login(email, password) {
    try {
      await auth.signInWithEmailAndPassword(email, password)
    } catch (err) {
      throw err
    }
  }

  function logout() {
    auth.signOut()
  }

  function resetPassword(email) {
    try {
      console.log(email)

      return auth.sendPasswordResetEmail(email)
    } catch (e) {
      throw e
    }
  }

  async function getProfileImageById(id) {
    try {
      const ProfileImagesStorage = await storage
        .ref(`ProfileImages/${id}`)
        .child("profileImage")
        .getDownloadURL()
      return ProfileImagesStorage
    } catch (e) {
      return DefaultProfileImage
    }
  }

  function setProfileImage(imgUrl) {
    try {
      currentUser.updateProfile({
        photoURL: imgUrl,
      })
      setCurrProfileImage(imgUrl)
    } catch (e) {
      throw e
    }
  }

  function updateEmail(email) {
    try {
      return currentUser.updateEmail(email)
    } catch (e) {
      throw e
    }
  }

  function updatePassword(password) {
    try {
      return currentUser.updatePassword(password)
    } catch (e) {
      throw e
    }
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      try {
        setCurrentUser(user)
        if (user && user.photoURL) setCurrProfileImage(user.photoURL)
        else setCurrProfileImage(DefaultProfileImage)
        setLoading(false)
      } catch (e) {
        console.log(e)
      }
    })
    return unsubscribe
  }, [])

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    currProfileImage,
    setProfileImage,
    setName,
    getNames,
    getProfileImageById,
    removePhoto,
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
