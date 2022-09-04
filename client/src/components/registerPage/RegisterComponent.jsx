import React from 'react'
import '../../styles/componentStyles/inputs.css'
import '../../styles/componentStyles/buttons.css'
import '../../styles/componentStyles/progress&loading.css'
import '../../styles/RegisterComponentStyle.css'
import { RegisterFormComponent } from './RegisterFormComponent'
import { RegisterHeaderComponent } from './RegisterHeaderComponent'


export const RegisterComponent = () => {
  return (
    <div className='formContainer'>
      <div className='RegisterCard'>
        <RegisterHeaderComponent />
        <RegisterFormComponent />
      </div>
    </div>
  )
}
