import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import price from '../imgs/price.svg'
import '../styles/componentStyles/tutorship.css'
import Tag from './Tag'

const Tutorship = ({ own, tutorship }) => {

    const [user, setUser] = useState()
    const [category, setCategory] = useState()
    const [subcategory, setSubcategory] = useState()

    useEffect(() => {
        if(tutorship) {
            //TODO: get user, category and subcategory after endpoint is ready
        }
    }, [tutorship])

    const defaultPic = 'https://firebasestorage.googleapis.com/v0/b/unitutor-f0c21.appspot.com/o/content%2Fdefault_avatar.png?alt=media&token=04f223db-eb55-4632-9fcf-5a4457cdd655'

    return(
        <Link to={`/tutorships/${tutorship?.tutoring_id || ''}`} className="tutorship">
            <div className="container">
                <p className="heading">{tutorship?.name || '???'}</p>
                {
                    own ?
                        <></>
                    : <div className="userInfo">
                            <img src={tutorship?.user?.photoURL || defaultPic} alt='' load='lazy' />
                            <p>{tutorship?.user?.name || '???'}</p>
                        </div>
                }
                <div className="price">
                    <img src={price} alt="price"></img>
                    <p>{`${tutorship?.ut_value || '???'} COP/h`}</p>
                </div>
                <div className="categories">
                    <Tag type='primary' text={tutorship?.category || 'Category'}/>
                    <Tag text={tutorship?.subcategory || 'Category'} />
                </div>
            </div>
        </Link>
        
    )
}

export default Tutorship