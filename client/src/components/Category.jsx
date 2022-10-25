import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getSubcategories } from '../services/categories'
import '../styles/componentStyles/category.css'
import SubCategory from "./SubCategory"

const Category = ({ category, all, hideName }) => {

    const [subcategories, setSubcategories] = useState()

    useEffect(() => {
        if(category) {
            getSubcategories(category.cat_id)
                .then(results => {
                    if(results) {
                        setSubcategories(all ? results: results.slice(0, 4))
                    }
                })
                .catch()
        }
        
    }, [])

    return (
        <div className="main_category">
            {
                hideName ?
                    <></>
                : <div className='category_heading'>
                        <h4>{category?.name || '???'}</h4>
                        <Link to={`/categories/${category?.cat_id || ''}`}>Ver todo</Link>
                    </div>
            }
            
            <div className='subcategories_container'>
                {
                    category && subcategories ?
                        subcategories.map(subcategory => (
                            <SubCategory
                                key={subcategory.subcat_id}
                                category={category}
                                subcategory={subcategory}
                            />
                        ))
                    : <></>
                }
            </div>
        </div>
    )
}

export default Category