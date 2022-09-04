import React from 'react'
import { InputGroup } from './InputGroup'
import { PasswordField } from './PasswordField'
import Button from './Button'
import { GoogleButton } from './Button'

export const FormFirstStepComponent = ( {email, setEmail, emailValidation, setFirstStep}) => {  
  
    const handleClick = ( event ) => {
        event.preventDefault();
        setFirstStep(false);
    }

    return (
    <>
        <div className='form-mail-input'>
            <InputGroup
                label="Correo electrónico"
                id="email"
                placeholder="Ej: deivid232@gmail.com"
                type="text"
                state={email}
                setState={setEmail}
                handleBlur={emailValidation}

            />
        </div>

        <PasswordField/>

        <div className='buttonsContainer'>
                <Button text={'Continuar con el correo'}
                    type={'Primary'}
                    handleClick={handleClick} />
                <GoogleButton text={'Continuar con Google'}
                    type={'Primary'}
                    handleClick={handleClick} />
        </div>
    </>
  )
}
