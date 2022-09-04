import React, { useState } from 'react';
import { FormFirstStepComponent } from './FormFirstStepComponent';
import { FormSecondStepComponent } from './FormSecondStepComponent';

export const RegisterFormComponent = () => {

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [tel, setTel] = useState("");
  const [firstStep, setFirstStep] = useState(true);

  const onSubmit = ( event ) => {
    event.preventDefault();
    console.log(event)
  }

  const emailValidation = ( {target} ) => {
    if(!(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(target.value))){
      setName("HOLA")
    } else {
      setName("")
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <h1>{name}</h1>
      {
        firstStep? 
        <FormFirstStepComponent
          email={email}
          setEmail={setEmail}
          emailValidation={emailValidation}
          setFirstStep={setFirstStep}
        /> 
        :
        <FormSecondStepComponent
          name={name}
          tel={tel}
          setName={setName}
          setTel={setTel}
          setFirstStep={setFirstStep}
        />
      }
    </form>
    
  )
}
