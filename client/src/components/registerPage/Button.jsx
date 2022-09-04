import GoogleIcon from '../../imgs/Google.svg'

const Button = ({ type, text, handleClick }) => {
    return (
        <button className={`button button__${type}`} onClick={handleClick}> 
            {text}
        </button>
    )
}

export const GoogleButton = ({ text, type, handleClick }) => {
    return (
        <button className={`button button__${type} button__Google`} onClick={handleClick}>
            <span className='icon'>
                <img src={GoogleIcon} alt='googleLogo'/>
            </span>
            {text}
        </button>
    )
}

export default Button