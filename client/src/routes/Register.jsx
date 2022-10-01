import { useState, useEffect } from 'react'
import '../styles/componentStyles/inputs.css'
import '../styles/componentStyles/buttons.css'
import '../styles/componentStyles/progress&loading.css'
import '../styles/RegisterComponentStyle.css'
import { RegisterFormComponent } from '../components/registerPage/RegisterFormComponent'
import { FormHeaderComponent } from '../components/FormHeaderComponent'
import Modal from '../components/Modal'
import { useNavigate } from 'react-router-dom'


export const Register = () => {

  const [modalParams, setModalParams] = useState()

  const navigate = useNavigate();

  //Redirect to home if active session
  useEffect(() => {
    if (localStorage.getItem('activeSession') === 'true') {
      navigate('/')
    }
  }, [navigate])

  //Function to set modal params
  const handleModalChange = (params) => {
    setModalParams(params)
  }

  return (
    <div className='formContainer'>
      <Modal 
        {...modalParams}
        handleModalChange={handleModalChange}
      />
      <div className='RegisterCard'>
        <FormHeaderComponent heading={'Crear Cuenta'}/>
        <RegisterFormComponent handleModalChange={handleModalChange}/>
      </div>
    </div>
  )
}
