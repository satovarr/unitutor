import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import Button from "../components/Button"
import Footer from "../components/Footer"
import Input from "../components/Input"
import { InputGroup } from "../components/InputGroup"
import Modal from "../components/Modal"
import Navbar from "../components/Navbar"
import TutorshipsContainer from "../components/TutorshipsContainer"
import { getCategories, getSubcategories } from "../services/categories"
import search from '../imgs/search-pink.svg'
import filter from '../imgs/filter.svg'
import '../styles/Search.css'
import { searchTutorships } from "../services/tutorships"

const Search = () => {
    //TODO: style some more if results are paginated
    const [searchParams, setSearchParams] = useSearchParams()
    const [params, setParams] = useState({})
    const [modalParams, setModalParams] = useState()
    const [categories, setCategories] = useState(null)
    //object that contains selected category and its subcategories
    const [selectedCat_subcats, setSelectedCat_subcats] = useState(null)
    
    const[searchResults, setSearchResults] = useState([])

    const navigate = useNavigate()

    //getParamsFromURL
    useEffect(() => {
        let navBarInput = document.getElementById('nav_search')
        let results = {}

        for (let entry of searchParams.entries()) {
            results[entry[0]] = entry[1]

        }

        navBarInput.value = results.name_tutoring || ''

        setParams(results)

        let stringParams = '?' + searchParams.toString()

        searchTutorships(stringParams)
            .then(searchData => {
                if(searchData) {
                    setSearchResults(searchData)
                }
                else {
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
            })

    }, [searchParams])

    //Get categories info
    useEffect(() => {

        if (!categories) {
            getCategories()
                .then(response => {
                    setCategories(response)
                    setSelectedCat_subcats({ ...selectedCat_subcats, loading: true })
                })
                .catch(() => {
                    handleModalChange({
                        active: true,
                        isSucessState: true,
                        success: false,
                        message: 'Ha ocurrido un error :(',
                        message_description: 'Revisa tu conexión a internet o intenta de nuevo más tarde',
                        isCloseable: true,
                        acceptButtonText: 'Vale'
                    })
                })
        }
    }, [])

    //Get subcategories info
    useEffect(() => {
        if (params.category_id !== '') {
            if (!selectedCat_subcats) {
                getSubcategories(params.category_id)
                    .then(response => {
                        setSelectedCat_subcats({ category_id: params.category_id, subcategories: response, loading: false })
                    })
                    .catch(() => {
                        handleModalChange({
                            active: true,
                            isSucessState: true,
                            success: false,
                            message: 'Ha ocurrido un error :(',
                            message_description: 'Revisa tu conexión a internet o intenta de nuevo más tarde',
                            isCloseable: true,
                            acceptButtonText: 'Vale'
                        })
                    })
            }

        }
        else {
            setSelectedCat_subcats(null)
        }

    }, [params])

    //Function to set modal params
    const handleModalChange = (modalParams) => {
        setModalParams(modalParams)
    }

    const onOptionChange = ({ target }) => {
        //Only change states if the options are different
        if (params[target.name] !== target.value) {
            //Clean subcategory selection if category changes
            if (target.name === 'category_id') {
                let dropped = params
                delete dropped['subcategory_id']
                setParams({ ...dropped, [target.name]: target.value })
                
            }
            else {
                setParams({ ...params, [target.name]: target.value })
            }

        }

    }

    const onPriceChange = ({ target }) => {
        if (/^\d*$/.test(target.value) && target.value.length <= 6) {
            setParams({ ...params, [target.name]: parseInt(target.value) || '' });
        }
    }

    const toggleFilters = () => {
        let dropdown = document.getElementById('filterDropdown')
        dropdown.classList.toggle('active')
    }

    const handleParamsChange = (event) => {
        event.preventDefault()
        toggleFilters()
        setSearchParams(params)
    }

    const cleanFilters = () => {
        let navBarInput = document.getElementById('nav_search')
        navBarInput.value = ''
        toggleFilters()
        setParams({})
        navigate('/search')
    }
    
    //Test tutorships
    const test = [
        {
            id: 1,
            name: 'Conceptos básicos de Python',
            price: 20000,
            category: 'Category',
            subcategory: 'Subcategory',
            user: {
                name: 'John Doe',
                photoURL: 'https://firebasestorage.googleapis.com/v0/b/unitutor-f0c21.appspot.com/o/user_content%2FH9E6LFjaB0Uf22g5QUIVg2iw1mF3.jpg?alt=media&token=9a060c08-5525-415f-8d2c-dac948b33fc9'
            }
        },
        {
            id: 2,
            name: 'Conceptos básicos de Python',
            price: 20000,
            category: 'Category',
            subcategory: 'Subcategory'
        },
        {
            id: 3,
            name: 'Conceptos básicos de Python',
            price: 20000,
            category: 'Category',
            subcategory: 'Subcategory'
        },
        {
            id: 4,
            name: 'Conceptos básicos de Python',
            price: 20000,
            category: 'Category',
            subcategory: 'Subcategory'
        },
        {
            id: 5,
            name: 'Conceptos básicos de Python',
            price: 20000,
            category: 'Category',
            subcategory: 'Subcategory'
        },
        {
            id: 6,
            name: 'Conceptos básicos de Python',
            price: 20000,
            category: 'Category',
            subcategory: 'Subcategory'
        },
        {
            id: 7,
            name: 'Conceptos básicos de Python',
            price: 20000,
            category: 'Category',
            subcategory: 'Subcategory'
        },
        {
            id: 8,
            name: 'Conceptos básicos de Python',
            price: 20000,
            category: 'Programación',
            subcategory: 'JavaScript'
        },
        {
            id: 9,
            name: 'Conceptos básicos de Python',
            price: 20000,
            category: 'Category',
            subcategory: 'Subcategory'
        },
    ]

    return (
        <div className="search page">
            <Modal
                {...modalParams}
                handleModalChange={handleModalChange}
            />
            <Navbar />
            <div className="search content">
                <h1>
                    <img alt="" src={search} />
                    {params?.name_tutoring || 'Búsqueda'}
                </h1>
                <div className="search results">
                    <div className="dropdown" id="filterDropdown">
                        <h2 onClick={toggleFilters}>
                            <img alt="" src={filter} />
                            Filtros
                        </h2>
                        <form onSubmit={handleParamsChange} className="search filters">
                            <InputGroup label="Categoría"
                                id="category"
                                placeholder={categories ? 'Categoría' : 'Cargando...'}
                                type="select"
                                name={'category_id'}
                                value={params.category_id}
                                onChange={onOptionChange}
                                options={categories && Array.isArray(categories)? categories.map(category => ({ value: category.cat_id, display: category.name })) : null}
                            />
                            <InputGroup
                                label="Subcategoría"
                                id="subcategory"
                                placeholder={
                                    selectedCat_subcats?.category_id ?
                                        selectedCat_subcats.loading ?
                                            'Cargando...'
                                            : 'Subcategoría'
                                        : 'Esperando categoría...'
                                }
                                type="select"
                                name={'subcategory_id'}
                                value={params.subcategory_id}
                                onChange={onOptionChange}
                                options={
                                    !selectedCat_subcats?.subcategories || selectedCat_subcats?.loading || !Array.isArray(selectedCat_subcats?.subcategories) ?
                                        null
                                        : selectedCat_subcats.subcategories.map(subcategory => ({ value: subcategory.subcat_id, display: subcategory.name }))
                                }
                            />
                            <div className="search price-filter">
                                <p>Precio</p>
                                <div className="price-inputs">
                                    <Input
                                        id="minprice"
                                        placeholder="Mínimo"
                                        type="text"
                                        name={'ut_value_min'}
                                        value={params.ut_value_min}
                                        onChange={onPriceChange}
                                    />
                                    <Input
                                        id="maxprice"
                                        placeholder="Máximo"
                                        type="text"
                                        name={'ut_value_max'}
                                        value={params.ut_value_max}
                                        onChange={onPriceChange}
                                    />
                                </div>
                            </div>

                            <div className="search actions">
                                <Button text={'Aplicar Filtros'}
                                    type={'Primary'}
                                />
                                <Button text={'Limpiar Filtros'}
                                    type={'Secondary'}
                                    additionalClass={'clean'}
                                    htmlType={'button'}
                                    handleClick={cleanFilters}
                                />
                            </div>
                        </form>
                    </div>
                    {
                        searchResults.length > 0 && Array.isArray(searchResults)?
                            <TutorshipsContainer tutorships={searchResults} />
                        : <p className="no-results">No se encontraron tutorías</p>
                    }
                    
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Search