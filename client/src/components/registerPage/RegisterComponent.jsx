import React from 'react'
import '../../styles/RegisterComponentStyle.css'
import { RegisterFormComponent } from './RegisterFormComponent'
import { RegisterHeaderComponent } from './RegisterHeaderComponent'


export const RegisterComponent = () => {
  return (
    <div className='RegisterCard'>
        <RegisterHeaderComponent/>
        <RegisterFormComponent/>
    </div>
  )
}
