import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../App'
import { auth, updateProfile } from '../../services/firebase';
import { createUser } from '../../services/users';
import { FormFirstStepComponent } from './FormFirstStepComponent';
import { FormSecondStepComponent } from './FormSecondStepComponent';
import ProgressBar from './ProgressBar';

export const RegisterFormComponent = ({ handleModalChange }) => {

  // Initial info object
  const initialState = {
    email: '',
    pass: '',
    passConfirm: '',
    profilePic: '',
    tel: '',
    name: ''
  }

  //Info state
  const [info, setInfo] = useState(initialState);

  //This state is for alternate between the two steps of the form
  const [firstStep, setFirstStep] = useState(true);

  //State to reload when submitting
  // const [ready, setReady] = useState(false);

  const navigate = useNavigate();

  const { currentUser, setCurrentUser } = useContext(UserContext);

  //Handle submit of the fom.
  const onSubmit = ( event ) => {
    event.preventDefault();
    let userData = {
      displayName: info.name,
      photoURL: info.profilePic
    }

    if (info.tel !== '') {
      userData = { ...userData, phoneNumber: '+57' + info.tel }

    }

    updateProfile(auth.currentUser, userData)
      .then(() => {

        setCurrentUser({ ...currentUser, name: info.name, profilePic: info.profilePic })

        let payload = {
          token: {
            accessToken: info?.userCredential?.accessToken || ''
          },
          user: {
            user_name: info?.name || '',
            is_tutor: false,
            public_id: '',
            user_id: '',
            photo_url: info?.profilePic || '',
            telephone: info?.tel || '',
            description: '',
            payme_url: ''
          }
        }
        console.log(payload)
        createUser(payload)
           .then(success => {
             if(success) {
               handleModalChange({
                   active: true,
                   isSucessState: true,
                   success: true,
                   message: 'Registro exitoso',
                   message_description: 'Tu registro en UniTutor se ha completado, iniciando sesión...'
                 })

               setTimeout(() => navigate('/'), 4000)
             }
             else {
               handleModalChange({
                 active: true,
                 isSucessState: true,
                 success: false,
                 message: 'Ha ocurrido un error :(',
                 message_description: 'Revisa tu conexión a internet o intenta de nuevo más tarde',
                 isCloseable: true,
                 acceptButtonText: 'Vale'
               })
             }
           })
         
        
       })
      .catch(error => {
        handleModalChange({
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
      <ProgressBar percentage={firstStep ? 50 : 100} />
      {
      firstStep?
        <FormFirstStepComponent
          info={info}
          setInfo={setInfo}
          setFirstStep={setFirstStep}
          handleModalChange={handleModalChange}
        /> 
      :
        <FormSecondStepComponent
          info={info}
          setInfo={setInfo}
          setFirstStep={setFirstStep}
          handleModalChange={handleModalChange}
        />
      }
    </form>
    
  )
}
