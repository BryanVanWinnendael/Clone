import { useContext, useState, createContext } from "react"

const UrlContext = createContext()

export function useUrl() {
  return useContext(UrlContext)
}

export function UrlProvider({ children }) {
  const [url, setUrl] = useState("")

  const value = {
    url,
    setUrl,
  }

  return <UrlContext.Provider value={value}>{children}</UrlContext.Provider>
}
