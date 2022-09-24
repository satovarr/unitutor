import { Link } from 'react-router-dom'
import logo from '../imgs/UniTutor_logo.svg'
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
        </footer>
    )
}

export default Footer