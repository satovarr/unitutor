import Input from "./Input"

export const InputGroup = ({label, id, placeholder, type="text", value='', onChange, variant="Default", name, error, onBlur, options, add_classes }) => {
  
    return (
            <div className='input-group'>
                <label htmlFor={id}>{label}</label>
                <Input 
                    id={id}
                    placeholder={placeholder}
                    type={type}
                    value={value}
                    onChange={onChange}
                    variant={variant}
                    name={name}
                    error={error}
                    onBlur={onBlur}
                    options={options}
                    add_classes={add_classes}
                />
            </div>
            )
}
