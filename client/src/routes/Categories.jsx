import Category from '../components/Category'
import categoriesImg from '../imgs/categories.svg'
import Navbar from '../components/Navbar'
import '../styles/Categories.css'
import Footer from "../components/Footer"
import { useEffect, useState } from 'react'
import { getCategories } from '../services/categories'
import Modal from '../components/Modal'

const Categories = () => {

    const [categories, setCategories] = useState()
    const [modalParams, setModalParams] = useState()

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
                if(results) {
                    setCategories(results)
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
                <div className="categories content">
                    <h1>
                        <img alt="" src={categoriesImg} />
                        Categorías
                    </h1>
                    {
                        categories ? 
                            categories?.map(category => (
                                <Category key={category.cat_id}
                                    category={category}
                                />
                            ))
                        : <p>Cargando...</p>
                    }
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Categories