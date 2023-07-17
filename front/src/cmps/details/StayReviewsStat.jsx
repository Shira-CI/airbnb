import star from '../../assets/img/common/reviews-star.svg'
import { Loader } from '../Loader'

export const StayReviewsStat = ({ reviews, onOpenModal }) => {
  const averageRates = reviews => {
    const revAvgS = reviews.map(review => {
      const { rate } = review
      const rateValues = Object.values(rate)
      const averageRate =
        rateValues.reduce((acc, curr) => acc + curr, 0) / rateValues.length

      return { averageRate }
    })
    return (
      revAvgS.reduce((acc, curr) => acc + curr.averageRate, 0) / revAvgS.length
    ).toFixed(2)
  }

  const numOfReviews = () => {
    return reviews.length
  }

  if (!reviews) return <Loader />

  return (
    <div className="rating-details">
      <span className='reviews-avg'>
        <img className='star-reviews' src={star} alt="" />
        <span className='reviews-span'>
          {averageRates(reviews)}
        </span>
      </span>
      <span className="space-dot">·</span>
      <a className='reviews-count' onClick={e => onOpenModal(e, 'reviews-modal')}
        data-modal="reviews-modal">{numOfReviews()} reviews</a>
    </div>
  )
}
