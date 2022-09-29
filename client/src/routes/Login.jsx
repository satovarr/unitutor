import '../styles/componentStyles/inputs.css'
import '../styles/componentStyles/buttons.css'
import '../styles/RegisterComponentStyle.css'
import { useEffect, useContext } from 'react'
import { UserContext } from '../App'
import LoginForm from '../components/loginPage/LoginForm'
import { FormHeaderComponent } from '../components/FormHeaderComponent'
import { useNavigate } from 'react-router-dom'


const Login = () => {

    const user = useContext(UserContext);

    const navigate = useNavigate();

    //Redirect to home if active session
    useEffect(() => {
        if (user) {
            navigate('/')
        }
    }, [])

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