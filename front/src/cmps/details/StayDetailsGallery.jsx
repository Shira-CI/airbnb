import { useEffect } from 'react'
import showAllPhotos from '../../assets/img/common/show-all-photos.svg'

export const StayDetailsGallery = ({ imgUrls, onOpenModal }) => {
  useEffect(() => {
    const galery = document.querySelector('.details-gallery-wrapper')
    const tochangeheader = document.querySelector('.app-header')
    const galeryObserver = new IntersectionObserver(onHeaderObserved, {
      threshold: 0,
    })
    galeryObserver.observe(galery)

    function onHeaderObserved(entries) {
      entries.forEach(entry => {
        tochangeheader.style.position = entry.isIntersecting ? '' : 'fixed'
      })
    }
  }, [])

  return (
    <section
      onClick={e => onOpenModal(e, 'gallery-modal')}
      data-modal="gallery-modal"
      className="details-gallery-wrapper"
    >
      <div className="all-imgs-btn">
        <button>
          <img src={showAllPhotos} alt="show all photos" />
          Show all photos
        </button>
      </div>
      <div className="main-photo">
        <img src={`${imgUrls[0]}`} alt="main-img" />
      </div>
      <div className="small-photos">
        <img src={`${imgUrls[1]}`} alt="small-img-1" />
        <img
          src={`${imgUrls[2]}`}
          alt="small-img-2"
          style={{ borderTopRightRadius: '0.5em' }}
        />
        <img src={`${imgUrls[3]}`} alt="small-img-3" />
        <img
          src={`${imgUrls[4]}`}
          alt="small-img-4"
          style={{ borderBottomRightRadius: '0.5em' }}
        />
      </div>
    </section>
  )
}
