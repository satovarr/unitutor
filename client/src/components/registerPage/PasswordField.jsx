import React from 'react'
import PasswordInput from './PasswordInput'

export const PasswordField = () => {
  return (
    <div className='password-field'>
      <div className='input-group'>
        <label htmlFor="form-password">Contraseña</label>
        <PasswordInput id={'form-password'} placeholder={'Ingresa tu contraseña'}/>
      </div>
      <PasswordInput id={'form-password-confirm'} placeholder={'Confirma tu contraseña'} />
    </ div>
  )
}
