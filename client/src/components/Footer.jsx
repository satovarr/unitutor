import { Link } from 'react-router-dom'
import logo from '../imgs/UniTutor_logo.svg'
import twitter from '../imgs/twitter.svg'
import instagram from '../imgs/instagram.svg'
import linkedIn from '../imgs/linkedIn.svg'
import '../styles/componentStyles/footer.css'

const Footer = () => {
    //TODO: adjust links
    return (
        <footer className="footer">
            <img src={logo} alt="UniTutor" />
            <p className='copyright'>Copyright © 2022 UniTutor</p>
            <div className='footer_links'>
                <Link to={'/about'}>Términos de Servicio</Link>
                <p>|</p>
                <Link to={'/about'}>Política de Privacidad</Link>
                <p>|</p>
                <Link to={'/about'}>Sobre Nosotros</Link>
            </div>
            <div className="footer_socials">
                <a target="blank" href="https://twitter.com/unitutor_app">
                    <img alt='Twitter' src={twitter}/>
                </a>
                <a target="blank" href="https://www.instagram.com/unitutor.app/">
                    <img alt='Instagram' src={instagram}/>
                </a>
                <a target="blank" href="https://www.linkedin.com/in/unitutor-app-916040258/">
                    <img alt='LinkedIn' src={linkedIn}/>
                </a>
            </div>
        </footer>
    )
}

export default Footer