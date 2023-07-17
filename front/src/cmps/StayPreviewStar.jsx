import star from '../assets/img/common/reviews-star.svg'
import { Loader } from './Loader'

export const StayPreviewStar = ({ reviews }) => {
  const getAvg = () => {
    let sum = 0
    reviews.forEach(review => {
      Object.values(review.rate).forEach(value => {
        sum += value
      })
    })
    return (sum / reviews.length / 6).toFixed(2)
  }

  if (!reviews) return <Loader />
  return (
    <div className="stay-preview-star">
      <img src={star} alt="" />
      <span className='stay-preview-avg'> {getAvg()}</span>
     
    </div>
  )
}
