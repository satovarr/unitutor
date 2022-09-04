import React from 'react'
import logo from '../../imgs/UniTutor_logo.svg'
import '../../styles/RegisterComponentStyle.css'
import ProgressBar from './ProgressBar'

export const RegisterHeaderComponent = () => {
  return (
    <div className='form-header'>
        <img src={logo} alt="UniTutor"/>
        <h1>Crear cuenta</h1>
        <ProgressBar percentage={50}/>
    </div>
  )
}
