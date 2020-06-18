import React, { useContext } from 'react'
import { Link } from "react-router-dom";
import { AuthContext } from '../firebase/AuthProvider'
import app from '../firebase/firebase'

import './navbar.css'
import logo from '../../util/circle.png'

const signOut = () => app.auth().signOut()

const Navbar = () => {
  const { currentUser } = useContext(AuthContext)
  return (
    <nav>
      <ul>
        <li>
          <Link to="/"><img className='navbar_logo' src={logo} alt='logo' /></Link>
        </li>
        <li>
          <Link to="/program">Program</Link>
        </li>
        <li>
          <Link to="/artists">Artists</Link>
        </li>
        <li>
          <Link to="/place">Place</Link>
        </li>
        <li>
          <Link to="/tickets">Tickets</Link>
        </li>
        <li>
          <Link to="/faq">FAQ</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        {!currentUser ?
        <li>
          <Link to="/login">Login</Link>
        </li>
        : null}
        <li>
          <Link to="/register">Register</Link>
        </li>
        {currentUser ?
        <>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <button onClick={() => signOut()}>Logout</button>
          </li>
        </>
        : null }
      </ul>
    </nav>
  )
}

export default Navbar
