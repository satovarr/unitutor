import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import TutorshipsContainer from "../components/TutorshipsContainer"
import book from '../imgs/book.svg'
import Navbar from '../components/Navbar'
import '../styles/Tutorships.css'
import Footer from "../components/Footer"
import { useState } from "react"
import { getUserTutorships } from "../services/tutorships"

const Tutorships = () => {
    
    const navigate = useNavigate()

    //TODO: change get tutorships from back
    //Test tutorships
    // const test = [
    //     {
    //         id: 1,
    //         name: 'Conceptos básicos de Python',
    //         price: 20000,
    //         category: 'Category',
    //         subcategory: 'Subcategory',
    //         user: {
    //             name: 'John Doe',
    //             photoURL: 'https://firebasestorage.googleapis.com/v0/b/unitutor-f0c21.appspot.com/o/user_content%2FH9E6LFjaB0Uf22g5QUIVg2iw1mF3.jpg?alt=media&token=9a060c08-5525-415f-8d2c-dac948b33fc9'
    //         }
    //     },
    //     {
    //         id: 2,
    //         name: 'Conceptos básicos de Python',
    //         price: 20000,
    //         category: 'Category',
    //         subcategory: 'Subcategory'
    //     },
    //     {
    //         id: 3,
    //         name: 'Conceptos básicos de Python',
    //         price: 20000,
    //         category: 'Category',
    //         subcategory: 'Subcategory'
    //     },
    //     {
    //         id: 4,
    //         name: 'Conceptos básicos de Python',
    //         price: 20000,
    //         category: 'Category',
    //         subcategory: 'Subcategory'
    //     },
    //     {
    //         id: 5,
    //         name: 'Conceptos básicos de Python',
    //         price: 20000,
    //         category: 'Category',
    //         subcategory: 'Subcategory'
    //     },
    //     {
    //         id: 6,
    //         name: 'Conceptos básicos de Python',
    //         price: 20000,
    //         category: 'Category',
    //         subcategory: 'Subcategory'
    //     },
    //     {
    //         id: 7,
    //         name: 'Conceptos básicos de Python',
    //         price: 20000,
    //         category: 'Category',
    //         subcategory: 'Subcategory'
    //     },
    //     {
    //         id: 8,
    //         name: 'Conceptos básicos de Python',
    //         price: 20000,
    //         category: 'Programación',
    //         subcategory: 'JavaScript'
    //     },
    //     {
    //         id: 9,
    //         name: 'Conceptos básicos de Python',
    //         price: 20000,
    //         category: 'Category',
    //         subcategory: 'Subcategory'
    //     },
    // ]
    // // const test = false
    const [tutorships, setTutorships] = useState()

    //Redirect to home if there isn't an active session
    useEffect(() => {
        if (localStorage.getItem('activeSession') === 'false') {
            navigate('/')
        }
    }, [navigate])

    useEffect(() => {
        getUserTutorships(2)
            .then(response => {
                if(response) {
                    setTutorships(response)
                }
            })
    }, [])

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
                            tutorships ?
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