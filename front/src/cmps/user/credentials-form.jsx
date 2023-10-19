import { userService } from "../../services/user.service.js"

import { useEffect, useState } from 'react'
import { signup } from "../../store/user.action.js"
import {ReserveButton} from '../orders/ReserveButton.jsx'

export function CredentialsForm({ onSubmit, onCloseModal  }) {
    const [isSignUp , setIsSignUp]= useState(false)

    const [credentials, setCredentials] = useState(userService.getEmptyCredentials())

    function handleChange({ target }) {
        const { name: field, value } = target
        setCredentials(prevCreds => ({ ...prevCreds, [field]: value }))
    }

    function handleSubmit(ev) {
        ev.preventDefault()
        onSubmit(credentials , isSignUp)
    }

    return (
        <section className="login"> 

        <form className="login-form" onSubmit={handleSubmit}>
            <div className="user-details">
            <input
                type="text"
                name="username"
                placeholder="Username"
                onChange={handleChange}
                required
                autoFocus
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                required
            />
            {isSignUp && <input
                type="text"
                name="fullname"
                placeholder="Full name"
                onChange={handleChange}
                required
            />}
            </div>
            <button className="login-signup-btn">{isSignUp ? "Sign up" : "Log in"}</button>
        </form>
        {!isSignUp &&
            <button onClick={()=> setIsSignUp(true)} className="signup-btn">Sign up</button>
        }
        <ReserveButton children={'DEMO login'} className="demo-login-btn"/>

        </section>
    )
}