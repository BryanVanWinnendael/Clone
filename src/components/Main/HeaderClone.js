import "./style.css"
import { useAuth } from "../../contexts/AuthContext"

export default function HeaderClone({ param }) {
  const { currentUser } = useAuth()

  return (
    <header>
      {currentUser ? <p>{currentUser.displayName}</p> : <p>Clne</p>}
    </header>
  )
}
