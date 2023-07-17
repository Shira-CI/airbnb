import { useState} from 'react'
import { StayPreviewStar } from './StayPreviewStar'
import { Carousel } from './Carousel'
import { HeartIcon } from './PreviewHeart'
import { useLocation , Link} from 'react-router-dom'

export function StayPreview({stay}) {
  const [isHeartClicked, setIsHeartClicked] = useState(false)
  const location = useLocation()
  const reviews = stay.reviews
  const heartColor = !isHeartClicked? ("black") : ("#FF385C")
  const heartOpacity = !isHeartClicked? ("0.5") : ("1")
  
  function onHeartClick(ev){
    ev.preventDefault()
    setIsHeartClicked(prev=>!prev)
  }

  function getRandomDateRange() {
    const randomMonth = Math.floor(Math.random() * 12);
    const numberOfDays = new Date(2023, randomMonth + 1, 0).getDate();
    const randomStartDay = Math.floor(Math.random() * numberOfDays) + 1;
    const randomEndDay = Math.floor(Math.random() * (numberOfDays - randomStartDay + 1)) + randomStartDay;
    const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    const monthName = monthNames[randomMonth];
    const dateRange = `${monthName} ${randomStartDay} - ${randomEndDay}`
  
    return dateRange
  }
  return (
    <section className='stay-preview'>
      <Link className="details-a-link" to={`/stay/${stay._id}/${location.search}`}>

        <section className='stay-preview-image-container'>
          <Carousel stay={stay} />
        </section>

        <section className='stay-preview-hurt' onClick={onHeartClick}>
          <HeartIcon  heartOpacity={heartOpacity} heartColor={heartColor} />
        </section>

        <section className="stay-preview-txt">
          <span className="stay-preview-location">{stay.loc.address}</span>
          <StayPreviewStar reviews={reviews} />
          <span className="stay-preview-distance"> {stay.type} </span>
          <span className="stay-preview-dates"> {getRandomDateRange()} </span>
          <span className="stay-preview-price">${stay.price}<span className="stay-preview-night"> night </span></span>
        </section>
        
      </Link>
    </section>
  
 
  )
}
