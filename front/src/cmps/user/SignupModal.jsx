import Modal from 'react-modal'


export function SignupModal({onCloseModal, isSignupModalOpen }){

    return(
        <Modal
    isOpen={isSignupModalOpen}
    onRequestClose={onCloseModal}
    className="signup-modal"
    overlayClassName="Overlay-learn-more"
  >
    {/* <section className='user-menu-modal'>



    </section> */}





</Modal>
    )
}