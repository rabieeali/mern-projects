import { Link } from "react-router-dom"
import { Plus } from "./Plus"

export const Navbar = () => {
  return (
    <nav className="is-flex is-justify-content-space-between container">
      <Link to='/' className="button is-success is-light has-text-weight-bold">Crush List</Link>
      <Link to='add-crush' className="button is-bg-info has-background-success has-text-weight-bold has-text-white"><Plus /></Link>
    </nav>
  )
}
