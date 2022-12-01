import React, { useEffect, useState } from 'react'
import Button from '../Button'
import { PasswordField } from '../PasswordField'
import { InputGroup } from '../InputGroup'
import { GoogleButton } from '../Button'
import { auth, createUserWithEmailAndPassword, provider, signInWithRedirect, getRedirectResult } from '../../services/firebase'
import { useNavigate } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'

export const FormFirstStepComponent = ({ info, setInfo, setFirstStep, handleModalChange}) => {  
  
    //are the email an password valid?
    const initialValidation = {
        email: false,
        pass: false,
    }

    // validation state
    const [isValid, setIsValid] = useState(initialValidation);
    const [errorMessageObj, setErrorMessageObj] = useState({});

    const navigate = useNavigate();

    //Get google register results
    useEffect(() => {
        getRedirectResult(auth)
            .then(result => {
                if(result) {
                    let userInfo = result.user
                    let createdAtMins = Number(userInfo.metadata.createdAt)
                    let lastLoginAtMins = Number(userInfo.metadata.lastLoginAt)

                    //Letting maximum difference between creation and last login to be 30s to be
                    // considered a newly created account, else, it is assumed the account was already created
                    if ((lastLoginAtMins - createdAtMins) <= 1) {
                        setInfo({
                            ...info,
                            email: userInfo.email,
                            profilePic: userInfo.photoURL,
                            name: userInfo.displayName,
                            userCredential: userInfo
                        })
                        setFirstStep(false);
                    }
                    else {
                        handleModalChange({
                            active: true,
                            isWarning: true,
                            message: 'Usuario ya existe',
                            message_description: 'Este usuario ya existe, iniciando sesión...'
                        })
                        setTimeout(() => navigate('/'), 4000);
                    }
                }
            })
            .catch(error => {
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
        
    }, [])
    
    // go-to-second-step button. It works only if validations are true
    const handleClick = ( event ) => {
        event.preventDefault();
        createUserWithEmailAndPassword(auth, info.email, info.pass)
            .then(userCredential => {
                setInfo({...info, userCredential: userCredential.user});
                setFirstStep(false);
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    setIsValid({ ...isValid, email: false });
                    setErrorMessageObj({...errorMessageObj, email_error: 'Correo ya está registrado'});
                }
                
            })
        // 
    }

    // Registration with Google
    const handleGoogleClick = ( event ) => {
        event.preventDefault();
        signInWithRedirect(auth, provider);
    }

    // Changes info state
    const onInputChange = ( { target } ) =>{
        const { name, value } = target;
        setInfo({...info, [ name ] : value });
    }

    //Email validation
    useEffect(() => {
        let newErrorMessageObj = errorMessageObj
        //email must contain username+@+domain
        if( /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(info.email) ){
            delete errorMessageObj.email_error
            setIsValid({...isValid, email: true});
        } else {
            setIsValid({...isValid, email: false});
            newErrorMessageObj.email_error= 'Correo debe contener usuario+@+dominio.'
        }
        setErrorMessageObj(newErrorMessageObj)
    }, [info.email]);

    //Password validation
    useEffect(() => {
        let newErrorMessageObj = errorMessageObj
        //Must have at least 8 characters, 1upper case letter, 1lower case letter, 1 number and an special character.
        if ( /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$+!%*?&_])[A-Za-z\d@$+!%*?&_]{8,}$/.test(info.pass) ){
            delete newErrorMessageObj.password_error

            if( (info.pass && info.passConfirm) && (info.pass === info.passConfirm)){
                setIsValid({...isValid, pass: true});
                delete newErrorMessageObj.confirmation_error
            } else {
                newErrorMessageObj.confirmation_error = 'Contraseñas no coinciden.'
                setIsValid({...isValid, pass: false});
            }
        } else {
            newErrorMessageObj.password_error = 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un caracter especial (@$+!%*?&_).'
            setIsValid({...isValid, pass: false});
        }
        setErrorMessageObj(newErrorMessageObj)
    }, [info.pass, info.passConfirm])
    
  return (
    <div>
        <div className='form-mail-input'>
            <InputGroup
                label="Correo electrónico"
                id="email"
                placeholder="Ej: deivid232@gmail.com"
                type="text"
                value={info.email}
                onChange={onInputChange}
                name={'email'}
                error={errorMessageObj.email_error}
                add_classes={'reg_input'}
            />
        </div>    

        <PasswordField 
            onChange={onInputChange}
            values={[info.pass, info.passConfirm]}
            names={ ['pass', 'passConfirm'] }
            password_error = {errorMessageObj.password_error}
              confirmation_error={errorMessageObj.confirmation_error}
        />

        <p>Al hacer uso de nuestros servicios, estás aceptando <HashLink to="/about#policies" target="blank">nuestras condiciones</HashLink></p>

        <div className='buttonsContainer line'>
                <Button text={'Continuar con el correo'}
                    type={'Primary'}
                    handleClick={handleClick}
                    disabled={!(isValid.email && isValid.pass)} />
                <GoogleButton text={'Continuar con Google'}
                    type={'Primary'}
                    handleClick={handleGoogleClick} />
        </div>
    </div>
  )
}
