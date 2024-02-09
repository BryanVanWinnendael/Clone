import addimg from "../../assets/add.svg"
import homeimg from "../../assets/home.svg"
import userimg from "../../assets/user.svg"
import "./style.css"
import { useNav } from "../../contexts/NavContext"

export default function Nav() {
  const { active, setActive } = useNav()

  const handleCheck = (navigation) => {
    setActive(navigation)
  }

  return (
    <nav id="navId">
      <button
        className={active === "home" && "active"}
        onClick={() => handleCheck("home")}
      >
        <img alt="home" src={homeimg} className="iconnav" />
      </button>

      <button
        className={active === "add" && "active"}
        onClick={() => handleCheck("add")}
      >
        <img alt="add" src={addimg} className="iconnav" />
      </button>

      <button
        className={active === "user" && "active"}
        onClick={() => handleCheck("user")}
      >
        <img alt="user" src={userimg} className="iconnav" />
      </button>
    </nav>
  )
}
