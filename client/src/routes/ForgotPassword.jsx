import '../styles/componentStyles/inputs.css'
import '../styles/componentStyles/buttons.css'
import '../styles/RegisterComponentStyle.css'
import { useState, useEffect } from 'react'
import ForgotPasswordForm from '../components/forgotPasswordPage/ForgotPasswordForm'
import { FormHeaderComponent } from '../components/FormHeaderComponent'
import { useNavigate } from 'react-router-dom'
import Modal from '../components/Modal'


const ForgotPassword = () => {

    const navigate = useNavigate();

    const [modalParams, setModalParams] = useState()

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
            <Modal {...modalParams} handleModalChange={handleModalChange} />
            <div className='RegisterCard'>
                <FormHeaderComponent heading={'Recuperar cuenta'} addBar={true}/>
                <ForgotPasswordForm setModalParams={handleModalChange}/>
            </div>
        </div>
    )
}

export default ForgotPassword