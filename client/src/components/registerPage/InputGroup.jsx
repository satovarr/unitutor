import React from 'react'

export const InputGroup = ({label, id, placeholder, type="text", value='', onChange, variant="Default", name, error, onBlur }) => {
  
    return (
            <div className='input-group'>
                <label htmlFor={id}>{label}</label>
                <input
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    id={id}
                    className={`input input__${variant} reg_input`}
                    name={name}
                    onBlur={onBlur}
                />
            <p id='mailError' className='inputError' style={{ 'display': error ? '' : 'none' }}>
                    {error || ''}
                </p>
            </div>
            )
}
