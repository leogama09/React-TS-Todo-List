import {NavLink} from "react-router-dom"

import { useAuthentication } from "../hooks/useAuthentication"

import { useAuthValue } from "../context/AuthContext"

import styles from './Navbar.module.css'

const Navbar = () => {
  const {user} = useAuthValue()
  const {logout} = useAuthentication()

  return (
    <nav className={styles.navbar}>
      <NavLink to="/" className={styles.brand}>
        <h1>Task Manager</h1>
      </NavLink>
      <ul className={styles.links_list}>
        {!user && (
          <>
            <li>
              <NavLink 
                to="/"
                className={({isActive}) => (isActive ? styles.active : "")}
                >Sign In</NavLink>
            </li>
            <li>
              <NavLink 
                to="/register"
                className={({isActive}) => (isActive ? styles.active : "")}
                >Sign Up</NavLink>
            </li>
          </>
        )}
        {user && (
          <>
            <li>
              <NavLink 
                to="/dashboard"
                className={({isActive}) => (isActive ? styles.active : "")}
              >Dashboard</NavLink>
            </li>
          </>
        )}
        <li>
          <NavLink 
            to="/about"
            className={({isActive}) => (isActive ? styles.active : "")}
            >About</NavLink>
        </li>
        {user && (
          <li>
            <NavLink to="/">
              <button onClick={logout}>Sign Out</button>
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  )
}

export default Navbar