import React, { useEffect, useState } from 'react'
import Button from './Button'
import { GoogleButton } from './Button'

export const FormFirstStepComponent = ( {info, setInfo, setFirstStep, display}) => {  
  
    const initialValidation = {
        email: false,
        pass: false,
    }

    const [isValid, setIsValid] = useState(initialValidation);
    
    
    const handleClick = ( event ) => {
        event.preventDefault();
        setFirstStep(false);
    }


    const onInputChange = ( { target } ) =>{
        const { name, value } = target;
        setInfo({...info, [ name ] : value });
    }

    useEffect(() => {
      if( /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(info.email) ){
        setIsValid({...isValid, email: true});
      } else {
        setIsValid({...isValid, email: false});
        //TODO: ERROR MESSAGE
      }
    }, [info.email]);

    useEffect(() => {
        //TODO: COMPLETE VALIDATION
        if( (info.pass && info.passConfirm) && (info.pass === info.passConfirm)){
            setIsValid({...isValid, pass: true});
        } else {
            //TODO: ERROR MESSAGE
            setIsValid({...isValid, pass: false});
        }
      
    }, [info.pass, info.passConfirm])
    
  return (
    <div  className="FormSection form-mail-input" style={display? {display: "flex"}:{display: "none"}}>
        <div>
            <label htmlFor="email">Correo Electrónico</label>
            <input
                type="text" 
                value={info.email}
                placeholder="Ej: deivid232@gmail.com"
                id="email"
                name="email"
                onChange={onInputChange}
            />
        </div>

        <div>
            <label htmlFor="pass">Contraseña</label>
            <input
                type="password" 
                value={info.pass}
                placeholder="Ingresa la contraseña"
                id="pass"
                name="pass"
                onChange={onInputChange}
            />
            <input
                type="password" 
                value={info.passConfirm}
                placeholder="Confirma la contraseña"
                id="passConfirm"
                name="passConfirm"
                onChange={onInputChange}
            />
        </div>

        <div className='buttonsContainer'>
                <Button text={'Continuar con el correo'}
                    type={'Primary'}
                    handleClick={handleClick} />
                <GoogleButton text={'Continuar con Google'}
                    type={'Primary'}
                    handleClick={handleClick} />
        </div>
    </div>
  )
}
