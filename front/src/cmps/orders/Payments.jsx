import React, { useState, useRef } from 'react'

export function Payments({ order, setIsPayments, getPaymentsValue, getSecondPaymenDate }) {
    const [selectedOption, setSelectedOption] = useState('')
    const [isFullClicked, setIsFullClicked] = useState(true)
    const [isPartClicked, setIsPartClicked] = useState(false)
    const fullRef = useRef(null)
    const partRef = useRef(null)

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value)
        if (event.target.value === 'full') {
            setIsFullClicked(true)
            setIsPartClicked(false)
            setIsPayments(false)
            fullRef.current.classList.add('active-border')
            partRef.current.classList.remove('active-border')

        }
        if (event.target.value === 'payments') {
            setIsFullClicked(false)
            setIsPartClicked(true)
            setIsPayments(true)
            fullRef.current.classList.remove('active-border')
            partRef.current.classList.add('active-border')
        }
    }



    const dynClassFull = isFullClicked ? 'fa-solid fa-circle-dot active' : 'button-input'
    const dynClassPart = isPartClicked ? 'fa-solid fa-circle-dot active' : 'button-input'
    // const dynClassLabel = isClicked ?  'fa-solid fa-circle-dot active' : 'input'

    return (

        <div className="book-payments-form">
            <div className='choose-payment-header'>Choose how to pay</div>
            <div className='payments-container'>
                <label ref={fullRef} className='pay-full active-border'>
                    <div>
                        <section className='payments-header'> Pay in full </section>
                        <section className='payments-content'>Pay the total( ${order.totalPrice}) now and you're all set.</section>
                    </div>
                    <input
                        className={dynClassFull}
                        type="radio"
                        value="full"
                        checked={selectedOption === 'full'}
                        onChange={handleOptionChange}
                    />
                </label>

                <label ref={partRef} className='payments'>
                    <div >
                        <section className='payments-header'>Pay part now, part later</section>
                        <section className='payments-content'>
                            ${getPaymentsValue()} due today, ${getPaymentsValue()} on {getSecondPaymenDate()}. No extra fees.</section>
                    </div>
                    <input
                        className={dynClassPart}
                        type="radio"
                        value="payments"
                        checked={selectedOption === 'payments'}
                        onChange={handleOptionChange}
                    />
                </label>
            </div>

        </div>
    )
}

