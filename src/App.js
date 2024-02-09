import React from "react"
import "./App.css"
import Menu from "./components/Menu"
import Main from "./components/Main"
import { useAuth } from "./contexts/AuthContext"
import { usetheme } from "./util/theme"

function App() {
  const { currentUser } = useAuth()
  usetheme()
  return (
    <div className="App">
      {currentUser && <Main />}
      {!currentUser && <Menu />}
    </div>
  )
}

export default App
