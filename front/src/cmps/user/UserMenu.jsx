import React, { useEffect } from 'react'
import { useState } from "react"
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { UserMenuOpen } from "./UserMenuOpen"
import { LoginModal } from "./LoginModal"
import { logout } from "../../store/user.action"
import { showErrorMsg, showSuccessMsg } from "../../services/event-bus.service"


export function UserMenu() {
    const user = useSelector((storeState) => storeState.userModule.user)
    const navigate = useNavigate()
    // console.log(user)

    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        setIsLoggedIn(user)
    }, [user])

    // console.log(isLoggedIn)
    async function onLogout() {
        try {
            navigate('/')
            await logout()
            showSuccessMsg(`Bye now`)
            console.log('logout')
        } catch (err) {
            showErrorMsg('Cannot logout')
        }
    }


    function onChangeLoginStatus(user) {
        // setUser(user)
    }

    const onOpenModal = (event, modal, boolean) => {
        event.preventDefault()
        if (modal === 'login-modal') {
            // setIsSignup(boolean)
            setIsLoginModalOpen(true)
        }
    }

    const onCloseModal = () => {
        setIsLoginModalOpen(false)
    }

    function toggleUserMenu() {
        setIsUserMenuOpen((prev) => !prev)
    }

    return (
        <React.Fragment>

            <div onClick={toggleUserMenu} className="login-header-btn">
                <div className="login-burger"> </div>
                <div className="login-user-pic-container">

                    {isLoggedIn && 
                        user &&
                        user.imgUrl &&
                        <section className='login-user-pic' >
                          <img src={user.imgUrl} alt="" />  
                        </section>
                    }
                </div>
                {isUserMenuOpen && <UserMenuOpen onOpenModal={onOpenModal} user={user} onLogout={onLogout} />}
            </div>

            <section className='signing-modals'>
                <LoginModal isLoginModalOpen={isLoginModalOpen} onCloseModal={onCloseModal}
                    onChangeLoginStatus={onChangeLoginStatus} />
            </section>

        </React.Fragment>
    )
}