import React from 'react'
import { useState } from 'react'
import Button from '../Button';
import { InputGroup } from './InputGroup'
import { storage, ref, uploadBytesResumable, getDownloadURL } from '../../services/firebase';

export const FormSecondStepComponent = ({ info, setInfo, handleModalChange } ) => {

    const defaultPic = 'https://firebasestorage.googleapis.com/v0/b/unitutor-f0c21.appspot.com/o/content%2Fdefault_avatar.png?alt=media&token=04f223db-eb55-4632-9fcf-5a4457cdd655'

    const [image, setImage] = useState(
        info.profilePic !== ''
            ? info.profilePic
            : defaultPic
        );
    const [nameError, setNameError] = useState(info.name ? null : 'Debes rellenar este campo')

    const handleImageChange = async ( {target} ) => {
        let image = target.files[0]
        if(image) {
            if (image.type === 'image/png' || image.type === 'image/jpeg') {
                let extension = image.name.slice(-4)
                //Uploading to firebase storage
                let userContentRef = ref(storage, '/user_content/' + info.userCredential.uid + extension)
                const metadata = {
                    contentType: image.type
                }

                handleModalChange({
                    active: true,
                    isLoading: true,
                    message: 'Subiendo imagen...'
                })
                //Starting upload
                let uploadTask = uploadBytesResumable(userContentRef, image, metadata)
                uploadTask.on('state_changed',
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        
                    }, 
                    (error) => {
                        handleModalChange({
                            active: true,
                            isSucessState: true,
                            success: false,
                            message: 'Ha ocurrido un error :(',
                            message_description: 'Revisa tu conexión a internet o intenta de nuevo más tarde',
                            isCloseable: true,
                            acceptButtonText: 'Vale'
                        })
                    },
                    () => {
                        //Upload was a success
                        getDownloadURL(uploadTask.snapshot.ref)
                            .then(downloadURL => {
                                setInfo({...info, profilePic: downloadURL})
                                setImage(downloadURL)
                                handleModalChange({
                                    active: true,
                                    isSucessState: true,
                                    success: true,
                                    message: 'Carga exitosa',
                                    message_description: 'Tu imagen se ha subido sin problemas!'
                                })
                                setTimeout(() => {
                                    handleModalChange({
                                        active: false,
                                    })
                                }, 4000)
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
                )
            }
            else {
                handleModalChange({
                    active: true,
                    isSucessState: true,
                    success: false,
                    message: 'Formato de archivo incorrecto',
                    message_description: 'Archivo debe ser imagen jpg o png',
                    isCloseable: true,
                    acceptButtonText: 'Vale'
                })
            }
        }
        
        

        
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

    return (
        <>
            <label htmlFor="profilepic" className="imageSelection">
                <img src={image} alt='profilePicture' referrerPolicy="no-referrer"/>
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
                    />
                </div>
        </>  
    )
}
