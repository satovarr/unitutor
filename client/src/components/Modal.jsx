import Loader from '../imgs/loader.svg'
import Button from './Button'
import close_img from '../imgs/close_modal.svg'
import warning_img from '../imgs/warning.svg'
import success_img from '../imgs/success.svg'
import error_img from '../imgs/error.svg'
import '../styles/componentStyles/modal.css'

const Modal = ({ 
    message,
    message_description, 
    active, 
    acceptButtonText, 
    isLoading, 
    isCloseable,
    isSucessState,
    isWarning,
    success,
    handleModalChange
}) => {

    return (
        <>
            {
                active ?
                    <span id="modal">
                        <div id='modal-card'>
                            {
                                isCloseable ?
                                    <button className='modal_close' onClick={() => handleModalChange({active: false})}>
                                        <img alt='X' src={close_img} />
                                    </button>
                                    : <></>
                            }
                            {
                                isSucessState || isWarning ?
                                    <img
                                        alt={success ? 'Éxito' : 'Error'}
                                        src={
                                            isWarning ?
                                                warning_img
                                                : success ?
                                                    success_img
                                                    : error_img
                                        }
                                        id="state-image"
                                    />
                                    : <></>
                            }
                            {
                                isLoading ?
                                    <>
                                        <img src={Loader} alt='spinner' id="modal_load" />
                                        <p id="modal_message">{message}</p>
                                    </>

                                    :
                                    <>
                                        <p id="modal_message" className={!isWarning ? `modal_${isSucessState ? 'success' : 'error'}` : ''}>
                                            {message}
                                        </p>
                                        <p id="modal_message-description">{message_description || ''}</p>
                                        {
                                            isCloseable ?
                                                <Button handleClick={() => handleModalChange({ active: false })} text={acceptButtonText} />
                                                : <></>
                                        }
                                    </>
                            }

                        </div>
                    </span>
                    : <></>
            }
        </>
    )
}

export default Modal