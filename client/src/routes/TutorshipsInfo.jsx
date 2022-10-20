import { useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import Footer from "../components/Footer"
import Navbar from '../components/Navbar'
import star_outer from '../imgs/star_outer.svg'
import star_inner from '../imgs/star_inner.svg'
import '../styles/TutorshipsInfo.css'
import Tag from "../components/Tag"
import price from '../imgs/price.svg'
import Button from "../components/Button"
import { getTutorshipbyId } from "../services/tutorships"
import { useState } from "react"
import { getCategorybyId, getSubcategorybyId } from "../services/categories"
import { getUserbyPublicId } from "../services/users"

const TutorshipsInfo = () => {

    const navigate = useNavigate()
    const [tutorship, setTutorship] = useState()
    const [category, setCategory] = useState()
    const [subcategory, setSubcategory] = useState()
    const [user, setUser] = useState()

    const { id } = useParams()

    const defaultPic = 'https://firebasestorage.googleapis.com/v0/b/unitutor-f0c21.appspot.com/o/content%2Fdefault_avatar.png?alt=media&token=04f223db-eb55-4632-9fcf-5a4457cdd655'

    //Get tutorship info
    useEffect(() => {
        getTutorshipbyId(id)
            .then(tutorshipData => {
                if(tutorshipData) {
                    setTutorship(tutorshipData)
                    
                    getCategorybyId(tutorshipData.category_id)
                        .then(response => {
                            if (response) {
                                setCategory(response)
                            }

                        })
                        .catch()

                    getSubcategorybyId(tutorshipData.subcategory_id)
                        .then(response => {
                            if (response) {
                                setSubcategory(response)
                            }

                        })
                        .catch()

                    getUserbyPublicId(tutorshipData.public_id)
                        .then(response => {
                            if (response) {
                                setUser(response)
                            }

                        })
                        .catch()
                }
            })
    }, [])

    const goBack = () => {
        navigate(-1)
    }

    const contactTutor = () => {
        //TODO: add logic when chat functionality is ready
        console.log('open chat with user')
    }

    //TODO: double check link after defining profile routing
    return(
        <div className="tutorshipInfo container">
            <Navbar />
            <h1>{tutorship?.name || 'No se ha encontrado la tutoría'}</h1>
            {
                tutorship ?
                    <div className="tutorshipInfo content">
                        <div className="userInfo">
                            <img src={user?.photo_url || defaultPic} alt='' load='lazy' referrerPolicy="no-referrer"/>
                            <Link to={`/profile/${tutorship?.public_id}`}>{user?.user_name || '???'}</Link>
                        </div>
                        <p className="tutorshipInfo description">{tutorship.description || '???'}</p>
                        <div className="tutorshipInfo rating">
                            <div className="star">
                                <img alt="" src={star_outer} className="outer" />
                                <span style={{ 'width': !tutorship.rating ? '0px' : tutorship.rating >= 1 ? '100%' : `${Math.round(tutorship.rating * 26)}px` }}>
                                    <img alt="" src={star_inner} className="inner" />
                                </span>
                            </div>
                            <div className="star">
                                <img alt="" src={star_outer} className="outer" />
                                <span style={{
                                    'width': (!tutorship.rating || tutorship.rating < 1) ?
                                        '0px'
                                        : tutorship.rating >= 2 ?
                                            '100%'
                                            : `${Math.round(tutorship.rating % 1 * 26)}px`
                                }}>
                                    <img alt="" src={star_inner} className="inner" />
                                </span>
                            </div>
                            <div className="star">
                                <img alt="" src={star_outer} className="outer" />
                                <span style={{
                                    'width': (!tutorship.rating || tutorship.rating < 2) ?
                                        '0px'
                                        : tutorship.rating >= 3 ?
                                            '100%'
                                            : `${Math.round(tutorship.rating % 1 * 26)}px`
                                }}>
                                    <img alt="" src={star_inner} className="inner" />
                                </span>
                            </div>
                            <div className="star">
                                <img alt="" src={star_outer} className="outer" />
                                <span style={{
                                    'width': (!tutorship.rating || tutorship.rating < 3) ?
                                        '0px'
                                        : tutorship.rating >= 4 ?
                                            '100%'
                                            : `${Math.round(tutorship.rating % 1 * 26)}px`
                                }}>
                                    <img alt="" src={star_inner} className="inner" />
                                </span>
                            </div>
                            <div className="star">
                                <img alt="" src={star_outer} className="outer" />
                                <span style={{
                                    'width': (!tutorship.rating || tutorship.rating < 4) ?
                                        '0px'
                                        : tutorship.rating >= 5 ?
                                            '100%'
                                            : `${Math.round(tutorship.rating % 1 * 26)}px`
                                }}>
                                    <img alt="" src={star_inner} className="inner" />
                                </span>
                            </div>
                            <p>{tutorship?.rating || 'sin calificaciones'}</p>
                        </div>
                        <div className="categories">
                            <Tag type='primary' text={category?.name || 'Category'} />
                            <Tag text={subcategory?.name || 'Subcategory'} />
                        </div>
                        <div className="price">
                            <img src={price} alt="price"></img>
                            <p>{`${tutorship?.ut_value || '???'} COP/h`}</p>
                        </div>
                        <div className="tutorshipInfo actions">
                            <Button text={'Volver'}
                                type={'Secondary'}
                                additionalClass={'back'}
                                handleClick={goBack}
                            />
                            <Button text={'Me Interesa Esta Tutoría'}
                                type={'Primary'}
                                handleClick={contactTutor}
                            />
                        </div>
                    </div>
                    : <></>
            }
            <Footer />
        </div>
    )
}

export default TutorshipsInfo