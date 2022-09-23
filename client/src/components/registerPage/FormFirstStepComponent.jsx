import React, { useEffect, useState } from 'react'
import Button from '../Button'
import { PasswordField } from './PasswordField'
import { InputGroup } from './InputGroup'
import { GoogleButton } from '../Button'

export const FormFirstStepComponent = ( {info, setInfo, setFirstStep, display}) => {  
  
    //are the email an password valid?
    const initialValidation = {
        email: false,
        pass: false,
    }

    // validation state
    const [isValid, setIsValid] = useState(initialValidation);
    
    // go-to-second-step button. It works only if validations are true
    const handleClick = ( event ) => {
        event.preventDefault();
        setFirstStep(false);
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
        //email must contain username+@+domain
        if( /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(info.email) ){
            setIsValid({...isValid, email: true});
        } else {
            setIsValid({...isValid, email: false});
            //
            //
            //TODO: ERROR MESSAGE
            //
            //
        }
    }, [info.email]);

    //Password validation
    useEffect(() => {
        //Must have at least 8 characters, 1upper case letter, 1lower case letter, 1 number and an special character.
        if ( /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&+-^_])[A-Za-z\d@$!%*?&+-^_]{8,}$/.test(info.pass) ){
            if( (info.pass && info.passConfirm) && (info.pass === info.passConfirm)){
                setIsValid({...isValid, pass: true});
            } else {
                //
                //
                //TODO: ERROR MESSAGE (CONTRASEÑAS NO COINCIDEN - passConfirmError)
                //
                //
                setIsValid({...isValid, pass: false});
            }
        } else {
            //
            //
            //TODO: ERROR MESSAGE (validación contraseña - passError)
            //
            //
            setIsValid({...isValid, pass: false});
        }
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
            />
        </div>    

        <PasswordField 
            onChange={onInputChange}
            values={[info.pass, info.passConfirm]}
            names={['pass', 'passConfirm']}
        />
        {/* <div>
            <label htmlFor="pass">Contraseña</label>
            <input
                type="password" 
                value={info.pass}
                placeholder="Ingresa la contraseña"
                id="pass"
                name="pass"
                onChange={onInputChange}
            />
            <p id='passError'>Tu contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un caracter especial.</p>
            <input
                type="password" 
                value={info.passConfirm}
                placeholder="Confirma la contraseña"
                id="passConfirm"
                name="passConfirm"
                onChange={onInputChange}
            />
            <p id='confirmPassError'>Las contraseñas no coinciden</p>
        </div> */}

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
