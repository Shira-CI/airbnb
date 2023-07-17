import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { LoginModal } from './LoginModal'
import React from 'react'

export function UserMenuOpen({ user, onOpenModal, onLogout }) {

    const userMenuRef = useRef()


    return (
        <React.Fragment>
            <section ref={userMenuRef} className="user-menu-modal">
                {!user ? (
                    <section className='menu-links'>
                        <Link onClick={(e) => onOpenModal(e, 'login-modal', false)} data-modal="login-modal" className="login-modal">
                            Log in
                        </Link>
                        <Link onClick={(e) => onOpenModal(e, 'login-modal', true)} data-modal="login-modal" className="login-modal">
                            Sign up
                        </Link>
                        {/* <Link onClick={(e) => onOpenModal(e, 'signup-modal', true)} data-modal="signup-modal" className="signup-modal">
                            Sign up
                        </Link> */}
                    </section>

                ) : (
                    <section className='menu-links'>
                        <Link className='trips-link' to='/trip'>Trips</Link>
                        <Link className='rent-link' to='/rent'>Orders</Link>
                        {/* <Link to='/user/inbox'>Messages</Link> */}

                    <button className='logout' onClick={onLogout}>
                        Log out
                    </button>

                    </section>)
                }


            </section>


        </React.Fragment>
    )
}