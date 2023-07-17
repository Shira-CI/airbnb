import 'react-date-range/dist/styles.css' // main css file
import 'react-date-range/dist/theme/default.css' // theme css file
// import '../../../assets/styles/cmps/_OrderModal.scss'
import { useState, useEffect } from 'react'
import React from 'react'
import { DayPicker } from "react-day-picker"



export function DatePicker({ checkIn, checkOut, setUpdatedsearchParams }) {

    const [fromValue, setFromValue] = useState(
        checkIn ? new Date(parseInt(checkIn)) : undefined
    )
    const [toValue, setToValue] = useState(
        checkOut ? new Date(parseInt(checkOut)) : undefined
    )

    useEffect(() => {
        setUpdatedsearchParams((prevParams) => ({
            ...prevParams,
            checkIn: new Date(fromValue).getTime(),
            checkOut: new Date(toValue).getTime(),
        }));
    }, [fromValue, toValue]);

    const onChangeDates = date => {
        if (fromValue && toValue) {
            setToValue((prevToValue) => undefined);
            setFromValue((prevFromValue) => date);

            return
        }
        if (!fromValue) {
            setFromValue((prevFromValue) => date);

        }

        if (!toValue && fromValue) {
            setToValue((prevToValue) => date);
        }



    }
    const modifiers = { from: fromValue, to: toValue }
    const modifiersStyles = {
        from: { backgroundColor: '#22222', color: '#fff' }, // Customize the start date style
        to: { backgroundColor: '#22222', color: '#fff' }, // Customize the end date style
        range: { backgroundColor: '#F7F7F7' }, // Customize the range style
    }

    return (
        <div className="date-range-wrapper">
            <DayPicker
                mode="range"
                // selected={{ from: fromValue, to: toValue }}
                selected={modifiers}
                modifiers={modifiers}
                modifiersStyles={modifiersStyles}
                onDayClick={onChangeDates}
                numberOfMonths={2}
            />
               {/* <a
                onClick={() => {
                    setFromValue(undefined)
                    setToValue(undefined)
                }}
            >
                Clear dates
            </a> */}
         
        </div>
    )
}