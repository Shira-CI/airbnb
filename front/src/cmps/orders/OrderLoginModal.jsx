import Modal from 'react-modal'
import { LoginSignup } from '../LoginSignup'


export function OrderLoginModal({ onCloseModal, isLoginModalOpen, onChangeLoginStatus }) {
  // console.log(isSignup)
  return (
    <Modal
      isOpen={isLoginModalOpen}
      onRequestClose={onCloseModal}
      className="order-login-modal-container"
      overlayClassName="Overlay-login-modal"
    >
      {/* <section className='login-signup'> */}
      <LoginSignup onChangeLoginStatus={onChangeLoginStatus} onCloseModal={onCloseModal} />
      {/* </section> */}
    </Modal>
  )

}