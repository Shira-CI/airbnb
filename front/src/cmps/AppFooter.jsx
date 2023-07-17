import { useSelector } from 'react-redux'
import footer from '../assets/img/icons/footer-icon.jpeg'


export const AppFooter = () => {
    const isFooterShown = useSelector(storeState => storeState.stayModule.isFooterShown)


    
if (!isFooterShown) return <div></div>
    return (
        <footer className="app-footer full">

            <section className="footer-links">
                <span> © 2023 Airist, Inc.</span>
                <span> · </span>
                <span className='footer-link-hover'>Terms</span>
                <span> · </span>
                <span className='footer-link-hover'>Sitemap</span>
                <span> · </span>
                <span className='footer-link-hover'>Privacy</span>
                <span> · </span>
                <span className='footer-link-hover'>Your Privacy Choices  <img src={footer} alt="" /> </span>
                <span> · </span>
                <span className='footer-link-hover'>Destinations</span>
            </section>

        <section className="footer-options">
           {/* <span>English (US)</span>
            <span>$ USD</span>
            <span>Support $ resources</span>  */}
        </section>
        </footer>
    )
}