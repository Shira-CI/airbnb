import { StayReviewsStat } from './StayReviewsStat'
import { SaveShare } from '../SaveShare'

export const StayDetailsHeader = ({
  stayTitle,
  reviews,
  loc,
  onOpenModal,
}) => {
  return (
    <header className="header-details">
      <h1>{stayTitle}</h1>
      <div className="sub-header-details">
        <div className="sub-header-details-left">
          <StayReviewsStat reviews={reviews} onOpenModal={onOpenModal} />
          <span className="space">·</span>
          <div className="super-host-details">
            <span>Superhost</span>
            <span className="space">·</span>
            <a href="">{loc}</a>
          </div>
        </div>
        <div className="sub-header-details-right">
          <SaveShare onOpenModal={onOpenModal}/>
        </div>
      </div>
    </header>
  )
}
