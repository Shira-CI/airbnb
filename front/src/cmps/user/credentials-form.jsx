import { userService } from "../../services/user.service.js"

import { useEffect, useState } from 'react'
import { signup } from "../../store/user.action.js"

export function CredentialsForm({ onSubmit  }) {
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
            <button>{isSignUp ? "Sign up" : "Log in"}</button>
        </form>
        {!isSignUp &&
            <button onClick={()=> setIsSignUp(true)}>Sign up</button>
        }
        </section>
    )
}