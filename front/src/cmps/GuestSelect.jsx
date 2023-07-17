import { Counter } from "./Counter"

export function GuestSelect({onChangeGuests,guestsCount,setGuestsCount}) {

    const guestSelectOptions = [
        {
            label: 'Adults',
            subLabel: 'Ages 13 or above',
            field: 'adults'
        },
        {
            label: 'Children',
            subLabel: 'Ages 2-12',
            field: 'children'
        },
        {
            label: 'Infants',
            subLabel: 'Under 2',
            field: 'infants'
        },
        {
            label: 'Pets',
            subLabel: 'Bring in a Service Animal!',
            field: 'pets'
        }
    ]



    function guestCountChange(type, value) {
        setGuestsCount((prevGuestCounts) => ({ ...prevGuestCounts, [type]: prevGuestCounts[type] + value }))
        onChangeGuests({ ...guestsCount, [type]: guestsCount[type] + value })
    }

    return (
        <div className='guest-select-container'>
            {guestSelectOptions.map((option, idx) => {
                return (
                    <div className="guest-select-row" key={idx}>
                        <div className="guest-select-label">
                            <div className="guest-select-title">{option.label}</div>
                            <div className="guest-select-sub-title">{option.subLabel}</div>
                        </div>
                        <Counter guestCountChange={guestCountChange} guestsCount={guestsCount} field={option.field} />
                    </div>
                )
            })}
        </div>)
}