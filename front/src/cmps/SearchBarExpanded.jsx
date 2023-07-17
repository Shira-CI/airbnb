import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { stayService } from "../services/stay.service"
import { LocationSelect } from "./LocationSelect"
import { StayFilterByTxt } from "./StayFilterByTxt"
import { GuestSelect } from "./GuestSelect"
import { DateSelect } from "./DateSelect"
// import classes from "../cmps/user/orders/btn-square-color.module.css"


export function SearchBarExpanded({ selectedTab, setSelectedTab, isSearchOpen, onExpandSearch }) {
    const navigate = useNavigate()
    const [selected, setSelected] = useState([])
    const [fromValue, setFromValue] = useState('')
    const [toValue, setToValue] = useState('')
    const [filterBy, setFilterBy] = useState(stayService.getDefaultFilter())
    const [guestsCount, setGuestsCount] = useState({
        adults: 0,
        children: 0,
        infants: 0,
        pets: 0,
    })


    const onChangeTxt = (value) => {
        setFilterBy({ ...filterBy, txt: value })
    }

    const onChangeLocation = (value) => {
        if (value === "I'm flexible") value = ""
        setFilterBy({ ...filterBy, location: value })
        setSelectedTab('checkIn')
    }
    const onChangeDates = (value) => {
        const toValueTimeStmp = new Date(value.checkOut).getTime()
        const fromValueTimeStmp = new Date(value.checkIn).getTime()
        setFilterBy({ ...filterBy, checkIn: fromValueTimeStmp, checkOut: toValueTimeStmp })
    }

    const onChangeGuests = (value) => {
        const totalCount = Object.values(value).reduce((acc, curr) => acc + curr)
        setFilterBy({ ...filterBy, guests: totalCount })
    }



    const getGuestsSubTitleCount = (guestsCount) => {
        const { adults, children, infants, pets } = guestsCount
        var guestSubTitle = ''
        const totalGuests = adults + children
        if (!totalGuests) {
            guestSubTitle = 'Add guests'
            return guestSubTitle
        }
        guestSubTitle += `${totalGuests} ${totalGuests > 1 ? 'guests' : 'guest'}`
        if (infants) {
            guestSubTitle += ` ,${infants} ${infants > 1 ? 'infants' : 'infant'}`
        }
        if (pets) {
            guestSubTitle += ` ,${pets} ${pets > 1 ? 'pets' : 'pet'}`
        }
        return guestSubTitle
    }

    const checkInSubtitle = (fromValue) => {
        if (!fromValue) return 'Add dates'
        return fromValue
    }

    const checkOutSubtitle = (toValue) => {
        if (!toValue) return 'Add dates'
        return toValue
    }

    const guestsParams = JSON.stringify(guestsCount)
    const totalGuests = guestsCount.adults + guestsCount.children

    function checkForActiveClass(category) {
        return (selectedTab === category) ? ' active' : ''
    }

    const submitFilter = (ev) => {
        ev.preventDefault()
        onExpandSearch()
        navigate(`/?txt=${filterBy.txt}&location=${filterBy.location}&totalGuests=${totalGuests}&guests=${guestsParams}&checkIn=${filterBy.checkIn}&checkOut=${filterBy.checkOut}`)
    }

    const dynClass = isSearchOpen ? "" : "folded"
    return (
        <form onSubmit={submitFilter} className={`expanded-search-bar ${dynClass}`}>

            <div onClick={() => setSelectedTab("location")} className={`location  ${checkForActiveClass("location")}`}>

                <div className="location-wrapper">
                    <div className="location-wrapper-header">Where</div>
                    <StayFilterByTxt onChangeTxt={onChangeTxt} />
                </div>

            </div>
            {(selectedTab === 'location' && isSearchOpen) &&
                <LocationSelect
                    onChangeLocation={onChangeLocation}
                />}

            <div onClick={() => setSelectedTab("checkIn")} className={`check-in  ${checkForActiveClass("checkIn")} `}>

                <div className="checkIn-wrapper">
                    <div className="checkIn-wrapper-header">Check in</div>
                    <div className="checkIn-sub-header">{checkInSubtitle(fromValue)}</div>
                </div>

            </div>
            {(selectedTab === "checkIn" && isSearchOpen) &&
                <DateSelect
                    setFromValue={setFromValue}
                    setToValue={setToValue}
                    setSelected={setSelected}
                    selected={selected}
                    onChangeDates={onChangeDates}
                    setSelectedTab={setSelectedTab}
                />
            }

            <div onClick={() => setSelectedTab("checkOut")} className={`check-out  ${checkForActiveClass("checkOut")} `}>

                <div className="checkOut-wrapper">
                    <div className="checkOut-wrapper-header">Check out</div>
                    <div className="checkOut-sub-header">{checkOutSubtitle(toValue)}</div>
                </div>

            </div>
            {(selectedTab === "checkOut" && isSearchOpen) &&
                <DateSelect
                    fromValue={fromValue}
                    setFromValue={setFromValue}
                    toValue={toValue}
                    setToValue={setToValue}
                    setSelected={setSelected}
                    selected={selected}
                    onChangeDates={onChangeDates}
                    setSelectedTab={setSelectedTab}

                />}

            <div onClick={() => setSelectedTab("guest")} className={`guests  ${checkForActiveClass("guest")} `}>

                <div className="guests-wraper">
                    <div className="guests-wraper-header">Who</div>
                    <div className="guests-sub-header">{getGuestsSubTitleCount(guestsCount)}</div>
                </div>

            </div>

            <button className={`search-btn ${isSearchOpen ? "expand" : ""}`}>
                <i className="fa-solid fa-magnifying-glass"></i>

                {isSearchOpen && <span>Search</span>}
            </button>

            {(selectedTab === "guest" && isSearchOpen) && <div className={`guests-pick  ${dynClass}`}>
                <GuestSelect
                    onChangeGuests={onChangeGuests}
                    guestsCount={guestsCount}
                    setGuestsCount={setGuestsCount}
                />
            </div>}


        </form>

    )
}
