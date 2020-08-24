import React, { useContext, useState } from 'react'
import { Link } from "react-router-dom";
import { AuthContext } from '../../context/AuthProvider'
import {app} from '../../firebase'
import { useTranslation } from 'react-i18next';

import './navbar.css'
import logo from '../../util/circle.png'

const signOut = () => app.auth().signOut()

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [lng, setLng] = useState('en')
  const { currentUser } = useContext(AuthContext)

  const changeLanguage = lng => {
    i18n.changeLanguage(lng);
    setLng(lng)
  };

  return (
    <nav className='navbar'>
      <ul>
        <li>
          <span className={lng === 'en' ? 'active' : ''} onClick={() => changeLanguage('en')}>English</span>
          |
          <span className={lng === 'pl' ? 'active' : ''} onClick={() => changeLanguage('pl')}>Polish</span>
        </li>
        <li>
          <Link to="/program">{t('navbar.program')}</Link>
        </li>
        <li>
          <Link to="/artists">{t('navbar.artists')}</Link>
        </li>
        <li>
          <Link to="/place">{t('navbar.place')}</Link>
        </li>
        <li>
          <Link to="/"><img className='navbar_logo' src={logo} alt='logo' /></Link>
        </li>
        <li>
          <Link to="/tickets">{t('navbar.tickets')}</Link>
        </li>
        <li>
          <Link to="/faq">{t('navbar.faq')}</Link>
        </li>
        <li>
          <Link to="/contact">{t('navbar.contact')}</Link>
        </li>
        {!currentUser ?
        <>
          <li>
            <Link to="/login">{t('navbar.login')}</Link>
          </li>
          <li>
            <Link to="/register">{t('navbar.register')}</Link>
          </li>
        </>
        :
        <>
          <li>
            <Link to="/profile">{t('navbar.profile')}</Link>
          </li>
          <li>
            <button onClick={() => signOut()}>{t('navbar.logout')}</button>
          </li>
        </>
        }
      </ul>
    </nav>
  )
}

export default Navbar
