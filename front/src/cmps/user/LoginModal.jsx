import Modal from 'react-modal'
import { LoginSignup } from './LoginSignup'


export function LoginModal({ onCloseModal, isLoginModalOpen, onChangeLoginStatus }) {
  return (
    <Modal
      isOpen={isLoginModalOpen}
      onRequestClose={onCloseModal}
      className="login-modal-container"
      overlayClassName="Overlay-login-modal"
    >
      <LoginSignup onChangeLoginStatus={onChangeLoginStatus} onCloseModal={onCloseModal} />

    </Modal>
  )
}