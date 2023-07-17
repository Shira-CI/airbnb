import Modal from 'react-modal'
import ShareLink from 'react-facebook-share-link'
import copylink from '../../assets/img/common/copylink.svg'
import facebook from '../../assets/img/common/facebook.svg'
import whatsapp from '../../assets/img/common/whatsapp.svg'
import email from '../../assets/img/common/email.svg'
import close from '../../assets/img/common/close.svg'

export const ShareModal = ({
  type,
  loc,
  bedrooms,
  bathrooms,
  onCloseModal,
  imgUrl,
  shareModalIsOpen,
}) => {
  const shareOnWhatsApp = () => {
    const url = encodeURIComponent(window.location.href)
    window.open(`https://api.whatsapp.com/send?text=${url}`, '_blank')
  }

  const copyToClipboard = () => {
    const url = window.location.href
    navigator.clipboard.writeText(url)
  }

  const shareViaEmail = () => {
    const subject = encodeURIComponent('Check out this place')
    const body = encodeURIComponent(window.location.href)
    window.location.href = `mailto:?subject=${subject}&body=${body}`
  }

  return (
    <Modal
      isOpen={shareModalIsOpen}
      onRequestClose={onCloseModal}
      className="Modal-share"
      overlayClassName="Overlay-share"
    >
      <section className="share-modal-wrapper">
        <div>
          <div className="share-modal-header">
            <h1>Share this place</h1>
            <button onClick={() => onCloseModal()}><img src={close} alt="img" /></button>
            <div className="share-modal-details">
              <img src={imgUrl} alt="img" />
              <p>
                {type} in {loc}
                <span className="space-dot">·</span>
                {bedrooms} bedrooms
                <span className="space-dot">·</span>
                <span>2 beds</span>
                <span className="space-dot">·</span>
                {bathrooms} bathroom
              </p>
            </div>
          </div>
          <div className="btns-wrapper">
            <ShareLink link={window.location.href}>
              {link => (
                <button onClick={() => window.open(link, '_blank')}>
                  <img src={facebook} alt="Facebook" /> Facebook
                </button>
              )}
            </ShareLink>
            <button onClick={shareOnWhatsApp}>
              <img src={whatsapp} alt="WhatsApp" /> WhatsApp
            </button>
            <button onClick={shareViaEmail}>
              <img src={email} alt="Email" /> Email
            </button>
            <button onClick={copyToClipboard}>
              <img src={copylink} alt="Copy Link" /> Copy Link
            </button>
          </div>
        </div>
      </section>
    </Modal>
  )
}
