import React from 'react'
import { InputGroup } from './InputGroup'
import { PasswordInput } from './PasswordInput'

export const FormFirstStepComponent = ( {email, setEmail, emailValidation, setFirstStep}) => {  
  
    const handleClick = ( event ) => {
        event.preventDefault();
        setFirstStep(false);
    }

    return (
    <>
        <InputGroup
            label="Correo electrónico"
            id="email"
            placeholder="Ej: deivid232@gmail.com"
            type="text"
            state={email}
            setState={setEmail}
            handleBlur={emailValidation}
        
        />

        <PasswordInput/>

        <button onClick={handleClick}> continuar con el correo </button>
    </>
  )
}
