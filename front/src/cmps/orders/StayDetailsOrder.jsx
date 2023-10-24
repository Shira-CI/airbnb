import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DatePicker } from './DatePicker';
import { useState, useEffect } from 'react'

import { useLocation, useSearchParams, useNavigate } from 'react-router-dom'
import { utilService } from '../../services/util.service';
import { GuestOrderSelect } from './GuestOrderSelect';
import { ReserveButton } from './ReserveButton';
import { StayPreviewStar } from '../StayPreviewStar';
import { StayReviewsOrder } from '../details/StayReviewsOrder';



export function StayDetailsOrder({ stay, setOpenTab, openTab }) {
    const location = useLocation()
    // const [toValue, setToValue] = useState('')
    // const [fromValue, setFromValue] = useState('')
    // const [selected, setSelected] = useState([])

    let [searchParams, setSearchParams] = useSearchParams(new URLSearchParams(location.search))
    const cleaningFee = 6
    const serviceFee = 15

    const [updatedsearchParams, setUpdatedsearchParams] = useState(
        {
            checkIn: '',
            checkOut: '',
            guests: {
                adults: 1,
                children: 0,
                infants: 0,
                pets: 0,
            },
        }
    )


    const navigate = useNavigate()
    const params = Object.fromEntries(searchParams.entries())
    const guestsFromParams = (params.guests) ? JSON.parse(params.guests) : 1
    // console.log('params ', params)
    // console.log('updatedsearchParams ', updatedsearchParams)


    useEffect(() => {
        setUpdatedsearchParams(orderParams)
    }, [])


    const orderParams = {
        checkIn: params.checkIn
            ? (+params.checkIn)
            : '',
        checkOut: params.checkOut
            ? (+params.checkOut)
            : '',
        guests: {
            adults: +guestsFromParams.adults || 1,
            children: +guestsFromParams.children || 0,
            infants: +guestsFromParams.infants || 0,
            pets: +guestsFromParams.pets || 0,
        }
    }


    function setCheckInOutButtons(type) {
        const buttonText = (updatedsearchParams[type])
            ? (new Date(updatedsearchParams[type])).toLocaleDateString() : 'Add date'
        return buttonText
    }

    function onReserveBtn() {
        const paramsForBookingGuests = JSON.stringify(updatedsearchParams.guests)
        navigate(`/book/${stay._id}?checkIn=${updatedsearchParams.checkIn}&checkOut=${updatedsearchParams.checkOut}&guests=${paramsForBookingGuests || 1}&stayName=${stay.name}`)

    }

    function onChangeDates(value) {
        const updatedCheckIn = new Date(value.checkIn).getTime()
        const updatedCheckOut = new Date(value.checkOut).getTime()
        setUpdatedsearchParams(prevParams => ({ ...prevParams, checkIn: updatedCheckIn, checkOut: updatedCheckOut }))

        // onChangeDates({ checkIn: range.from, checkOut: range.to })

    }

    function onSetField(field, value) {
        if (field === 'guests') {
            // console.log(value)
            searchParams.set('adults', value.adults)
            searchParams.set('children', value.children)
            searchParams.set('infants', value.infants)
            searchParams.set('pets', value.pets)
        }
        if (field === 'checkIn' || field === 'checkOut') {
            if (value) {
                value = value.getTime()
            }
            // orderParams[field] = value
        }

        setSearchParams(searchParams)
        setUpdatedsearchParams(prevParams => ({ ...prevParams, [field]: value }))
    }


    function getGuestsCount() {
        const guestsCount = Object.values(updatedsearchParams.guests)
            .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        // console.log('guestsCount' , guestsCount)
        return guestsCount
    }


    function getTotalNightsCount() {
        return +utilService.totalDays(updatedsearchParams.checkIn, updatedsearchParams.checkOut)
    }

    function getTotalNightsPrice() {
        return Math.floor((getTotalNightsCount() * stay.price))

    }

    function getTotalCleaningFee() {
        return Math.floor((cleaningFee * getTotalNightsPrice()) / 100)
    }

    function getTotalServiceFee() {
        return Math.floor((serviceFee * getTotalNightsPrice()) / 100)
    }

    function getTotalPrice() {
        const totalNightsPrice = getTotalNightsPrice()
        const TotalServices = getTotalServiceFee() + getTotalCleaningFee()
        const totalPrice = Math.floor(totalNightsPrice + TotalServices)
        return totalPrice
    }
    const guestsCountWords = getGuestsCount() > 1 ? 'guests' : 'guest'

    return (
        <section className='order-modal'>

            {/*///// HEADER AND DATES //////*/}
            <section className='user-prefs'>
                <section className='order-modal-header'>

                    <section className='price-per-night'>
                        <span className='price'>${stay.price}</span>
                        <span className='word-night'>night</span>
                    </section>

                    <span className='stay-rate'>
                        <StayPreviewStar reviews={stay.reviews} />
                        <span>·</span>
                        <span className='stay-rate-reviews'>
                            <StayReviewsOrder reviews={stay.reviews} />
                            </span>
                    </span>

                </section>

                {/*///// DATE PICKER //////*/}
                <section className='dates-guests-container'>
                    {(openTab === 'checkIn' || openTab === 'checkOut') && (           //calander open
                        <section className='date-picker-container'>
                            <section className='date-picker-header'>
                                {(updatedsearchParams.checkIn && updatedsearchParams.checkOut) ? (<h4>{utilService.totalDays(updatedsearchParams.checkIn, updatedsearchParams.checkOut)} nights</h4>) : <h4>Select dates</h4>}
                                {(updatedsearchParams.checkIn && updatedsearchParams.checkOut) ? (<h5>{utilService.ShortFormattedDate(updatedsearchParams.checkIn)}-{utilService.ShortFormattedDate(updatedsearchParams.checkOut)}</h5>) : <h5>Add your travel dates for exact pricing</h5>}
                            </section>
                            <DatePicker
                                setUpdatedsearchParams={setUpdatedsearchParams}
                                checkIn={updatedsearchParams.checkIn}
                                checkOut={updatedsearchParams.checkOut}
                            />

                            <section className='open-picker-btns'>
                                {/* <button className='clear-open-picker-btn' onClick={() => { onSetField('checkIn', ''); onSetField('checkOut', '') }}>Clear dates</button> */}
                                <button className='close-open-picker-btn' onClick={() => setOpenTab('')}>Close</button>

                            </section>
                        </section>

                    )}
                    <section className={(openTab === 'checkIn' || openTab === 'checkOut') ? 'picker-btns active' : 'picker-btns'}   >
                        <button
                            onClick={() => setOpenTab('checkIn')}
                            className='check-in-btn'>
                            <div className='order-heading'>CHECK-IN</div>
                            <span>{setCheckInOutButtons('checkIn')}</span>
                        </button>

                        <button
                            onClick={() => setOpenTab('checkOut')}
                            className='check-out-btn'>
                            <div className='order-heading'>CHECK-OUT</div>
                            <span>{setCheckInOutButtons('checkOut')}</span>

                        </button>
                    </section>
                    {/*///// GUESTS//////*/}

                    <section className='guests'>
                        <section className='guests-close'  onClick={() => (openTab === 'guests' ? setOpenTab(null) : setOpenTab('guests'))}>
                            <span className='order-heading'>GUESTS</span>
                            <span className='guests-count guests-btn'>
                                <span className='guests-count'  >
                                    {getGuestsCount()}
                                    <span className='guests-count-span'> {guestsCountWords} </span>
                                </span>
                            </span>
                            </section>
                            {openTab === 'guests' && (
                                <section className="guests-open">
                                    <GuestOrderSelect
                                        guests={updatedsearchParams.guests}
                                        onSetField={onSetField}
                                        setOpenTab={setOpenTab}
                                    />
                                </section>
                            )}
                     
                    </section>
                </section>

                {/*///// BUTTONS //////*/}
                <section className='order-modal-btns'>
                    {(!updatedsearchParams.checkIn || !updatedsearchParams.checkOut) && (
                        <ReserveButton children={'Check availability'} onClick={() => setOpenTab('checkIn')} />
                    )}
                    {(updatedsearchParams.checkIn && updatedsearchParams.checkOut) &&
                        <ReserveButton children={'Reserve'} onClick={onReserveBtn} />
                    }
                </section>


            </section>



            {/*///// CHARGE MSG //////*/}
            {(updatedsearchParams.checkIn && updatedsearchParams.checkOut) &&
                <section className='after-date-set'>
                    <section className='no-charge-msg'>
                        You won't be charged yet
                    </section>

                    {/*///// PRICE SUMMARY //////*/}
                    <section className='price-summary'>

                        <section className='nigths-price-calc'>
                            <span>${stay.price} x {getTotalNightsCount()} nights </span>
                            <span>${getTotalNightsPrice()}</span>
                        </section>
                        {/* <p>Cleaning fee <span>{getTotalCleaningFee()}</span></p> */}
                        <section className='fees'>
                            <span>Cleaning fee</span>
                            <span>${getTotalCleaningFee()}</span>
                        </section>
                        <section className='fees'>
                            <span>Airbnb service fee</span>
                            <span>${getTotalServiceFee()}</span>
                        </section>
                        <section className='total-price'>
                            <span>Total</span>
                            <span>${getTotalPrice()}</span>


                        </section>
                    </section>
                </section>
            }
        </section>
    )
}