import GoogleIcon from '../../imgs/Google.svg'

const Button = ({ htmlType, type, text, additionalClass, handleClick }) => {
    return (
        <button type={htmlType} className={`button button__${type} ${additionalClass || ''}`} onClick={handleClick}> 
            {text}
        </button>
    )
}

export const GoogleButton = ({ htmlType, text, type, additionalClass, handleClick }) => {
    return (
        <button type={htmlType} className={`button button__${type} ${additionalClass || ''} button__Google`} onClick={handleClick}>
            <span className='icon'>
                <img src={GoogleIcon} alt='googleLogo'/>
            </span>
            {text}
        </button>
    )
}

export default Button