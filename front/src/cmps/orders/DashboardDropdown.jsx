import React, { useState } from 'react'

import { BsThreeDotsVertical } from 'react-icons/bs'



export function DashDropdown({ handleOrderChange, order }) {
    const [isOpen, setIsOpen] = useState(false)
    // console.log(isOpen)
    const toggleDropdown = () => {
        setIsOpen(!isOpen)
    };

    return (
        <div className="">
            <button className="dropdown-toggle" onClick={toggleDropdown}>
                <BsThreeDotsVertical />

                {/* <span className={`arrow-down ${isOpen ? ' open' : ''}`}></span> */}
                {/* <span className="arrow-down"></span> */}
            </button>
            {isOpen && (

                <ul className="dropdown-menu">
                    <li onClick={() => handleOrderChange(order._id, 0)}>Decline
                        {/* <li> <button className='delete-order-btn' onClick={() => onRemoveOrder(order)}>Delete order</button> */}
                    </li>
                    {/* <li>Option</li>  */}
                    {/* <li>Option</li>  */}
                </ul>
            )}
        </div>
    )
}

