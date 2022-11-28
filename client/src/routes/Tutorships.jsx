import { useContext, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import TutorshipsContainer from "../components/TutorshipsContainer"
import book from '../imgs/book.svg'
import Navbar from '../components/Navbar'
import '../styles/Tutorships.css'
import Footer from "../components/Footer"
import { useState } from "react"
import { getUserTutorships } from "../services/tutorships"
import { getUserPublicId } from "../services/users"
import { UserContext } from "../App"

const Tutorships = () => {
    
    const navigate = useNavigate()

    const { currentUser } = useContext(UserContext);

    //TODO: finish getting tutorships after endpoint error is fixed
    const [tutorships, setTutorships] = useState()

    //Redirect to home if there isn't an active session
    useEffect(() => {
        if (localStorage.getItem('activeSession') === 'false') {
            navigate('/')
        }
    }, [navigate])

    useEffect(() => {
        
        if(currentUser) {
            let tokenObject = { accessToken: currentUser.accessToken }
            getUserPublicId(tokenObject)
                .then(public_id => {
                    if (public_id) {
                        getUserTutorships(public_id)
                            .then(response => {
                                if (response) {
                                    setTutorships(response)
                                }
                            })
                    } 
                })
        }
        
    }, [currentUser])

    const createTutorship = () => {
        navigate('/tutorships/new')
    }

    return (
        <div className="tutorships main-page">
            <Navbar />
            <div className="tutorships container">
                <div className="tutorships content">
                    <h1>
                        <img alt="" src={book} />
                        Mis Tutorías
                    </h1>
                    <div className="tutorships cards-container">
                        {
                            Array.isArray(tutorships) && tutorships?.length > 0?
                                <TutorshipsContainer tutorships={tutorships} own={true}/>
                                : <p className="no_tutorships">
                                    Aún no has creado ninguna tutoría <Link to='/tutorships/new'>¿Quieres crear una?</Link>
                                </p>
                        }

                        <button className="tutorships add" onClick={createTutorship}>
                            <svg viewBox="0 0 55 55" xmlns="http://www.w3.org/2000/svg">
                                <path d="M27.5002 50.4168C40.1567 50.4168 50.4168 40.1567 50.4168 27.5002C50.4168 14.8436 40.1567 4.5835 27.5002 4.5835C14.8436 4.5835 4.5835 14.8436 4.5835 27.5002C4.5835 40.1567 14.8436 50.4168 27.5002 50.4168Z" strokeWidth="2" strokeLinejoin="round" />
                                <path d="M27.5 18.3335V36.6668" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M18.3335 27.5H36.6668" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>

                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Tutorships