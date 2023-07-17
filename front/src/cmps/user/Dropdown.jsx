import React, { useState } from 'react'
import {BsThreeDotsVertical} from 'react-icons/bs'

export function Dropdown ({onRemoveOrder, order}){
    const [isOpen, setIsOpen] = useState(false)
    // console.log(isOpen)
    const toggleDropdown = () => {
        setIsOpen(!isOpen)
    };

    return (
        <div className="dropdown">
            <button className="dropdown-toggle" onClick={toggleDropdown}>
                <BsThreeDotsVertical/>
                {/* <span className={`arrow-down ${isOpen ? ' open' : ''}`}></span> */}
                {/* <span className="arrow-down"></span> */}
            </button>
            {isOpen && (
                <ul className="dropdown-menu">
                    <li onClick={() => onRemoveOrder(order)}>Delete
                    {/* <li> <button className='delete-order-btn' onClick={() => onRemoveOrder(order)}>Delete order</button> */}
                    </li>
                    {/* <li>Option</li> 
                    <li>Option</li>  */}
                </ul>
            )}
        </div>
    )
}

