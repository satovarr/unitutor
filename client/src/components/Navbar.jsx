import '../styles/componentStyles/inputs.css'
import '../styles/componentStyles/buttons.css'
import '../styles/componentStyles/navBar.css'
import Button from './Button'
import notification from '../imgs/notification.svg'
import profile from '../imgs/profile.svg'
import logout from '../imgs/logout.svg'
import burgerMenu from '../imgs/burgerMenu.svg'
import { Link } from 'react-router-dom'

const Navbar = ({ goRegister, session, handleLogin, handleLogout }) => {

    //TODO: define how we are going to handle notifications in the future
    // const testNotifications = [
    //     {id: 1, content: 'notification a'}, 
    //     {id:2, content: 'notification b'},
    //     {id:3, content:'notification c'},
    //     {id: 4, content:'notification d'}
    // ]
    const testNotifications = []

    const toggleDropdown = ({ target }) => {
        let dropdown_container = target.parentElement.parentElement
        let dropdown_content = dropdown_container.querySelector('.content')
        dropdown_content.classList.toggle('hidden')
    }

    return (
        <nav className='navBar'>
            <div className="nav_content">
                <img className="nav__logo" alt="UniTutor Logo" />
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
                {// TODO: Login dropdown and responsive menu  
                }
                <div className='nav__session'>
                    <span className='nav_burger-menu'>
                        <img src={burgerMenu} alt="Menu"></img>
                    </span>
                    {
                        session ?
                            <div className='nav_menu'>
                                <Link to='/chats'>Mis Conversaciones</Link>
                                <Link to='/tutorships'>Mis Tutorías</Link>
                                <Link to='/about'>Sobre Nosotros</Link>
                                <div className="nav_dropdown container">
                                    <button className="nav_icon-button" onClick={toggleDropdown}>
                                        <img src={notification} alt="notifications" width="24" height="24" />
                                        <span
                                            className="nav_notification-number"
                                            style={{ display: testNotifications.length > 0 ? '' : 'none' }}
                                        >
                                            {testNotifications.length}
                                        </span>
                                    </button>
                                    <div className="nav_dropdown content hidden" >
                                        {   testNotifications.length > 0 ?
                                                testNotifications.map(notification => (
                                                    <p key={notification.id}>{notification.content}</p>
                                                )

                                                )
                                            :
                                                <p>No tienes notificaciones</p>
                                        }
                                    </div>
                                </div>
                                <div className="nav_dropdown container">
                                    <button className="nav_icon-button" onClick={toggleDropdown}>
                                        <img src={profile} alt="profile" width="24" height="24" />
                                    </button>
                                    <div className="nav_dropdown content profile hidden">
                                        <button onClick={handleLogout}>
                                            <span>Cerrar sesión</span>
                                            <img src={logout} alt=""></img>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            :
                            <div className='nav_menu'>
                                <Button text={'Regístrate'} type={'Secondary'} handleClick={goRegister} />
                                <Button text={'Ingresa'} handleClick={handleLogin} />
                                <Link to='/forgotAccount'>¿Olvidaste tu cuenta?</Link>
                            </div>
                    }

                </div>
            </div>
            
        </nav>
    )
}

export default Navbar