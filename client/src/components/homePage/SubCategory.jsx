import { Link } from 'react-router-dom'
import testPic from '../../imgs/testPic.jpg'
import '../../styles/componentStyles/subcategorie.css'

const SubCategory = ({ category_name, subcategory = {name:'???', imgSrc:testPic} }) => {

    return (
        <div className="main_subcategorie">
            <Link to={`/${category_name}/${subcategory.name}`} />
            <img src={subcategory.imgSrc ? subcategory.imgSrc : testPic} alt={subcategory.name}></img>
            <p>{subcategory.name}</p>
        </div>
    )
}

export default SubCategory