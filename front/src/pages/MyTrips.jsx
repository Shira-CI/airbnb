import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { userService } from '../services/user.service'
import { orderService } from '../services/order.service'
import { Dropdown } from '../cmps/user/Dropdown'
import { Loader } from '../cmps/Loader'

import { setFooterToDisplay } from '../store/stay.actions.js'




export function MyTrips() {
    const user = useSelector((state) => state.userModule.user)
    const [localUser, setLocalUser] = useState(null)
    // console.log('localUser', localUser)

    useEffect(() => {
        setFooterToDisplay(false)
        loadUser()
    }, [user])



    async function loadUser() {
        if (!user._id) return
        try {
            const userFromDb = await userService.getById(user._id)
            setLocalUser(userFromDb)
            // console.log('userFromDb', userFromDb)
        } catch (err) {
            console.log('Had issues in getting user', err)
        }
    }

    async function onRemoveOrder(order) {
        await removeFromOrderCollection(order._id)
        await updateLocalUser(order)
        await updateUserDb()
    }

    async function updateLocalUser(order) {
        const userOrders = localUser.orders
        const idx = userOrders.indexOf(order)
        userOrders.splice(idx, 1)
        setLocalUser({ ...localUser, orders: userOrders })
    }

    async function updateUserDb() {
        try {
            const updatedUser = await userService.update(localUser)
            // console.log('updatedUser', updatedUser)
            console.log('User updated')
        } catch {
            console.log('Cannot remove order')
        }
    }



    async function removeFromOrderCollection(orderId) {
        // console.log(orderId)
        try {
            await orderService.remove(orderId)
            console.log('Order removed')
        }
        catch (err) {
            console.log('Cannot remove order')
        }
    }


    function getGuestsCount(guests) {
        const guestsCount = Object.values(guests)
            .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        // console.log('guestsCount' , guestsCount)
        return guestsCount
    }

    if (!localUser || !localUser.orders) return <Loader />

    return (
        <section className="my-trips-page">
            {(localUser.orders.length === 0) && <h2>No trips</h2>}

            {(localUser.orders.length > 0) &&
                <section className='orders'>
                    <h2 className="my-trips-header">Trips</h2>
                    <table className='my-trips-table'>
                        <thead>
                            <tr key="key">
                                <th key="key1" >Stay</th>
                                <th key="key1" ></th>
                                <th key="key4" >Guests</th>
                                <th key="key2" >Arrival</th>
                                <th key="key3" >Departure</th>
                                <th key="key5" > Total price</th>
                                <th className='status-th' key="key6">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {localUser.orders.map(order => {
                                const dynClass = order.status
                                // console.log(order)
                                return (
                                    <tr className='trip-row' key={order._id}>
                                        <td className='stay-name-td'> <span className='stay-name'> {order.stayName}</span></td>
                                        <td className='stay-img-td'> <div className='stay-img'> <img src={order.stayImgUrl} alt=""/> </div></td>
                                        <td className='guests-count-td'>{getGuestsCount(order.guests)}</td>
                                        <td>{new Date(order.startDate).toLocaleDateString('en-US')}</td>
                                        <td>{new Date(order.endDate).toLocaleDateString('en-US')}</td>
                                        <td className='total-price-td'>${order.totalPrice}</td>
                                        <td className='status-td'>
                                            <span className='status'>
                                                <span className={`colorful-dot ${dynClass}`}></span>

                                                {order.status}
                                            </span>
                                        </td>
                                        <td>
                                            <Dropdown order={order} onRemoveOrder={onRemoveOrder} />
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>

                </section>
            }



        </section >
    )
}