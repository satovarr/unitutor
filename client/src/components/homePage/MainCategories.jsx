import '../../styles/componentStyles/mainCategories.css'
import Category from '../Category'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getCategories } from '../../services/categories'

const MainCategories = () => {
    
    const [categories, setCategories] = useState()

    //get categories
    useEffect(() => {
        getCategories()
            .then(results => {
                if (results) {
                    setCategories(results)
                }
            })
            .catch()
    }, [])

    return (
        <section className='mainCategories'>
            <h3>Principales categorías</h3>
            {
                categories ?
                <>
                        <Category
                            category={categories[0]}
                            all={false}
                        />
                        <Category
                            category={categories[1]}
                            all={false}
                        />
                        <Category
                            category={categories[2]}
                            all={false}
                        />
                </>
                : <></>
            }
            
            <Link to='/categories' className='view_all'>Ver todas las categorías</Link>
        </section>
    )
}

export default MainCategories