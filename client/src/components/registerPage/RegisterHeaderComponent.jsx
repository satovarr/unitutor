import React from 'react'
import logo from '../../imgs/UniTutor_logo.svg'
import '../../styles/RegisterComponentStyle.css'

export const RegisterHeaderComponent = () => {
  return (
    <>
        <img src={logo} alt="UniTutor"/>
        <h1>Crear cuenta</h1>
        <hr className='ProgressBar'/>
    </>
  )
}
