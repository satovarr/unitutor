import { Link } from 'react-router-dom'
import logo from '../imgs/UniTutor_logo.svg'
import twitter from '../imgs/twitter.svg'
import instagram from '../imgs/instagram.svg'
import linkedIn from '../imgs/linkedIn.svg'
import paypal from '../imgs/paypal.svg'
import '../styles/componentStyles/footer.css'

const Footer = () => {
    //TODO: adjust links
    return (
        <footer className="footer">
            <img src={logo} alt="UniTutor" />
            <p className='copyright'>Copyright © 2022 UniTutor</p>
            <div className='footer_links'>
                <a target="blank" href="https://drive.google.com/file/d/165vu4pzH5FIyzA36kX4PKr7HYd_6Z4uk/view?usp=sharing">Manual de Usuario</a>
                <p>|</p>
                <Link to={'/about#policies'}>Políticas de Unitutor</Link>
                <p>|</p>
                <Link to={'/about#us'}>Sobre Nosotros</Link>
            </div>
            <div className="footer_contact">
                <p>Contáctanos:</p>
                <div className="footer_socials">
                    <a target="blank" href="https://twitter.com/unitutor_app">
                        <img alt='Twitter' src={twitter} />
                    </a>
                    <a target="blank" href="https://www.instagram.com/unitutor.app/">
                        <img alt='Instagram' src={instagram} />
                    </a>
                    <a target="blank" href="https://www.linkedin.com/in/unitutor-app-916040258/">
                        <img alt='LinkedIn' src={linkedIn} />
                    </a>
                </div>
                <p>
                    unitutor.contacto@gmail.com
                </p>
            </div>
            
            <div className="footer_donate">
                <p>¿Quieres apoyarnos? Dona aquí:</p>
                <a target="blank" href="https://www.paypal.com/donate/?hosted_button_id=QD72WE6WPBXDA">
                    <img alt='PayPal' src={paypal}/>
                </a>
            </div>
        </footer>
    )
}

export default Footer