import { DayPicker } from "react-day-picker"
import { format } from 'date-fns'
import 'react-day-picker/dist/style.css'

export function DateSelect({ onChangeDates, selected, setSelected, setFromValue, setToValue, setSelectedTab }) {

    const handleRangeSelect = (range) => {
        setSelected(range)
        if (range?.from) {
            setFromValue(format(range.from, 'MMM d'))
            setSelectedTab("checkOut")

        } else {
            setFromValue('')
        }
        if (range?.to) {
            setToValue(format(range.to, 'MMM d'))
            setSelectedTab("guest")

        } else {
            setToValue('')
        }

        if (range?.from) {
            onChangeDates({ checkIn: range.from, checkOut: range.to })
        }


    }


    return (
        <div className="check-in-pick">

            <div className="date-pick-header">
                <div className="date-pick-dates"></div>
                <div className="date-pick-months"></div>
                <div className="date-pick-flexible"></div>
            </div>

            <DayPicker
                mode="range"
                selected={selected}
                onSelect={handleRangeSelect}
                numberOfMonths={2}
            />

            <div className="date-pick-days">
                <div className="date-pick-days-exact"></div>
                <div className="date-pick-days-exact"></div>
                <div className="date-pick-days-exact"></div>
                <div className="date-pick-days-exact"></div>
            </div>

        </div>
    )
}