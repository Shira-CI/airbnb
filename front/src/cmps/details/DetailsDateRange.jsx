import { useState, useEffect } from 'react'
import { stayService } from '../../services/stay.service'
import { useParams, useNavigate } from 'react-router-dom'
import { DayPicker } from 'react-day-picker'
import { Loader } from '../Loader'

export const DetailsDateRange = ({ checkIn, checkOut }) => {
  const [fromValue, setFromValue] = useState(
    checkIn ? new Date(parseInt(checkIn)) : undefined
  )
  const [toValue, setToValue] = useState(
    checkOut ? new Date(parseInt(checkOut)) : undefined
  )
  const [stay, setStay] = useState(null)
  const { stayId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    getStay()
  }, [])

  async function getStay() {
    const stay = await stayService.getById(stayId)
    setStay(stay)
  }

  const onChangeDates = date => {
    if (!fromValue) {
      setFromValue(date)
    } else if (!toValue) {
      setToValue(date)
    }
    const checkInTimestamp = fromValue ? fromValue : undefined
    const checkOutTimestamp = toValue ? toValue : undefined

    navigate(
      `/stay/${stayId}?checkIn=${checkInTimestamp}&checkOut=${checkOutTimestamp}`
    )
  }

  function nightCount(checkIn, checkOut) {
    const oneDay = 24 * 60 * 60 * 1000
    const checkInDate = new Date(checkIn)
    const checkOutDate = new Date(checkOut)
    const diffDays = Math.round(Math.abs((checkOutDate - checkInDate) / oneDay))
    return diffDays
  }

  const getDateToDisplay = timestamp => {
    const date = new Date(timestamp)

    const options = { month: 'short', day: 'numeric', year: 'numeric' }
    return date.toLocaleDateString('en-US', options)
  }

  if (!stay) return <Loader />
  return (
    <div className="date-range-wrapper">
      <div className="date-range-header">
        <h1>
          {fromValue && toValue
            ? `${nightCount(fromValue, toValue)} nights in ${stay.loc.city}`
            : 'Select check-in date'}
        </h1>
        <h5>
          {fromValue && toValue
            ? `${getDateToDisplay(fromValue)} - ${getDateToDisplay(toValue)}`
            : 'Add your travel dates for exact pricing'}
        </h5>
      </div>
      <DayPicker
        mode="range"
        onDayClick={onChangeDates}
        selected={{ from: fromValue, to: toValue }}
        numberOfMonths={2}
      />
      <div className="date-range-bottom">
        <a
          onClick={() => {
            setFromValue(undefined)
            setToValue(undefined)
          }}
        >
          Clear dates
        </a>
      </div>
    </div>
  )
}
