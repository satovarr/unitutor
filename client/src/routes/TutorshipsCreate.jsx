import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { InputGroup } from '../components/InputGroup'
import book from '../imgs/book.svg'
import Input from '../components/Input'
import '../styles/TutorshipsCreate.css'
import Button from '../components/Button'
import { useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'

const Tutorships_Create = () => {

    const [errorMessageObj, setErrorMessageObj] = useState({})
    const [formInfo, setFormInfo] = useState({})

    const navigate = useNavigate()

    //Redirect to home if there isn't an active session
    useEffect(() => {
        if (localStorage.getItem('activeSession') === 'false') {
            navigate('/')
        }
    }, [navigate])

    const testCategories = ['Matemáticas', 'Física', 'Química', 'Biología']
    const testSubcategories = ['Cálculo diferencial', 'Mecánica clásica', 'Química Orgánica', 'Algo e Biología']

    const onPriceChange = ({ target }) => {
        if (/^\d*$/.test(target.value) && target.value.length <= 6) {
            setFormInfo({ ...formInfo, price: parseInt(target.value) || '' });
        }
    }

    const onTextChange = ({ target }) => {
        let trimmedText_start = target.value.trimStart()
        setFormInfo({ ...formInfo, [target.name]: trimmedText_start });
    }

    const onTextBlur = ({ target }) => {
        if (formInfo[target.name]) {
            setFormInfo({ ...formInfo, [target.name]: formInfo[target.name].trimEnd() });
        }
        setErrorMessageObj({
            ...errorMessageObj,
            [target.name]: formInfo[target.name] === '' ? 'Debes rellenar este campo' : null
        })
    }

    const onOptionChange = ({ target }) => {
        setFormInfo({ ...formInfo, [target.name]: target.value });
    }

    const onOptionBlur = ({ target }) => {
        setErrorMessageObj({
            ...errorMessageObj,
            [target.name]: formInfo[target.name] === '' ? 'Debes rellenar este campo' : null
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        //TODO: send info to back
        console.log(formInfo)
    }

    const allowContinue = () => {

        return (formInfo?.name !== '') && 
            (formInfo.category && formInfo.category !== '' ) &&
            (formInfo.subcategory && formInfo.subcategory !== '') &&
            (formInfo.description && formInfo.description !== '') &&
            (formInfo.price && formInfo.price !== '');
    }

    const goBack = () => {
        navigate(-1)
    }

    return(
        <div>
            <Navbar />
            <div className="tutorship-form container">
                <h1>
                    <img src={book} alt="" />
                    Crear Tutoría
                </h1>
                <form className="tutorship-form content" onSubmit={handleSubmit}>
                    <div className="tutorship-form field">
                        <h2>Nombre</h2>
                        <InputGroup label="¿Qué Nombre le quieres dar a la tutoría?"
                            id="name"
                            placeholder="Nombra la tutoría"
                            type="text"
                            name={'name'}
                            value={formInfo.name}
                            onChange={onTextChange}
                            error={errorMessageObj.name}
                            onBlur={onTextBlur}
                        />
                    </div>
                    <div className="tutorship-form field">
                        <h2>Categoría</h2>
                        <InputGroup label="¿A qué categoría y subcategoría pertenece la tutoría que quieres ofertar?"
                            id="category"
                            placeholder="Selecciona una categoría"
                            type="select"
                            name={'category'}
                            value={formInfo.category}
                            error={errorMessageObj.category}
                            onChange={onOptionChange}
                            options={testCategories.map(category => ({ value: category, display: category }))}
                            onBlur={onOptionBlur}
                        />
                        <Input
                            id="subcategory"
                            placeholder="Selecciona una subcategoría"
                            type="select"
                            name={'subcategory'}
                            value={formInfo.subcategory}
                            error={errorMessageObj.subcategory}
                            onChange={onOptionChange}
                            options={testSubcategories.map(subcategory => ({ value: subcategory, display: subcategory }))}
                            onBlur={onOptionBlur}
                        />
                    </div>
                    
                    <div className="tutorship-form field">
                        <h2>Descripción</h2>
                        <label htmlFor='description'>Describe brevemente la tutoría</label>
                        <textarea id="description"
                            maxLength="250"
                            className='input'
                            placeholder='Describe la tutoría'
                            value={formInfo.description}
                            onChange={onTextChange}
                            name='description'
                        />
                    </div>
                    
                    <div className="tutorship-form field">
                        <h2>Precio</h2>
                        <InputGroup label="Finalmente, pónle precio por hora a la tutoría"
                            id="price"
                            placeholder="Precio por hora de la tutoría"
                            type="text"
                            name={'price'}
                            error={errorMessageObj.price}
                            value={formInfo.price}
                            onChange={onPriceChange}
                        />
                    </div>
                    
                    <div className="tutorship-form actions">
                        <Button text={'Volver'}
                            type={'Secondary'}
                            additionalClass={'back'}
                            htmlType={'button'}
                            handleClick={goBack}
                        />
                        <Button text={'Crear Tutoría'}
                            type={'Primary'}
                            disabled={!(allowContinue())}
                        />
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    )
}

export default Tutorships_Create