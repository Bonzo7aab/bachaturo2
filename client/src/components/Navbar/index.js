import React from 'react'
import { Link } from "react-router-dom";
import './navbar.css'

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">HomeIMG</Link>
        </li>
        <li>
          <Link to="/contact">News</Link>
        </li>
        <li>
          <Link to="/contact">Artists</Link>
        </li>
        <li>
          <Link to="/contact">Program</Link>
        </li>
        <li>
          <Link to="/contact">Place</Link>
        </li>
        <li>
          <Link to="/contact">tickets</Link>
        </li>
        <li>
          <Link to="/contact">FAQ</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
