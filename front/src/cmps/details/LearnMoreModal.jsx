import Modal from 'react-modal'

export const LearnMoreModal = ({ onCloseModal, learnMoreModalIsOpen }) => {
  return (
    <Modal
      isOpen={learnMoreModalIsOpen}
      onRequestClose={onCloseModal}
      className="Modal-learn-more"
      overlayClassName="Overlay-learn-more"
    >
      <div className="learn-more-modal">
        <div className="learn-more-modal-content">
          <div className="learn-more-modal-header">
            <h1>Learn More</h1>
            <button onClick={() => onCloseModal()}>{'\u003C'}</button>
          </div>
          <div className="learn-more-modal-body">
            <div className="learn-more-modal-body-section">
              <h2>What is Airbnb?</h2>
              <p>
                Airbnb is a platform that connects people from around the world
                to incredible places to stay and interesting things to do.
                Whether an apartment for a night, a castle for a week, or salsa
                lessons in Havana to help you truly live there. The Airbnb
                community aims to create a world where all 7.5 billion people
                can belong anywhere.
              </p>
            </div>
            <div className="learn-more-modal-body-section">
              <h2>How is Airbnb ensuring my safety during COVID-19?</h2>
              <p>
                We're focused on the health and safety of our community. We've
                developed a new cleaning process for hosts, with guidance from
                the Centers for Disease Control and Prevention (CDC). Hosts who
                participate in this program attest that they follow the
                program's guidelines, which may include enhanced cleaning and
                disinfecting guidelines. Learn more
              </p>
            </div>
            <div className="learn-more-modal-body-section">
              <h2>What are Airbnb's standards for hosts?</h2>
              <p>
                We ask all hosts to commit to Airbnb's COVID-19 safety
                practices, including adhering to social distancing guidelines,
                practicing good hygiene, and ensuring that all common areas are
                cleaned before and after each use. Learn more
              </p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}
