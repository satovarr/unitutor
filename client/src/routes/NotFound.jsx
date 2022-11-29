import logo from '../imgs/UniTutor_logo.svg'
import brokenPage from '../imgs/brokenpage.svg'
import '../styles/notFound.css'

const NotFound = () => {
    return (
        <div className="notfound">
            <div>
                <img alt='unitutor' src={logo} className="logo"/>
                <p className="heading">Ooops, 404! Tenemos un 404! </p>
                <p>La URL ingresada no se encontró en el servidor :(</p>
            </div>
            <img alt='error' src={brokenPage} className="brokenpage"/>
        </div>
    )
}

export default NotFound