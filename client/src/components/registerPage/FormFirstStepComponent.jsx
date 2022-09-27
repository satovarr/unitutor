import React, { useEffect, useState } from 'react'
import Button from '../Button'
import { PasswordField } from './PasswordField'
import { InputGroup } from './InputGroup'
import { GoogleButton } from '../Button'
import { auth, createUserWithEmailAndPassword } from '../../services/firebase'

export const FormFirstStepComponent = ( {info, setInfo, setFirstStep, display}) => {  
  
    //are the email an password valid?
    const initialValidation = {
        email: false,
        pass: false,
    }

    // validation state
    const [isValid, setIsValid] = useState(initialValidation);
    const [errorMessageObj, setErrorMessageObj] = useState({});
    
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
        //
        //
        // TODO: HANDLE GOOGLE REGISTER WITH FIREBASE
        //
        //
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
            />
        </div>    

        <PasswordField 
            onChange={onInputChange}
            values={[info.pass, info.passConfirm]}
            names={ ['pass', 'passConfirm'] }
            password_error = {errorMessageObj.password_error}
              confirmation_error={errorMessageObj.confirmation_error}
        />

        <div className='buttonsContainer'>
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
