import React from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../imgs/UniTutor_logo.svg'
import '../styles/componentStyles/formHeader.css'

export const FormHeaderComponent = ({ heading, addBar }) => {

  const navigate = useNavigate()

  const goToHome = () => {
    navigate('/')
  }

  return (
    <div className='form-header'>
      <div onClick={goToHome} id="register_logo">
        <img src={logo} alt="UniTutor"/>
      </div>
      <h1 className={addBar ? 'heading-with-bar' : ''}>{heading}</h1>
    </div>
  )
}
