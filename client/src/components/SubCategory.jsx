import { Link } from 'react-router-dom'
import '../styles/componentStyles/subcategorie.css'

const SubCategory = ({ category, subcategory }) => {

    const testPic = 'https://firebasestorage.googleapis.com/v0/b/unitutor-f0c21.appspot.com/o/content%2FtestPic.jpg?alt=media&token=03d94c5c-44e9-4142-a3df-7106989ca5a1'

    return (
        <div className="main_subcategorie">
            <Link to={`/search${subcategory.subcat_id ? 
                '?category_id='+category?.cat_id +'&subcategory_id='+subcategory.subcat_id 
                : ''}`
                }>
                <img src={subcategory.imgSrc || testPic} alt={subcategory.name} loading='lazy' />
                <div className="subcategorie-name">
                    <p>{subcategory.name}</p>
                </div>
            </Link>
        </div>
    )
}

export default SubCategory