import { useState } from "react"

const PasswordInput = ({ placeholder, id, name, onChange }) => {
    //State to hide/show password
    const [showPass, setShowPass]  = useState(false)

    const togglePassword = () => {
        setShowPass(!showPass)
    }

    return (
        < div className='input__Password' >
            <input
                id={id}
                type={showPass ? '': 'password'}
                placeholder={placeholder}
                className="input input__Password reg_input"
                name={name}
                onChange={onChange}
            />
            <span className='icon' onClick={togglePassword}>
                {
                    showPass
                        ? <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M12 20.4999C16.9706 20.4999 21 16.3389 21 13.4999C21 10.6609 16.9706 6.49994 12 6.49994C7.02945 6.49994 3 10.6638 3 13.4999C3 16.336 7.02945 20.4999 12 20.4999Z" fill="white" strokeLinejoin="round" />
                            <path d="M12 16.4999C13.6568 16.4999 15 15.1568 15 13.4999C15 11.8431 13.6568 10.4999 12 10.4999C10.3432 10.4999 9 11.8431 9 13.4999C9 15.1568 10.3432 16.4999 12 16.4999Z" fill="white" strokeLinejoin="round" />
                            <path d="M22 6L2 20" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        : <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd"
                                d="M12 20.4999C16.9706 20.4999 21 16.3389 21 13.4999C21 10.6609 16.9706 6.49994 12 6.49994C7.02945 6.49994 3 10.6638 3 13.4999C3 16.336 7.02945 20.4999 12 20.4999Z"
                                fill="white" strokeLinejoin="round" />
                            <path
                                d="M12 16.4999C13.6568 16.4999 15 15.1568 15 13.4999C15 11.8431 13.6568 10.4999 12 10.4999C10.3432 10.4999 9 11.8431 9 13.4999C9 15.1568 10.3432 16.4999 12 16.4999Z"
                                fill="white" strokeLinejoin="round" />
                        </svg>
                }
            </span>
        </div >
    )
        
}

export default PasswordInput