import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import { BrowserRouter as Router } from "react-router-dom"
import { AuthProvider } from "./contexts/AuthContext"
import { NavProvider } from "./contexts/NavContext"
import { UrlProvider } from "./contexts/UrlContext"

ReactDOM.render(
  <Router>
    <NavProvider>
      <AuthProvider>
        <UrlProvider>
          <App />
        </UrlProvider>
      </AuthProvider>
    </NavProvider>
  </Router>,
  document.getElementById("root"),
)
