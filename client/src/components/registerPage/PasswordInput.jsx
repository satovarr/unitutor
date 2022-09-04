import React from 'react'

export const PasswordInput = () => {
  return (
    <>
        <label for="password">Contraseña</label>
        <input id="password" type="password" placeholder='Ingresa la contraseña'/>
        <input id="passwordConfirm" type="password" placeholder='Ingresa la contraseña'/>
    </>
  )
}
