import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputGroup } from '../registerPage/InputGroup';
import Button from '../Button';
import { auth, sendPasswordResetEmail } from '../../services/firebase';
import '../../styles/componentStyles/forgotPasswordForm.css'

const ForgotPasswordForm = () => {

    //Credentials state
    const [email, setEmail] = useState('');
    const [isValid, setIsValid] = useState(false);
    // const [errorMessage, setErrorMessage] = useState(null);

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
        // let newErrorMessageObj = errorMessageObj
        //email must contain username+@+domain
        if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email)) {
            // delete errorMessageObj.email_error
            setIsValid(true);
        } else {
            setIsValid(false);
            // newErrorMessageObj.email_error = 'Correo debe contener usuario+@+dominio.'
        }
        // setErrorMessageObj(newErrorMessageObj)
    }, [email]);

    //Handle submit of the form.
    const onSubmit = (event) => {
        event.preventDefault();
        //
        //
        //TODO: send email to change password.
        //
        //
        console.log(email)
        sendPasswordResetEmail(auth, email)
            .then(() => {
                //TODO: add modal
                console.log('breee')
            })
            .catch(error => {
                //TODO: add modal
                console.log(error.code)
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

                <div className='buttonsContainer'>
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