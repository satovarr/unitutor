import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
const Home = () => {

    const navigate = useNavigate()
    const [activeSession, setActiveSession] = useState(false)

    const goToRegister = () => {
        navigate('/register')
    }

    const handleLogin = () => {
        //To test navbar styles:
        setActiveSession(true)
        //TODO: Handle login logic
    }

    const handleLogout = () => {
        //To test styling:
        setActiveSession(false)
        //TODO: implement logout functionality by cleaning the session state
    }

    return (
        <div>
            <Navbar goRegister={goToRegister} session={activeSession} handleLogin={handleLogin} handleLogout={handleLogout}/>
            <p>Aquí va la home page</p>
            <Link to={'/register'}>Ir a registro</Link>
        </div>
    )
}

export default Home