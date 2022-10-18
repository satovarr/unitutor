import React from 'react'
import PasswordInput from './PasswordInput'

export const PasswordField = ({
  onChange, 
  names = ['form-password', 'form-password-confirm'], 
  values=['', ''], 
  password_error,
  confirmation_error
}) => {
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
        <p id='passError' className='inputError' style={{'display': password_error ? '' : 'none'}}>
          {password_error || ''}
        </p>
      </div>
      <div>
        <PasswordInput
          id={names[1]}
          placeholder={'Confirma tu contraseña'}
          name={names[1]}
          value={values[1]}
          onChange={onChange}
        />
        <p id='confirmPassError' className='inputError' style={{ 'display': confirmation_error ? '' : 'none' }}>
          {confirmation_error || ''}
        </p>
      </div>
    </ div>
  )
}
