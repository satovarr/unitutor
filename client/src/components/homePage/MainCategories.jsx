import '../../styles/componentStyles/mainCategories.css'
import Category from '../Category'
import { Link } from 'react-router-dom'

const MainCategories = () => {
    
    const testCategories = [
        {
            id: 1,
            category_name: "Category 1",
            subcategories: [
                { id: 1, name: "Subcategory 1" },
                { id: 2, name: "Subcategory 2" },
                { id: 3, name: "Subcategory 3" },
                { id: 4, name: "Subcategory 4" }
            ]
        },
        {
            id: 2,
            category_name: "Category 2",
            subcategories: [
                {
                    id: 5,
                    name: "Subcategory 1",
                    imgSrc: "https://firebasestorage.googleapis.com/v0/b/unitutor-f0c21.appspot.com/o/content%2Ftesting_pic2.jpg?alt=media&token=670f9675-8767-4f9c-b21d-5cfb95f4a533"
                },
                { id: 6, name: "Subcategory 2" },
                { id: 7, name: "Subcategory 3" }
            ]
        },
    ]

    return (
        <section className='mainCategories'>
            <h3>Principales categorías</h3>
            <Category 
                category_name={testCategories[0].category_name}
                subcategories={testCategories[0].subcategories}
            />
            <Category
                category_name={testCategories[1].category_name}
                subcategories={testCategories[1].subcategories}
            />
            <Link to='/category' className='view_all'>Ver todas las categorías</Link>
        </section>
    )
}

export default MainCategories