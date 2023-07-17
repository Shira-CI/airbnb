
import { StayReviewsStat } from '../cmps/details/StayReviewsStat'
import goback from '../assets/img/common/goback.svg'
import priceTag from '../assets/img/common/priceTag.svg'
import { Loader } from '../cmps/Loader'

import { useLocation, useParams, useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { stayService } from "../services/stay.service"
import { orderService } from '../services/order.service'
import { utilService } from '../services/util.service'
import { LoginSignup } from '../cmps/user/LoginSignup'
import { userService } from '../services/user.service'
import { setFooterToDisplay } from '../store/stay.actions.js'
import { Payments } from '../cmps/orders/Payments'
import { ReserveButton } from '../cmps/orders/ReserveButton'


export const Book = () => {
  const [stay, setStay] = useState(null)
  // const { stayId } = useParams()

  const { stayId } = useParams()
  const [order, setOrder] = useState(null)
  const [isBooked, setIsBooked] = useState(false)
  const [localUser, setLocalUser] = useState(null)
  const [orderToSave, setOrderToSave] = useState(null)
  const [isPayments, setIsPayments] = useState(null)
  // console.log(isPayments)
  const location = useLocation()
  const navigate = useNavigate()
  const user = useSelector((state) => state.userModule.user)

  const searchParams = new URLSearchParams(location.search)
  const { checkIn, checkOut, guests, stayName } = Object.fromEntries(searchParams.entries())
  const cleaningFee = 6
  const serviceFee = 15


  useEffect(() => {
    async function loadData() {
      const userFromDb = await loadUser()
      loadOrderDetails()
    }
    loadData()
  }, [user])


  useEffect(() => {
    getStay()
    setFooterToDisplay(false)
  }, [])

  useEffect(() => {
    if (!orderToSave) return
    updateUserDb()
  }, [orderToSave])




  async function onConfirmBtn() {
    try {
      await saveOrder()
      setIsBooked(true)
    } catch (err) {
      console.log('Had issues in booking', err);
    }
  }


  async function saveOrder() {
    try {
      const addedOrder = await orderService.save(order)
      setOrderToSave(addedOrder)
      console.log(addedOrder)
    } catch (err) {
      console.log('Had issues in booking', err)
    }
  }


  async function updateUserDb() {

    try {
      // const updatedUser = { ...localUser, orders: [...localUser.orders, orderToSave] }
      const updatedUser = { ...localUser, orders: [orderToSave, ...localUser.orders] }
      setLocalUser(updatedUser)
      const savedUser = await userService.update(updatedUser)
      // console.log('savedUser', savedUser)
      console.log('User DB updated')

    } catch (err) {
      console.log('Had issues in updating user', err)
    }
  }


  async function loadUser() {
    try {
      if (!user) return
      const userFromDb = await userService.getById(user._id)
      setLocalUser(userFromDb)
    } catch (err) {
      console.log('Had issues in getting user', err)
    }
  }

  async function loadOrderDetails() {
    try {
      const stay = await stayService.getById(stayId)
      const orderToSet = handleOrder(stay)
      setOrder(orderToSet)
      // if(user) setLocalUser((prevUser) => ({ ...prevUser, orders: [...prevUser.orders, orderToSet] }))
    } catch (err) {
      console.log('Had issues loading reservation', err)
    }
  }

  function handleOrder(stay) {
    const orderToSet = orderService.getEmptyOrder()
    orderToSet.stayId = stayId
    orderToSet.stayName = stayName
    orderToSet.stayImgUrl = stay.imgUrls[0]
    orderToSet.hostId = stay.host._id
    orderToSet.guests = JSON.parse(guests)
    orderToSet.startDate = +checkIn || Date.now()
    orderToSet.endDate = +checkOut || Date.now() + 1000 * 60 * 60 * 24
    orderToSet.totalDays = +utilService.totalDays(orderToSet.startDate, orderToSet.endDate)
    orderToSet.nightsPrice = +(orderToSet.totalDays * stay.price).toFixed(2)
    orderToSet.serviceFee = +((serviceFee * orderToSet.nightsPrice) / 100).toFixed(2)
    orderToSet.cleaningFee = +((cleaningFee * orderToSet.nightsPrice) / 100).toFixed(2)
    orderToSet.totalPrice = +(orderToSet.nightsPrice + orderToSet.cleaningFee + orderToSet.serviceFee).toFixed(2)
    orderToSet.renter = user || ''
    orderToSet.createdAt = +new Date()
    return orderToSet
  }

  function onMyTripsBtn() {
    navigate(`/trip`)
  }

  function getGuestsCount() {
    const guestsCount = Object.values(order.guests)
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    // console.log('guestsCount' , guestsCount)
    return guestsCount
  }

  async function getStay() {
    const stay = await stayService.getById(stayId)
    setStay(stay)
  }


  function onGoBack() {
    window.history.go(-1);

  }


  function getPaymentsValue() {
    return ((order.totalPrice) / 2).toFixed(2)
  }

  function getSecondPaymenDate() {
    const oneMonthFromToday = new Date()
    oneMonthFromToday.setMonth(oneMonthFromToday.getMonth() + 1)
    const formattedDate = oneMonthFromToday.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
    return formattedDate
  }

  function getFormattedDate(timestamp) {
    const date = new Date(timestamp)
    const options = { year: 'numeric', month: 'short', day: 'numeric' }
    return date.toLocaleDateString('en-US', options)
  }


  if (!stay || !order) return <Loader />
  const { name, type, imgUrls, reviews } = stay

  return (
    <div className="book-page-wrapper">
      <div className="book-details-header">
        {isBooked && (
          <section className='reservation-success'>
            <span className='confirm-header'> Reservation success!</span>
            <section onClick={onMyTripsBtn} className='my-trips-btn-container'>
              <a className="my-trips-btn" >
                Go to my trips
              </a>
              <button className='arrow-forward-trips'><img src={goback} alt="" /></button>
            </section>
          </section>
        )}

        {!isBooked && (
          <div>

            <button className='arrow-back-header' onClick={onGoBack}><img src={goback} alt="" /></button>
            <span className='confirm-header'>Confirm and pay</span>
          </div>
        )}
      </div>

      <section className='book-page-container'>
        <main className="book-page-main">

          <section className='good-price-section'>
            <span className='good-price-header'>  Good price.</span>
            <div className='good-price-content'>  Your dates are $35 less than the avg. nightly rate over the last 3 months.</div>
            <span className='price-tag-icon'><img src={priceTag} alt="" /></span>
          </section>
          
          <section className="book-details-wrapper">
            <div className="book-details">
              <div className='your-trip-header'>Your trip</div>
              <div className="book-details-trip-info">
                <div className="book-details-trip-date">
                  <div className="date-info">
                    <span className='date-info-header'>Dates</span>
                    <p>
                      {getFormattedDate(order.startDate)}-{' '}
                      {getFormattedDate(order.endDate)}
                      {/* {utilService.formattedDate(order.startDate)}  */}
                      {/* {utilService.formattedDate(order.endDate)} */}
                    </p>
                  </div>
                  <div className="book-details-edit">
                    <a href="#">Edit</a>
                  </div>
                </div>
                <div className="book-details-trip-guests">
                  <div className="guest-info">
                    <div className='guests-header'>Guests</div>

                    <div className="guest-info-content">

                      <span className='guest-count'>
                        {getGuestsCount()}
                      </span>
                      <span>guests</span>
                    </div>
                  </div>

                  <div className="book-details-edit">
                    <a href="#">Edit</a>
                  </div>
                </div>
              </div>

              {!isBooked && (
                <section>
              <hr className="custom-hr" />
               
             
              <Payments order={order} setIsPayments={setIsPayments} getPaymentsValue={getPaymentsValue} getSecondPaymenDate={getSecondPaymenDate} />
{/* 
              <div className='pay-with-container'>
                <div className='pay-with-header'>
                  Pay with
                </div>
              </div> */}
              </section>
               )}
              <div className='cancelation-policy'>
                <div className='cancelation-header'>
                  Cancellation policy
                </div>
                <span className='free-cancel'>
                  Free cancellation for 48 hours.
                </span>
                <span className='cancel-before'>
                  Cancel before {getSecondPaymenDate()} for a partial refund.
                </span>

              </div>
             

              <div className='rules-container'>
                <div className='rules-header'>
                  Ground rules
                </div>

                <section className='rules-content'>
                  We ask every guest to remember a few simple things about what makes a great guest.
                  <ul className='rules-list'>
                    <li> Follow the house rules</li>
                    <li>Treat your Host’s home like your own</li>
                  </ul>
                </section>
              </div>

              {user ? (
                !isBooked &&
                <section>
                  <div className='terms'> By selecting the button below, I agree to the 
                  Host's House Rules, Ground rules for guests, Airbnb's Rebooking and 
                  Refund Policy, Pay Less Upfront Terms, and that Airbnb can charge my payment method if I’m responsible for damage.
                  </div>
                  <section className='confirm-btn'>
                    <ReserveButton children={'Confirm and pay'} onClick={onConfirmBtn} />
                  </section>
                </section>

              ) : (
                <LoginSignup />
              )
              }

              <div className="book-terms"></div>
            </div>
          </section>
        </main>

        <div className="book-summary-details">
              
          <div className="order-details">

            <div className="order-details-header">

              <img className='stay-img' src={imgUrls[1]} alt="" />
            
              <div className="book-stay-basic-wrapper">
                <div className="order-details-header-text">
                  <div className="book-stay-basic">
                    <span className='stay-type'>{type}</span>
                    <div className='stay-name'>{name}</div>
                  </div>
                </div>
                <div className="book-stay-reviews">
                  <StayReviewsStat reviews={reviews} />
                </div>
              </div>
            </div>
            {/* <hr className="custom-hr" /> */}
            <div className="order-details-price-summary">
              <div className='price-details-header'>Price details</div>
              <div className="per-night-price-wrapper">
                <div className="per-night-price">
                  ${stay.price.toLocaleString()} x {order.totalDays} nights
                </div>
                <div className="sub-total-price">
                  <span>${order.nightsPrice}</span>
                </div>
              </div>

              <div className="service-fee-wrapper">
                <div className="service-fee">
                  <span>Airist service fee</span>
                </div>
                <div className="fee-price">
                  <span>${order.serviceFee}</span>
                </div>
              </div>
              <div className="service-fee-wrapper cleaning-fee-wrapper">
                <div className="service-fee cleaning-fee">
                  <span>Airist cleaning fee</span>
                </div>

                <div className="fee-price">
                  <span>${order.cleaningFee}</span>
                </div>
              </div>

              <div className="taxes-wrapper">
                <div className="taxes">
                  Taxes
                </div>
                <div className="fee-price-taxes">
                  <span>${order.cleaningFee}</span>
                </div>
              </div>

              {isPayments &&
                <div className="total-price-before-payments">
                  <div className="total-price-wrapper">
                    <span>Total <span className='currency'>(USD)</span></span>
                    <span>${order.totalPrice}</span>

                  </div>
                </div>
              }
            </div>



            {!isPayments ? (
              <div className="total-price">
                <div className="total-price-wrapper">
                  <span>Total <span className='currency'>(USD)</span></span>
                  <span>${order.totalPrice}</span>

                </div>
              </div>

            ) : (
              <div className="total-price-payments">
                <div className="payments-summary">

                  <section className='first-payment'>
                    <span>Due now </span>

                    <span>${getPaymentsValue()}</span>
                  </section>

                  <section className='second-payment'>
                    <span>Due <span>{getSecondPaymenDate()} </span>
                    </span>

                    <span>${getPaymentsValue()}</span>
                  </section>


                </div>
              </div>
            )

            }

          </div>


        </div>
      </section>


    </div>
  )
}
