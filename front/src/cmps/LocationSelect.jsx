export function LocationSelect({ onChangeLocation }) {




    const locations = [
        { name: 'I\'m flexible', imgUrl: 'https://a0.muscache.com/pictures/f9ec8a23-ed44-420b-83e5-10ff1f071a13.jpg?im_w=320' },
        { name: 'Middle East', imgUrl: "https://a0.muscache.com/im/pictures/66355b01-4695-4db9-b292-c149c46fb1ca.jpg?im_w=320" },
        { name: 'Italy', imgUrl: 'https://a0.muscache.com/im/pictures/ea5598d7-2b07-4ed7-84da-d1eabd9f2714.jpg?im_w=320' },
        { name: 'United States', imgUrl: 'https://a0.muscache.com/im/pictures/4e762891-75a3-4fe1-b73a-cd7e673ba915.jpg?im_w=320' },
        { name: 'France', imgUrl: 'https://a0.muscache.com/im/pictures/f0ece7c0-d9b2-49d5-bb83-64173d29cbe3.jpg?im_w=320' },
        { name: 'South America', imgUrl: 'https://a0.muscache.com/im/pictures/06a30699-aead-492e-ad08-33ec0b383399.jpg?im_w=320' }
    ]


    return (
        <div className="location-pick">

            <div className="location-pick-header">Search by region</div>

            <div className="location-grid-container">
                {locations.map(location => {
                    return (
                        <div className="location-card" key={location.name}>
                            <div className="location-btn" onClick={() => onChangeLocation(location.name)}>
                                <img src={location.imgUrl} alt={location.name} />
                            </div>
                            <div className="location-name">{location.name}</div>
                        </div>
                    )
                })}
            </div>

            
        </div>
    )
}