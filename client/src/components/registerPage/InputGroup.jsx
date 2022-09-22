import React from 'react'

export const InputGroup = ({label, id, placeholder, type="text", value='', onChange, variant="Default", name }) => {
  
    return (
            <div className='input-group'>
                <label htmlFor={id}>{label}</label>
                <input
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    id={id}
                    className={`input input__${variant}`}
                    name={name}
                />
            </div>
            )
}
