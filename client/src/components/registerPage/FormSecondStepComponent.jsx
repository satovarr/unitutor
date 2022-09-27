import React from 'react'
import { useState } from 'react'
import Button from '../Button';
import { InputGroup } from './InputGroup'
import Loader from '../../imgs/loader.svg'
import { storage, ref, uploadBytesResumable, getDownloadURL, auth, updateProfile } from '../../services/firebase';

export const FormSecondStepComponent = ( {info, setInfo, setFirstStep, display} ) => {
    const [image, setImage] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");
    const [nameError, setNameError] = useState('Debes rellenar este campo')

    const toggleModal = () => {
        let modal = document.getElementById('image-load-modal')
        modal.classList.toggle('hidden')
    }

    const closeModal = () => {
        let modal = document.getElementById('image-load-modal')
        modal.classList.add('hidden')
    }

    const setModalMessage = (error, newMessage) => {
        let message = document.getElementById('image-load-modal_message')
        let card = message.parentElement
        card.className = ''

        if (newMessage === '') {
            card.className = 'image-load'
            newMessage = 'Cargando imagen...'
        }
        else if (!error) {
            card.className = 'image-load-success'   
        }
        else {
            card.className = 'image-load-error'
        }

        message.innerText = newMessage
    }
    
    const handleImageChange = async ( {target} ) => {
        let image = target.files[0]
        if(image) {
            let message = ''
            if (image.type === 'image/png' || image.type === 'image/jpeg') {
                let extension = image.name.slice(-4)
                //Uploading to firebase storage
                let userContentRef = ref(storage, '/user_content/' + info.userCredential.uid + extension)
                const metadata = {
                    contentType: image.type
                }

                setModalMessage(false, message)
                toggleModal()
                //Starting upload
                let uploadTask = uploadBytesResumable(userContentRef, image, metadata)
                uploadTask.on('state_changed',
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        
                    }, 
                    (error) => {
                        message = 'Ocurrió un error :('
                        setModalMessage(true, message)
                    },
                    () => {
                        //Upload was a success
                        getDownloadURL(uploadTask.snapshot.ref)
                            .then(downloadURL => {
                                setInfo({...info, profilePic: downloadURL})
                                setImage(downloadURL)
                                message = 'Carga exitosa'
                                setModalMessage(false, message)
                                setTimeout(() => toggleModal(), 5000)
                            })
                            .catch(() => {
                                message = 'Ocurrió un error :('
                                setModalMessage(true, message)
                            })
                    }
                )
            }
            else {
                message = 'Archivo debe ser imagen jpg o png'
                setModalMessage(true, message)
                toggleModal()
            }
        }
        
        

        
    }

    const handleClick = ( event ) => {
        event.preventDefault()
        setFirstStep(true)
    }

    const onNameChange = ( { target } ) => {
        let trimmedName_start = target.value.trimStart()
        setInfo({ ...info, name:  trimmedName_start});
        setNameError(trimmedName_start === '' ? 'Debes rellenar este campo' : null)
    }

    const onTelChange = ( { target } ) => {
        if(/^\d*$/.test(target.value) && target.value.length <= 10){
            setInfo({ ...info, tel: target.value });
        }
    }

    const onNameFocusOut = () => {
        setInfo({ ...info, name: info.name.trimEnd() });
    }

    const handleSubmit = () => {
        const userData = {
            displayName: info.name,
            photoURL: info.profilePic
        }

        if (info.tel !== '') {
            userData['phoneNumber'] = info.tel
            console.log(userData)
        }

        updateProfile(auth.currentUser, userData)
            .then(() => {
                console.log(auth)
            })
    }

    return (
        <>
            <span id="image-load-modal" className='hidden'>
                <div id='modal-card'>
                    <img src={Loader} alt='spinner' className='loading'></img>
                    <p id="image-load-modal_message"></p>
                    <Button handleClick={closeModal} text='Vale'/>
                </div>
            </span>
            <label htmlFor="profilepic" className="imageSelection">
                <img src={image} alt='' />
                <input id="profilepic" type="file" accept="image/*" onChange={handleImageChange} />
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
                    error = {nameError}
                    onBlur={onNameFocusOut}
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
                    <Button 
                        htmlType={'submit'} 
                        text={'Crear Cuenta'} 
                        type={'Primary'} 
                        disabled={nameError}
                        handleClick={handleSubmit}
                    />
                    <Button text={'Volver'} type={'Primary'} handleClick={handleClick} additionalClass={'pink_button'} />
                </div>
        </>  
    )
}
