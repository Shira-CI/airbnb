import Modal from 'react-modal'
import { SaveShare } from '../SaveShare'
import goback from '../../assets/img/common/goback.svg'

export const GalleryModal = ({ imgUrls, galleryModalIsOpen, onCloseModal }) => {
  return (
    <Modal
      isOpen={galleryModalIsOpen}
      onRequestClose={onCloseModal}
      className="Modal-Gallery"
      overlayClassName="Overlay-Gallery"
    >
      <section className="gallery-modal-wrapper">
        <div className="gallery-modal-header">
          <button onClick={() => onCloseModal()}>
          <img src={goback} />
          </button>
          <SaveShare />
        </div>
        <section className="imgs-container">
          <div className="imgs-list">
            <div className="large-image">
              <img src={imgUrls[0]} alt="" />
            </div>
            <div className="small-images">
              <img src={imgUrls[1]} alt="" />
              <img src={imgUrls[2]} alt="" />
            </div>
            <div className="large-image">
              <img src={imgUrls[3]} alt="" />
            </div>
            <div className="large-image">
              <img src={imgUrls[4]} alt="" />
            </div>
          </div>
        </section>
      </section>
    </Modal>
  )
}
