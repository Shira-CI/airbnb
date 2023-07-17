import { useState, useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { loadStays } from '../store/stay.actions.js'
import { setStayId } from '../store/stay.actions.js'
import { StayDetailsHeader } from '../cmps/details/StayDetailsHeader.jsx'
import { StayDetailsGallery } from '../cmps/details/StayDetailsGallery.jsx'
import { DetailsBasicInfo } from '../cmps/details/DetailsBasicInfo.jsx'
import { DetailsFeaturesInfo } from '../cmps/details/DetailsFeaturesInfo.jsx'
import { DetailsSleepInfo } from '../cmps/details/DetailsSleepInfo.jsx'
import { DetailsDescription } from '../cmps/details/DetailsDescription.jsx'
import { DetailsDateRange } from '../cmps/details/DetailsDateRange.jsx'
import { DetailsAmenities } from '../cmps/details/DetailsAmenities.jsx'
import { DetailsReviews } from '../cmps/details/DetailsReviews.jsx'
import { DetailsMap } from '../cmps/details/DetailsMap.jsx'
import { GalleryModal } from '../cmps/details/GalleryModal.jsx'
import { LearnMoreModal } from '../cmps/details/LearnMoreModal.jsx'
import { ReviewsModal } from '../cmps/details/ReviewsModal.jsx'
import { AmenitiesModal } from '../cmps/details/AmenitiesModal.jsx'
import { ShareModal } from '../cmps/details/ShareModal.jsx'
import { StayDetailsOrder } from '../cmps/orders/StayDetailsOrder.jsx'
import { DisplayList } from '../cmps/details/DisplayList.jsx'
import { setFooterToDisplay } from '../store/stay.actions.js'
import { Loader } from '../cmps/Loader.jsx'
import priceTag from '../assets/img/common/priceTag.svg'


const CHECKOUT_INFO = [
  'House rules',
  'Check-in: 4:00 PM - 9:00 PM',
  'Checkout before 10:00 AM',
  '2 guests maximum',
]

export const StayDetails = () => {
  const [stay, setStay] = useState(null)
  const [searchParams] = useSearchParams()
  const [galleryModalIsOpen, setGalleryModalIsOpen] = useState(false)
  const [learnMoreModalIsOpen, setLearnMoreModalIsOpen] = useState(false)
  const [reviewsModalIsOpen, setReviewsModalIsOpen] = useState(false)
  const [amenitiesModalIsOpen, setAmenitiesModalIsOpen] = useState(false)
  const [shareModalIsOpen, setShareModalIsOpen] = useState(false)
  const [ScrollBarIsShow, setShowScrollBar] = useState(true)
  const [openTab, setOpenTab] = useState(null)
  const params = useParams()
  const { stayId } = params

  const checkIn = searchParams.get('checkIn')
  const checkOut = searchParams.get('checkOut')

  const CloseScrollBar = () => {
    setShowScrollBar(false)
  }

  const showScrollBar = () => {
    setShowScrollBar(true)
  }

  useEffect(() => {
    if (ScrollBarIsShow) {
      document.body.style.overflow = 'unset'
    } else {
      document.body.style.overflow = 'hidden'
    }
  }, [ScrollBarIsShow])

  useEffect(() => {
    const loadStaysOnDetails = async () => {
      const stays = await loadStays()
      const stayFromParams = stays.find(stay => stay._id === stayId)
      setStay(stayFromParams)
    }
    loadStaysOnDetails()
    setStayId(stayId)
    setFooterToDisplay(false)
  }, [])

  const onOpenModal = (event, modal) => {
    event.preventDefault()
    if (modal === 'gallery-modal') {
      setGalleryModalIsOpen(true)
      CloseScrollBar()
    } else if (modal === 'learn-more-modal') {
      setLearnMoreModalIsOpen(true)
      CloseScrollBar()
    } else if (modal === 'reviews-modal') {
      setReviewsModalIsOpen(true)
      CloseScrollBar()
    } else if (modal === 'amenities-modal') {
      setAmenitiesModalIsOpen(true)
      CloseScrollBar()
    } else if (modal === 'share-modal') {
      setShareModalIsOpen(true)
      CloseScrollBar()
    }
  }

  const onCloseModal = () => {
    setGalleryModalIsOpen(false)
    setLearnMoreModalIsOpen(false)
    setReviewsModalIsOpen(false)
    setAmenitiesModalIsOpen(false)
    setShareModalIsOpen(false)
    showScrollBar()
  }

  if (!stay) return <Loader />
  return (
    <section className="stay-details">
      <StayDetailsHeader
        bathrooms={stay.bathrooms}
        bedrooms={stay.bedrooms}
        stayTitle={stay.name}
        reviews={stay.reviews}
        loc={stay.loc.address}
        onOpenModal={onOpenModal}
      />
      <StayDetailsGallery imgUrls={stay.imgUrls} onOpenModal={onOpenModal} />
      <div className="stay-details-info">
        <div className="stay-details-info-left">
          <DetailsBasicInfo
            capacity={stay.capacity}
            host={stay.host.fullname}
            imgUrl={stay.host.imgUrl}
          />
          <hr className="custom-hr" />

          <DetailsFeaturesInfo onOpenModal={onOpenModal} />
          <hr className="custom-hr" />
          <DetailsDescription summary={stay.summary} />

          <hr className="custom-hr" />

          <DetailsSleepInfo
            imgUrl={stay.imgUrls[3]}
            onOpenModal={onOpenModal}
          />

          <hr className="custom-hr" />
          <DetailsAmenities
            amenities={stay.amenities}
            onOpenModal={onOpenModal}
          />

          <hr className="custom-hr" />

          <DetailsDateRange checkIn={checkIn} checkOut={checkOut} />
        </div>

        <div className="stay-details-order-container">

    <section className='order-modal-msg'>

    
          <StayDetailsOrder
            stay={stay}
            openTab={openTab}
            setOpenTab={setOpenTab}
          />
        


          <section className='good-price-section'>
            <span className='good-price-header'>  Good price.</span>
            <div className='good-price-content'>  Your dates are $35 less than the avg. nightly rate over the last 3 months.</div>
            <span className='price-tag-icon'><img src={priceTag} alt="" /></span>
          </section>
          </section>
          </div>
      </div>

      <hr className="custom-hr" />

      <DetailsReviews reviews={stay.reviews} onOpenModal={onOpenModal} />

      <hr className="custom-hr" />

      <DetailsMap loc={stay.loc} address={stay.loc.address} summary={stay.summary} name={stay.name} />

      <hr className="custom-hr" />

      <div className="modals">
        <GalleryModal
          imgUrls={stay.imgUrls}
          galleryModalIsOpen={galleryModalIsOpen}
          onCloseModal={onCloseModal}
        />

        <LearnMoreModal
          learnMoreModalIsOpen={learnMoreModalIsOpen}
          onCloseModal={onCloseModal}
        />
        <ReviewsModal
          reviews={stay.reviews}
          reviewsModalIsOpen={reviewsModalIsOpen}
          onCloseModal={onCloseModal}
        />
        <AmenitiesModal
          amenities={stay.amenities}
          amenitiesModalIsOpen={amenitiesModalIsOpen}
          onCloseModal={onCloseModal}
        />
        <ShareModal
          shareModalIsOpen={shareModalIsOpen}
          onCloseModal={onCloseModal}
          type={stay.type}
          loc={stay.loc.city}
          bathrooms={stay.bathrooms}
          bedrooms={stay.bedrooms}
          imgUrl={stay.imgUrls[0]}
        />
      </div>
    </section>
  )
}
