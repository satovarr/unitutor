import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import price from '../imgs/price.svg'
import { getCategorybyId, getSubcategorybyId } from '../services/categories'
import '../styles/componentStyles/tutorship.css'
import Tag from './Tag'

const Tutorship = ({ own, tutorship }) => {

    const [category, setCategory] = useState()
    const [subcategory, setSubcategory] = useState()

    useEffect(() => {
        if(tutorship) {
            //TODO: get user after endpoint is ready
            getCategorybyId(tutorship.category_id)
                .then(response => {
                    if(response) {
                        setCategory(response)
                    }
                    
                })
                .catch()

            getSubcategorybyId(tutorship.subcategory_id)
                .then(response => {
                    if (response) {
                        setSubcategory(response)
                    }
                    
                })
                .catch()
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
                    <Tag type='primary' text={category?.name || 'Category'}/>
                    <Tag text={subcategory?.name || 'Subcategory'} />
                </div>
            </div>
        </Link>
        
    )
}

export default Tutorship