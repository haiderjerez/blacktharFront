import { Link } from "react-router-dom"

function Navbar() {
  return (
    <nav className="bg-primary-950 text-white shadow">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-xl font-bold">
            BlackThar
          </Link>
          <div className="flex items-center space-x-4">
            <Link to="/" className="hover:text-secondary-400">
              Home
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

