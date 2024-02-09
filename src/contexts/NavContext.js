import { useContext, useState, createContext } from "react"

const NavContext = createContext()

export function useNav() {
  return useContext(NavContext)
}

export function NavProvider({ children }) {
  const [active, setActive] = useState("home")

  const value = {
    active,
    setActive,
  }

  return <NavContext.Provider value={value}>{children}</NavContext.Provider>
}
