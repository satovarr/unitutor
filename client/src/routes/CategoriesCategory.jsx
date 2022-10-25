import Category from '../components/Category'
import Navbar from '../components/Navbar'
import '../styles/Categories.css'
import Footer from "../components/Footer"
import { useEffect, useState } from 'react'
import { getCategories } from '../services/categories'
import Modal from '../components/Modal'
import { useParams } from 'react-router-dom'

const CategoriesCategory = () => {

    const [category, setCategory] = useState()
    const [modalParams, setModalParams] = useState()

    const { cat_id } = useParams()

    const setModalError = () => {
        handleModalChange({
            active: true,
            isSucessState: true,
            success: false,
            message: 'Ha ocurrido un error :(',
            message_description: 'Revisa tu conexión a internet o intenta de nuevo más tarde',
            isCloseable: true,
            acceptButtonText: 'Vale'
        })
    }

    //get categories
    useEffect(() => {
        getCategories()
            .then(results => {
                if (results) {
                    setCategory(results.filter(category => category.cat_id === cat_id )[0])
                }
                else {
                    setModalError()
                }
            })
            .catch(setModalError)
    }, [])

    //Function to set modal params
    const handleModalChange = (modalParams) => {
        setModalParams(modalParams)
    }

    return (
        <div className="categories main-page">
            <Modal
                {...modalParams}
                handleModalChange={handleModalChange}
            />
            <Navbar />
            <div className="categories container">
                <div className="categories content category">
                    <h1>
                        {category?.name || 'Categoría no encontrada'}
                    </h1>
                    {
                        category ?
                            <Category key={category.cat_id}
                                category={category}
                                all={true}
                                hideName={true}
                            />
                            : <></>
                    }
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default CategoriesCategory