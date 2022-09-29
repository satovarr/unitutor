import { useNavigate } from "react-router-dom"
import '../styles/Home.css'
import Navbar from "../components/Navbar"
import Banner from "../components/homePage/Banner"
import HowItWorks from "../components/homePage/HowItWorks"
import MainCategories from "../components/homePage/MainCategories"
import Footer from "../components/Footer"
import { auth } from "../services/firebase"

const Home = () => {

    const navigate = useNavigate()

    const goToRegister = () => {
        navigate('/register')
    }

    return (
        <div className="home_body">
            <Navbar goRegister={goToRegister} navigate={navigate} auth={auth}/>
            <Banner />
            <HowItWorks />
            <MainCategories />
            <Footer />
        </div>
    )
}

export default Home