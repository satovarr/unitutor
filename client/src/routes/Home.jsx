import { useState } from "react"
import { useNavigate } from "react-router-dom"
import '../styles/Home.css'
import Navbar from "../components/Navbar"
import Banner from "../components/homePage/Banner"
import HowItWorks from "../components/homePage/HowItWorks"
import MainCategories from "../components/homePage/MainCategories"
import Footer from "../components/Footer"

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
        <div className="home_body">
            <Navbar goRegister={goToRegister} session={activeSession} handleLogin={handleLogin} handleLogout={handleLogout}/>
            <Banner />
            <HowItWorks />
            <MainCategories />
            <Footer />
        </div>
    )
}

export default Home