import React from 'react'
import '../styles/componentStyles/inputs.css'
import '../styles/componentStyles/buttons.css'
import '../styles/componentStyles/progress&loading.css'
import '../styles/RegisterComponentStyle.css'
import { RegisterFormComponent } from '../components/registerPage/RegisterFormComponent'
import { FormHeaderComponent } from '../components/FormHeaderComponent'


export const Register = () => {
  return (
    <div className='formContainer'>
      <div className='RegisterCard'>
        <FormHeaderComponent heading={'Crear Cuenta'}/>
        <RegisterFormComponent />
      </div>
    </div>
  )
}
