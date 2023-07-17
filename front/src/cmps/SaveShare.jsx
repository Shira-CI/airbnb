import share from '../assets/img/common/share.svg'
import heart from '../assets/img/common/heart.svg'

export const SaveShare = ({onOpenModal}) => {
  return (
    <div className="save-share-details">
      <a onClick={e => onOpenModal(e, 'share-modal')} data-modal="share-modal">
        <img src={share} alt="share" />
        Share
      </a>
      <a>
        <img src={heart} alt="save" />
        Save
      </a>
    </div>
  )
}
