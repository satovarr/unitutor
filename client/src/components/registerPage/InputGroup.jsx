import React from 'react'

export const InputGroup = ({label, id, placeholder, type="text", state, setState, variant="Default", handleBlur = () => {}}) => {
  
    const onInputChange = ( {target} ) => {
        setState(target.value);
    }
  
    return (
            <div className='input-group'>
                <label htmlFor={id}>{label}</label>
                <input
                    type={type}
                    value={state}
                    onChange={onInputChange}
                    onBlur={handleBlur}
                    placeholder={placeholder}
                    id={id}
                    className={`input input__${variant}`}
                />
            </div>
            )
}
