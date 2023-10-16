import {useState, useEffect} from 'react'

import styles from "./Register.module.css"

const Register = () => {
  return (
    <div>
      <h1>Register to start managing your tasks</h1>
      <form>
        <label>
          <span>Name:</span>
          <input 
            type="text" 
            name="displayName" 
            required 
            placeholder="Username" 
          />
        </label>
        <label>
          <span>E-mail:</span>
          <input 
            type="email" 
            name="email" 
            required 
            placeholder="User E-mail" 
          />
        </label>
        <label>
          <span>Password:</span>
          <input 
            type="password" 
            name="password" 
            required 
            placeholder="Insert your password" 
          />
        </label>
        <label>
          <span>Password confirmation:</span>
          <input 
            type="password" 
            name="confirmPassword" 
            required 
            placeholder="Confirm your password" 
          />
        </label>
        <button className="btn">Register</button>
      </form>
    </div>
  )
}

export default Register