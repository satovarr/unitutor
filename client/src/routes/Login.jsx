import '../styles/componentStyles/inputs.css'
import '../styles/componentStyles/buttons.css'
import '../styles/RegisterComponentStyle.css'
import { useEffect } from 'react'
import LoginForm from '../components/loginPage/LoginForm'
import { FormHeaderComponent } from '../components/FormHeaderComponent'
import { useNavigate } from 'react-router-dom'


const Login = () => {

    const navigate = useNavigate();

    //Redirect to home if active session
    useEffect(() => {
        if (localStorage.getItem('activeSession') === 'true') {
            navigate('/')
        }
    }, [navigate])

    return (
        <div className='formContainer'>
            <div className='RegisterCard'>
                <FormHeaderComponent heading={'Iniciar sesión'} addBar={true} />
                <LoginForm />
            </div>
        </div>
    )
}

export default Login