import { StayReviewsStat } from './StayReviewsStat'
import { makeId } from '../../services/util.service.js'

export const DetailsReviews = ({ reviews, onOpenModal }) => {
  // average rates

  const averageRates = reviews => {
    const ratings = reviews.reduce((acc, review) => {
      const { rate } = review
      Object.entries(rate).forEach(([category, avg]) => {
        acc[category] = acc[category] || { sum: 0, count: 0 }
        acc[category].sum += avg
        acc[category].count += 1
      })
      return acc
    }, {})

    const result = Object.entries(ratings).map(
      ([category, { sum, count }]) => ({
        category,
        avg: (sum / count).toFixed(2),
      })
    )

    return result
  }


  const avgRates = averageRates(reviews)

  const sliceAvgRates = (start, end) => {
    return avgRates.slice(start, end).map(rate => (
      <li key={makeId()}>
        <div className="avg-data-wrapper">
          <div className="avg-type">{rate.category}</div>
          <div className="avg-num">
            <progress id="file" value={rate.avg} max="5" />
            {rate.avg}
          </div>
        </div>
      </li>
    ))
  }

  const getProfileImg = () => {
    const gender = Math.random() < 0.5 ? 'male' : 'female'
    const randomNumber = Math.floor(Math.random() * 78)
    const images = require.context('../../assets/img/usersImgs/', true)
    const itemItem = images(`./${gender}/${randomNumber}.jpg`)
    return itemItem
  }

  // reviews

  const RenderReview = ({ reviews }) => {
    return reviews.map(review => {
      const truncatedTxt =
        review.txt.length > 150 ? review.txt.slice(0, 150) + '...' : review.txt
      const showMoreButton =
        review.txt.length > 150 ? (
          <a
            onClick={e => onOpenModal(e, 'reviews-modal')}
            data-modal="reviews-modal"
          >
            Show More
          </a>
        ) : null

      const img = ''
      return (
        <div className="user-review" key={makeId()}>
          <div className="user-review-header">
            <img src={getProfileImg()} alt="User" />
            <div className="review-head-txt">
              <h2>{review.by.fullname}</h2>
              <p>Sep 2023</p>
            </div>
          </div>
          <div className="user-review-body">
            <p>{truncatedTxt}</p>
            {showMoreButton}
          </div>
        </div>
      )
    })
  }

  return (
    <div className="reviews-details-wrapper">
      <div className="rating-details-data">
        <StayReviewsStat reviews={reviews} />
      </div>
      <section className="reviews-avg-data">
        <div className="reviews-avg-data-left">
          <ul>{sliceAvgRates(0, 3)}</ul>
        </div>
        <div className="reviews-avg-data-right">
          <ul>{sliceAvgRates(3, 6)}</ul>
        </div>
      </section>
      <section className="reviews-wrapper">
        <RenderReview reviews={reviews.slice(0, 6)} />
        <div className="show-all-reviews-btn">
          <button
            onClick={e => onOpenModal(e, 'reviews-modal')}
            data-modal="reviews-modal"
          >
            Show all {reviews.length} reviews
          </button>
        </div>
      </section>
    </div>
  )
}
