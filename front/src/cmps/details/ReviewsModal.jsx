import { useEffect, useState } from 'react'

import Modal from 'react-modal'
import { StayReviewsStat } from './StayReviewsStat'
import close from '../../assets/img/common/close.svg'

export const ReviewsModal = ({ onCloseModal, reviewsModalIsOpen, reviews }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])

  const handleChange = event => {
    setSearchTerm(event.target.value)
  }

  useEffect(() => {
    const results = reviews.filter(review =>
      review.txt.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setSearchResults(results)
  }, [searchTerm, reviews])

  const averageRates = reviews => {
    const ratings = reviews.reduce((acc, review) => {
      const { rate } = review
      Object.entries(rate).forEach(([type, avg]) => {
        if (acc.hasOwnProperty(type)) {
          acc[type].sum += avg
          acc[type].count += 1
        } else {
          acc[type] = { sum: avg, count: 1 }
        }
      })
      return acc
    }, {})

    const result = Object.entries(ratings).map(([type, { sum, count }]) => ({
      type,
      avg: (sum / count).toFixed(1),
    }))

    return result
  }

  const avgRates = averageRates(reviews)

  const avgRatesList = avgRates.map((rate, idx) => {
    return (
      <li key={idx}>
        <div className="avg-data-wrapper">
          <div className="avg-type">{rate.type}</div>
          <div className="avg-num">
            <progress id="file" value={rate.avg} max="5" />
            {rate.avg}
          </div>
        </div>
      </li>
    )
  })

  const RenderReview = (review, idx) => {
    return (
      <div className="user-review" key={idx}>
        <div className="user-review-header">
          <img src={getProfileImg()} alt="" />
          <div className="review-head-txt">
            <h2>{review.by.fullname}</h2>
            <p>Sep 2023</p>
          </div>
        </div>
        <div className="user-review-body">
          <p>{review.txt}</p>
        </div>
      </div>
    )
  }

  const getProfileImg = () => {
    const gender = Math.random() < 0.5 ? 'male' : 'female'
    const randomNumber = Math.floor(Math.random() * 78)
    const images = require.context('../../assets/img/usersImgs/', true)
    const itemItem = images(`./${gender}/${randomNumber}.jpg`)
    return itemItem
  }

  return (
    <Modal
      isOpen={reviewsModalIsOpen}
      onRequestClose={onCloseModal}
      className="Modal-reviews"
      overlayClassName="Overlay-reviews"
    >
      <div className="reviews-modal-wrapper">
      <button onClick={() => onCloseModal()}><img src={close} alt="img" /></button>
        <section className="rating-details flex column">
          <StayReviewsStat reviews={reviews} />
          <ul>{avgRatesList}</ul>
        </section>
        <section className="reviews-list">
          <div className="search-reviews">
            <input
              type="text"
              placeholder="Search reviews"
              value={searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className="list-reviews">
            {searchResults.map((review, idx) => RenderReview(review, idx))}
          </div>
        </section>
      </div>
    </Modal>
  )
}
