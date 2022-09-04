import React from 'react'
import { useState } from 'react'
import { InputGroup } from './InputGroup'

export const FormSecondStepComponent = ( {name, setName, tel, setTel, setFirstStep} ) => {
    const [image, setImage] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");

    const handleImageChange = ( {target} ) => {
        setImage(window.URL.createObjectURL(target.files[0]));
    }

    const handleClick = ( event ) => {
        event.preventDefault();
        setFirstStep(true);
    }

    return (
        <>
            <img src={image} alt='' style={{width: '100px'}}/>
            <input id="profilepic" type="file" onChange={handleImageChange}/>
            <InputGroup
                label="Nombre"
                id="name"
                placeholder="Ingresa nombre completo"
                type="text"
                state={name}
                setState={setName}
            />

            <InputGroup
                label="Número de teléfono (opcional)"
                id="tel"
                placeholder="Ingresa número de teléfono"
                type="text"
                state={tel}
                setState={setTel}
            />

            <button type='submit'>Crear cuenta</button>
            <button onClick={handleClick}>Volver</button>
        </>
    )
}
