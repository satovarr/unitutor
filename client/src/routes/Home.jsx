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

    return (
        <div className="home_body">
            <Navbar auth={auth}/>
            <Banner navigate={navigate}/>
            <HowItWorks />
            <MainCategories />
            <Footer />
        </div>
    )
}

export default Home