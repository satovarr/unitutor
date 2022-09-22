import React from 'react'
import { useState } from 'react'
import Button from './Button';
import { InputGroup } from './InputGroup'
import Loader from '../../imgs/loader.svg'

export const FormSecondStepComponent = ( {info, setInfo, setFirstStep, display} ) => {
    const [image, setImage] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");

    const handleImageChange = ( {target} ) => {
        const modal = document.getElementById('image-load-modal')
        modal.classList.toggle('hidden')
        setImage(window.URL.createObjectURL(target.files[0]))

        //Added timeout to configure upload modal
        //TODO: Handle picture upload and use modal to
        //wait for upload to be completed successfully
        setTimeout(() => { modal.classList.toggle('hidden') }, 2000)
        setInfo({...info, profilePic: target.files[0] });
    }

    const handleClick = ( event ) => {
        event.preventDefault()
        setFirstStep(true)
    }

    const onNameChange = ( { target } ) => {
        setInfo({ ...info, name: target.value.trim() });
    }

    const onTelChange = ( { target } ) => {
        if(/^\d*$/.test(target.value) && target.value.length <= 10){
            setInfo({ ...info, tel: target.value });
        }
    }

    return (
        <>
            <span id="image-load-modal" className='hidden'>
                <div className='modal-card'>
                    <img src={Loader} alt='spinner'></img>
                    <p>Uploading picture...</p>
                </div>
            </span>
            <label htmlFor="profilepic" className="imageSelection">
                <img src={image} alt='' />
                <input id="profilepic" type="file" onChange={handleImageChange} />
                <span className="icon">
                    <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.5665 31.535C25.4356 31.535 31.8147 25.1558 31.8147 17.2867C31.8147 9.41761 25.4356 3.03845 17.5665 3.03845C9.69739 3.03845 3.31824 9.41761 3.31824 17.2867C3.31824 25.1558 9.69739 31.535 17.5665 31.535Z" fill="none" strokeLinejoin="round" />
                        <path d="M17.5665 11.5874V22.986" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M11.8672 17.2867H23.2658" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </span>
                <p>Foto de perfil</p>
            </label>
            <div className="second-form-inputs">
                <InputGroup
                    label="Nombre"
                    id="name"
                    placeholder="Ingresa nombre completo"
                    type="text"
                    value={info.name}
                    onChange={onNameChange}
                    name={'name'}
                />

                <InputGroup
                    label="Número de teléfono (opcional)"
                    id="tel"
                    placeholder="Ingresa número de teléfono"
                    type="text"
                    value={info.tel}
                    onChange={onTelChange}
                    name={'tel'}
                />

            </div> 

                <div className="buttonsContainer">
                    <Button htmlType={'submit'} text={'Crear Cuenta'} type={'Primary'} />
                    <Button text={'Volver'} type={'Primary'} handleClick={handleClick} additionalClass={'pink_button'} />
                </div>
        </>  
    )
}
