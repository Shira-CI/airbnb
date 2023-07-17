import { useEffect } from "react"
import { useState } from "react"
import { orderService } from "../services/order.service.js"
import { DashDropdown } from "../cmps/orders/DashboardDropdown.jsx"
import { setFooterToDisplay } from '../store/stay.actions.js'
import MyBarChart from "../cmps/user/BarChart.jsx"
import MyPieChart from "../cmps/user/PieChart.jsx"
import MyDaysBarChart from "../cmps/user/BarChartDays.jsx"
import PieColoredChart from "../cmps/user/PieColoredChart.jsx"


export function MyRents() {
    const [orders, setOrders] = useState([])
    const [orderToChange, setOrderToChange] = useState(null)

    useEffect(() => {
        setFooterToDisplay(false)
        loadOrders()
    }, [])

    useEffect(() => {
        if (orderToChange) {
            orderService.save(orderToChange)
        }

    }, [orderToChange])


    async function loadOrders(filterBy = "") {
        const orders = await orderService.query(filterBy)

        setOrders(orders)

    }

    function getGuestsCount(guests) {
        const guestsCount = Object.values(guests)
            .reduce((accumulator, curorderValue) => accumulator + curorderValue, 0);
        return guestsCount
    }

    function findCurorderOrder(orderId) {
        const currOrder = orders.find(order => order._id === orderId)
        return currOrder
    }

    function handleOrderChange(orderId, descision) {
        console.log('handleOrederChange', orderId)
        const answer = descision ? 'Approved' : 'Canceled'
        const currOrder = findCurorderOrder(orderId)
        currOrder.status = answer
        setOrders(prevOrders =>
            prevOrders.map(order =>
                order._id === orderId ? { ...order, status: answer } : order
            )
        )
        setOrderToChange(currOrder)
    }



    return (
        <div className="my-orders">
            {(!orders || !orders.length) && <h2>Get help with getting Orders!</h2>}

            <section className='orders container'>
                <h2 className="orders-header">Statistics</h2>
                <div className="rent-headers">
                    <h2 className="table-header">Half-Yearly Revenue</h2>
                    <h2 className="table-header">Weekly Income</h2>
                </div>



                <section className="dash-info-container">

                    <section className="dash-info">
                        <MyBarChart orders={orders} />
                    </section>

                    <section className="dash-info ">
                        < PieColoredChart />
                    </section>

                    <section className="dash-info ">
                        <MyDaysBarChart orders={orders} />
                    </section>

                    <section className="dash-info ">
                        < MyPieChart />
                    </section>

                </section>


                <h2 className="table-header">My orders</h2>
                <table className='orders-table'>
                    <thead>
                        <tr key="key">
                            <th key="key1" >Property</th>
                            <th key="key2" >Arrival</th>
                            <th key="key3" >Departure</th>
                            <th key="key4" >Guests</th>
                            <th key="key5" >Total price</th>
                            <th key="key6" >Status</th>
                            <th className="actions-td" key="key7" >Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => {
                            const dynClass = order.status

                            return (
                                <tr key={order._id}>
                                    <td>{order.stayName}</td>
                                    <td>{new Date(order.startDate).toLocaleDateString('en-US')}</td>
                                    <td>{new Date(order.endDate).toLocaleDateString('en-US')}</td>
                                    <td className='guests-count-td'>{getGuestsCount(order.guests)}</td>
                                    <td>${order.totalPrice}</td>
                                    <td>
                                        <span className='status'>
                                            <span className={`colorful-dot ${dynClass}`}></span>

                                            {order.status}
                                        </span>


                                    </td>
                                    <td>
                                        <button className="approve-btn" onClick={() => handleOrderChange(order._id, 1)} >Approve</button>
                                    </td>
                                    <td className="drop-down">
                                        <DashDropdown order={order} handleOrderChange={handleOrderChange} />

                                    </td>
                                </tr>

                            )
                        })}
                    </tbody>
                </table>

            </section>



        </div>
    )
}