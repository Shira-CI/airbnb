export const DetailsAmenities = ({ amenities, onOpenModal }) => {
  const items = [
    'Air conditioning',
    'Carbon monoxide alarm',
    'Cooking basics',
    'Dedicated workspace',
    'Hair dryer',
    'Elevator',
    'Essentials',
    'Free parking on premises',
    'Garden view',
    'Heating',
    'Iron',
    'Kitchen',
    'lockBox',
    'Mountain view',
    'private-hot-tub',
    'Private-patio',
    'Shampoo',
    'Smoke alarm',
    'Washer machine',
    // 'TV',
    'Wifi',
  ]

  const renderDescription = imageName => {
    const matchingItem = items.find(item =>
      item.toLowerCase().includes(imageName.toLowerCase())
    )
    if (matchingItem) {
      return <p>{matchingItem}</p>
    }
    return null
  }

  const sliceAmenities = (start, end) => {
    return amenities.slice(start, end).map((amenity, idx) => (
      <li key={idx}>
        <img
          src={require(`../../assets/img/amenities/${amenity}.svg`)}
          alt={amenity}
        />
        {renderDescription(amenity)}
      </li>
    ))
  }

  const leftAmenities = sliceAmenities(0, 5)
  const rightAmenities = sliceAmenities(5, 10)

  return (
    <div className="amenities-details">
      <h1>What this place offers</h1>
      <div className="amenities-list">
        <div className="left-amenities-list">
          <ul>{leftAmenities}</ul>
        </div>
        <div className="right-amenities-list">
          <ul>{rightAmenities}</ul>
        </div>
      </div>
      <button
        onClick={e => onOpenModal(e, 'amenities-modal')}
        data-modal="amenities-modal"
        className="show-all-amenities-btn"
      >
        Show all {amenities.length} amenities
      </button>
    </div>
  )
}
