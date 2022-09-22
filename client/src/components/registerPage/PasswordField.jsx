import React from 'react'
import PasswordInput from './PasswordInput'

export const PasswordField = ({onChange, names=['form-password', 'form-password-confirm'], values=['', '']}) => {
  return (
    <div className='password-field'>
      <div className='input-group'>
        <label htmlFor={names[0]}>Contraseña</label>
        <PasswordInput
          id={names[0]}
          placeholder={'Ingresa tu contraseña'}
          name={names[0]}
          value={values[0]}
          onChange={onChange}
        />
        <p id='passError'>Tu contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un caracter especial.</p>
      </div>
      <div>
        <PasswordInput
          id={names[1]}
          placeholder={'Confirma tu contraseña'}
          name={names[1]}
          value={values[1]}
          onChange={onChange}
        />
        <p id='confirmPassError'>Las contraseñas no coinciden</p>
      </div>
    </ div>
  )
}
