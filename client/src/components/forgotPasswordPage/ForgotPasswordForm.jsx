import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputGroup } from '../registerPage/InputGroup';
import Button from '../Button';
import { auth, sendPasswordResetEmail } from '../../services/firebase';
import '../../styles/componentStyles/forgotPasswordForm.css'

const ForgotPasswordForm = ({ setModalParams }) => {
 
    //Credentials state
    const [email, setEmail] = useState('');
    const [isValid, setIsValid] = useState(false);

    const navigate = useNavigate();

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setEmail(value);
    }

    const goHome = () => {
        navigate('/')
    }

    //Email validation
    useEffect(() => {
        //email must contain username+@+domain
        if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email)) {
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    }, [email]);

    //Handle submit of the form.
    const onSubmit = (event) => {
        event.preventDefault();
        console.log(email)
        sendPasswordResetEmail(auth, email)
            .then(() => {
                setModalParams({
                    active: true,
                    isSucessState: true,
                    success: true,
                    message: 'Correo enviado exitosamente',
                    message_description: 'Recuerda revisar tu carpeta de spam, a veces nuestros mensajes terminan allí :('
                })
                setTimeout(() => navigate('/'), 4000)
            })
            .catch(error => {
                setModalParams({
                    active: true,
                    isSucessState: true,
                    success: false,
                    message: 'Ha ocurrido un error :(',
                    message_description: 'Revisa tu conexión a internet o intenta de nuevo más tarde',
                    isCloseable: true,
                    acceptButtonText: 'Vale'
                })
            })
    }


    return (
        <form onSubmit={onSubmit} autoComplete="off">
            <div className='form_content'>

                <div className='forgot-description'>
                    <h2>¿Tienes problemas para acceder a tu cuenta?</h2>
                    <p>Ingresa tu correo electrónico y te enviaremos un enlace para verificar tu usuario y cambiar la contraseña.</p>
                </div>

                <div className='form-mail-input'>
                    <InputGroup
                        label="Correo electrónico"
                        id="email"
                        placeholder="Ej: deivid232@gmail.com"
                        type="text"
                        value={email}
                        onChange={onInputChange}
                        name={'email'}
                    />
                </div>

                <div className='buttonsContainer line'>
                    <Button text={'Enviar Correo de Recuperación'} type={'Primary'} disabled={!isValid}/>
                    <Button text={'Volver a Inicio'}
                        type={'Secondary'}
                        handleClick={goHome} />
                </div>
            </div>
        </form>

    )
}

export default ForgotPasswordForm