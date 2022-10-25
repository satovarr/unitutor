import '../styles/componentStyles/inputs.css'

const Input = ({ id, placeholder, type = "text", value = '', onChange, variant = "Default", name, error, onBlur, options, add_classes }) => {
    return (
        <div className='input-container'>
            {
                type !== 'select' ?
                    <input
                        type={type}
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                        id={id}
                        className={`input input__${variant} ${add_classes}`}
                        name={name}
                        onBlur={onBlur}
                    />
                    : <select
                        value={value}
                        onChange={onChange}
                        id={id}
                        className={`input input__${variant} ${add_classes}`}
                        name={name}
                        onBlur={onBlur}
                    >
                        <option value='' className="selectPlaceholder">{placeholder}</option>
                        {
                            options ?
                                options.map(option => (
                                    <option key={option?.value} value={option?.value || ''}>{option?.display || ''}</option>
                                ))
                            : <></>
                        }
                    </select>
            }

            <p className='inputError' style={{ 'display': error ? '' : 'none' }}>
                {error || ''}
            </p>
        </div>
    )
}

export default Input