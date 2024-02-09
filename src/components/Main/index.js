import Navbar from "../nav/Nav"
import { useNav } from "../../contexts/NavContext"
import User from "../User"
import Home from "../Home"
import Add from "../Add"
import PreviewAdd from "../Add/PreviewAdd"
import HeaderClone from "./HeaderClone"

export default function Index() {
  const { active } = useNav()

  return (
    <div>
      <HeaderClone />
      <PreviewAdd />
      {active === "home" && <Home />}
      {active === "user" && <User />}
      {active === "add" && <Add />}
      <Navbar />
    </div>
  )
}
