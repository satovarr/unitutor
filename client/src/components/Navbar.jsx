import '../styles/componentStyles/inputs.css'
import '../styles/componentStyles/buttons.css'
import '../styles/componentStyles/navBar.css'
import Button from './Button'
import logout from '../imgs/logout.svg'
import { Link, useNavigate } from 'react-router-dom'
import { signOut } from '../services/firebase.js'
import { useContext } from 'react'
import { UserContext } from '../App'

const Navbar = ({ goRegister, auth}) => {

    const navigate = useNavigate()

    const defaultPic = 'https://firebasestorage.googleapis.com/v0/b/unitutor-f0c21.appspot.com/o/content%2Fdefault_avatar.png?alt=media&token=04f223db-eb55-4632-9fcf-5a4457cdd655'

    //current user
    const { currentUser } = useContext(UserContext);

    const toggleDropdown = ({ target }) => {
        let dropdown_container = target.parentElement

        let dropdown_content = dropdown_container.querySelector('.content')

        dropdown_content.classList.toggle('hidden')

    }

    const openMenu = ({ target }) => {
        let nav_session = target.parentElement
        if (target.className === 'nav_open-session') {
            nav_session = nav_session.parentElement
        }
        nav_session.classList.remove('hidden')
    }

    const closeMenu = ({ target }) => {

        let nav_session = target.parentElement.parentElement
        if(target.classList.contains('session')) {
            nav_session = nav_session.parentElement
        }

        nav_session.classList.add('hidden')
    }

    const handleLogin = () => {
        navigate('/login')
    }

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                navigate('/')
            })
            .catch(error => {})
    }

    const goHome = () => {
        navigate('/')
    }

    return (
        <nav className='navBar'>
            <div className="nav_content">
                <img className="nav__logo" alt="UniTutor Logo" onClick={goHome}/>
                <div className="input__search container nav_search">
                    <input className="input input__search" type="text" placeholder="Busca tutorías" id="nav_search" />
                    <span className="input__search-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.5 19C15.1944 19 19 15.1944 19 10.5C19 5.8056 15.1944 2 10.5 2C5.8056 2 2 5.8056 2 10.5C2 15.1944 5.8056 19 10.5 19Z" fill="white" strokeWidth="2" strokeLinejoin="round" />
                            <path d="M13.3284 7.17155C12.6045 6.4477 11.6045 6 10.5 6C9.39544 6 8.39544 6.4477 7.67154 7.17155" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M16.6109 16.6109L20.8535 20.8535" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </span>
                </div>
                <div className='nav__session hidden'>
                    <span className={`nav_burger-menu ${!currentUser ? 'no-session': ''}`} onClick={openMenu}>
                        <svg viewBox="0 0 40 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 13.6667H35"  strokeWidth="2.5" strokeLinecap="round" />
                            <path d="M5 22H35" strokeWidth="2.5" strokeLinecap="round" />
                            <path d="M5 30.3333H35" strokeWidth="2.5" strokeLinecap="round" />
                        </svg>
                    </span>
                    {
                        currentUser ?
                            <div className="nav_dropdown container">
                                <span className='nav_open-session' onClick={openMenu}></span>
                                <button className="nav_icon-button" onClick={toggleDropdown}>
                                    <img 
                                        src={currentUser?.profilePic || defaultPic}
                                        alt="profile"
                                        referrerPolicy="no-referrer"
                                        id="nav_profile-pic"
                                    />
                                </button>
                                <div className='nav_menu'>
                                    <span className='nav_close-menu session' onClick={closeMenu}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M4 4L20 20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M4 20L20 4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </span>
                                    <div className="nav_dropdown content profile hidden">
                                        <p>Hola {currentUser.name?.split(' ')[0] || 'Usuario'}!</p>
                                        <Link to='/chats'>Mis Conversaciones</Link>
                                        <Link to='/tutorships'>Mis Tutorías</Link>
                                        <Link to='/about'>Sobre Nosotros</Link>
                                        <button onClick={handleLogout}>
                                            <span>Cerrar sesión</span>
                                            <img src={logout} alt=""></img>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            :
                            <div className='nav_menu'>
                                <span className='nav_close-menu' onClick={closeMenu}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4 4L20 20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M4 20L20 4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </span>
                                <Button text={'Regístrate'} type={'Secondary'} handleClick={goRegister} />
                                <Button text={'Ingresa'} handleClick={handleLogin} />
                                <Link to='/forgotPassword'>¿Olvidaste tu cuenta?</Link>
                            </div>
                    }

                </div>
            </div>
            
        </nav>
    )
}

export default Navbar