import { Link } from 'react-router-dom'
import '../styles/componentStyles/category.css'
import SubCategory from "./SubCategory"

const Category = ({ category_name="Random Categorie", subcategories }) => {
    return (
        <div className="main_category">
            <div className='category_heading'>
                <h4>{category_name}</h4>
                <Link to={`/${category_name}`}>Ver todo</Link>
            </div>
            <div className='subcategories_container'>
                {
                    subcategories.map(subcategory => (
                        <SubCategory
                            key={subcategory.id}
                            category_name={category_name}
                            subcategory={subcategory}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default Category