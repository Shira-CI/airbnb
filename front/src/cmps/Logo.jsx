import { useNavigate } from 'react-router-dom'
import logo from '../assets/img/icons/logo.png'

export function Logo() {
    const navigate = useNavigate()



    function onLogoClick() {
        navigate(`/`)
    }

    return (
        <div className="main-logo flex" onClick={onLogoClick}>
            {/* <span className="main-logo-container" ></span> */}
            <img className='main-logo-container' src={logo} alt="" />
            <div className="logo-txt">airist</div>
        </div>
    )
}