import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { InputGroup } from '../registerPage/InputGroup';
import PasswordInput from '../PasswordInput';
import Button from '../Button';
import { GoogleButton } from '../Button';
import { auth, provider, signInWithRedirect, getRedirectResult, signInWithEmailAndPassword } from '../../services/firebase';
import '../../styles/componentStyles/loginForm.css'

const LoginForm = () => {

    // Initial credentials object
    const initialState = {
        email: '',
        password: '',
    }

    //Credentials state
    const [credentials, setCredentials] = useState(initialState);
    const [errorMessage, setErrorMessage] = useState(null);

    const navigate = useNavigate();

    //Get Google login results
    useEffect(() => {
        getRedirectResult(auth)
            .then(result => {
                if (result) {
                    navigate('/')
                }
                
            })
            .catch(error => {
                setErrorMessage('Ocurrió un error, comprueba tu conexión a internet o inténtalo más tarde')
            })

    }, [])

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setCredentials({ ...credentials, [name]: value });
    }

    //Handle submit of the form.
    const onSubmit = (event) => {
        event.preventDefault();

        signInWithEmailAndPassword(auth, credentials.email, credentials.password)
            .then((userCredential) => {
                setErrorMessage(null)
                navigate('/')
            })
            .catch((error) => {
                if (error.code === 'auth/wrong-password') {
                    setErrorMessage('Credenciales incorrectas')
                }
                else if (error.code === 'auth/user-not-found') {
                    setErrorMessage('Usuario no existe')
                }
                else {
                    setErrorMessage('Ocurrió un error, comprueba tu conexión a internet o inténtalo más tarde')
                }
            });
    }

    const handleGoogleClick = (event) => {
        event.preventDefault();
        signInWithRedirect(auth, provider);
    }


    return (
        <form onSubmit={onSubmit} autoComplete="off">
            <div className='form_content'>
                <p className='error'>{errorMessage || ''}</p>
                <div className='form-mail-input'>
                    <InputGroup
                        label="Correo electrónico"
                        id="email"
                        placeholder="Ej: deivid232@gmail.com"
                        type="text"
                        value={credentials.email}
                        onChange={onInputChange}
                        name={'email'}
                    />
                </div>
                <div className='input-group'>
                    <label htmlFor={'login-pass'}>Contraseña</label>
                    <PasswordInput
                        id={'login-pass'}
                        placeholder={'Ingresa tu contraseña'}
                        name={'password'}
                        value={credentials.password}
                        onChange={onInputChange}
                    />
                </div>

                <Link to='/forgotPassword'>Olvidé mi contraseña</Link>

                <div className='buttonsContainer'>
                    <Button text={'Iniciar sesión'} type={'Primary'} />
                    <GoogleButton text={'Iniciar sesión con Google'}
                        type={'Primary'}
                        handleClick={handleGoogleClick} />
                </div>
            </div>
        </form>

    )
}

export default LoginForm