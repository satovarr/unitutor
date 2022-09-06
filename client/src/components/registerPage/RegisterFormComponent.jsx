import React, { useState } from 'react';
import { FormFirstStepComponent } from './FormFirstStepComponent';
import { FormSecondStepComponent } from './FormSecondStepComponent';
import ProgressBar from './ProgressBar';

export const RegisterFormComponent = () => {

  // Info object
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

  //Handle submit of the fom.
  const onSubmit = ( event ) => {
    event.preventDefault();
    console.log(info);
    //TODO: SEND INFO TO BACK.
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
          display={firstStep}
        /> 
      :
        <FormSecondStepComponent
          info={info}
          setInfo={setInfo}
          setFirstStep={setFirstStep}
          display={firstStep}
        />
      }
      

      
    </form>
    
  )
}
