import { Link } from 'react-router-dom'
import '../styles/componentStyles/subcategorie.css'

const SubCategory = ({ category_name, subcategory }) => {

    const testPic = 'https://firebasestorage.googleapis.com/v0/b/unitutor-f0c21.appspot.com/o/content%2FtestPic.jpg?alt=media&token=03d94c5c-44e9-4142-a3df-7106989ca5a1'

    return (
        <div className="main_subcategorie">
            <Link to={`/${category_name }/${subcategory.name || '???'}`}>
                <img src={subcategory.imgSrc || testPic} alt={subcategory.name} loading='lazy' />
            </Link>
            <p>{subcategory.name}</p>
        </div>
    )
}

export default SubCategory