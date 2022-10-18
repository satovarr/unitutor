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

const TutorshipsInfo = () => {

    const navigate = useNavigate()
    //TODO: conect with backend to bring data
    const testTutorship = {
        id: 1,
        name: 'Conceptos básicos de Python',
        price: 20000,
        category: 'Programación',
        subcategory: 'Python',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sed tortor aliquet, facilisis ante vel, tempus libero. Proin sagittis egestas placerat. Nullam urna metus, posuere quis molestie at, tincidunt eget diam. Aliquam consequat metus ut ornare tincidunt. Vestibulum tristique diam nec scelerisque consequat. ',
        rating: 3.5,
        user: {
            publicId: 1,
            name: 'John Doe',
            photoURL: 'https://firebasestorage.googleapis.com/v0/b/unitutor-f0c21.appspot.com/o/user_content%2FH9E6LFjaB0Uf22g5QUIVg2iw1mF3.jpg?alt=media&token=9a060c08-5525-415f-8d2c-dac948b33fc9'
        }
    }

    const { id } = useParams()

    const defaultPic = 'https://firebasestorage.googleapis.com/v0/b/unitutor-f0c21.appspot.com/o/content%2Fdefault_avatar.png?alt=media&token=04f223db-eb55-4632-9fcf-5a4457cdd655'

    //Redirect to home if there isn't an active session
    useEffect(() => {
        if (localStorage.getItem('activeSession') === 'false') {
            navigate('/')
        }
    }, [navigate])

    const goBack = () => {
        navigate(-1)
    }

    const contactTutor = () => {
        //TODO: add logic when chat functionality is ready
        console.log('open chat with user', testTutorship.user.publicId)
    }

    console.log('got', id, 'as the id from the route params')

    console.log(Math.round(testTutorship.rating%1*100))
    //TODO: double check link after defining profile routing
    return(
        <div className="tutorshipInfo container">
            <Navbar />
            <h1>{ testTutorship.name || '???'}</h1>
            <div className="tutorshipInfo content">
                <div className="userInfo">
                    <img src={testTutorship?.user?.photoURL || defaultPic} alt='' load='lazy' />
                    <Link to={`/profile/${testTutorship?.user?.publicId}`}>{testTutorship?.user?.name || '???'}</Link>
                </div>
                <p className="tutorshipInfo description">{testTutorship.description || '???'}</p>
                <div className="tutorshipInfo rating">
                    <div className="star">
                        <img alt="" src={star_outer} className="outer"/>
                        <span style={{ 'width': !testTutorship.rating ? '0px' : testTutorship.rating >= 1 ? '100%' : `${Math.round(testTutorship.rating * 26)}px`}}>
                            <img alt="" src={star_inner} className="inner" />
                        </span>
                    </div>
                    <div className="star">
                        <img alt="" src={star_outer} className="outer"/>
                        <span style={{
                            'width': (!testTutorship.rating || testTutorship.rating < 1) ? 
                                '0px' 
                            : testTutorship.rating >= 2 ?
                                '100%' 
                                    : `${Math.round(testTutorship.rating%1 * 26) }px`
                        }}>
                            <img alt="" src={star_inner} className="inner" />
                        </span>
                    </div>
                    <div className="star">
                        <img alt="" src={star_outer} className="outer"/>
                        <span style={{
                            'width': (!testTutorship.rating || testTutorship.rating < 2) ? 
                                '0px' 
                            : testTutorship.rating >= 3 ?
                                '100%' 
                                    : `${Math.round(testTutorship.rating%1 * 26) }px`
                        }}>
                            <img alt="" src={star_inner} className="inner" />
                        </span>
                    </div>
                    <div className="star">
                        <img alt="" src={star_outer} className="outer"/>
                        <span style={{
                            'width': (!testTutorship.rating || testTutorship.rating < 3) ? 
                                '0px' 
                            : testTutorship.rating >= 4 ?
                                '100%' 
                                    : `${Math.round(testTutorship.rating%1 * 26) }px`
                        }}>
                            <img alt="" src={star_inner} className="inner" />
                        </span>
                    </div>
                    <div className="star">
                        <img alt="" src={star_outer} className="outer"/>
                        <span style={{
                            'width': (!testTutorship.rating || testTutorship.rating < 4) ? 
                                '0px' 
                            : testTutorship.rating >= 5 ?
                                '100%' 
                                    : `${Math.round(testTutorship.rating%1 * 26) }px`
                        }}>
                            <img alt="" src={star_inner} className="inner" />
                        </span>
                    </div>
                    <p>{testTutorship?.rating || 'sin calificaciones'}</p>
                </div>
                <div className="categories">
                    <Tag type='primary' text={testTutorship?.category || 'Category'} />
                    <Tag text={testTutorship?.subcategory || 'Category'} />
                </div>
                <div className="price">
                    <img src={price} alt="price"></img>
                    <p>{`${testTutorship?.price || '???'} COP/h`}</p>
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
            <Footer />
        </div>
    )
}

export default TutorshipsInfo