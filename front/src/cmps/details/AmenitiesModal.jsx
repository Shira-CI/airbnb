import Modal from 'react-modal'
import close from '../../assets/img/common/close.svg'

export const AmenitiesModal = ({
  onCloseModal,
  amenities,
  amenitiesModalIsOpen,
}) => {
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
    'TV',
    'Washer machine',
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

  const amenityList = amenities.map((amenity, idx) => (
    <div className="amenity-wrapper" key={idx}>
      <li>
        <img
          src={require(`../../assets/img/amenities/${amenity}.svg`)}
          alt={amenity}
        />
        {renderDescription(amenity)}
      </li>
      <hr className="custom-hr" />
    </div>
  ))

  return (
    <Modal
      isOpen={amenitiesModalIsOpen}
      onRequestClose={onCloseModal}
      className="Modal-amenities"
      overlayClassName="Overlay-amenities"
    >
      <div className="amenities-modal-header">
        <button onClick={() => onCloseModal()}>
          <img src={close} />
        </button>
        <h1>What this place offers</h1>
      </div>
      <div className="amenities-modal-body">
        <ul>{amenityList}</ul>
      </div>
    </Modal>
  )
}
