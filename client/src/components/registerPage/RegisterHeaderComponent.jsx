import React from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../../imgs/UniTutor_logo.svg'
import '../../styles/RegisterComponentStyle.css'

export const RegisterHeaderComponent = () => {

  const navigate = useNavigate()

  const goToHome = () => {
    navigate('/')
  }

  return (
    <div className='form-header'>
      <div onClick={goToHome} id="register_logo">
        <img src={logo} alt="UniTutor"/>
      </div>
      <h1>Crear cuenta</h1>
    </div>
  )
}
