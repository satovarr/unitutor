import Button from "../Button"

const CTAInput = ({ placeHolder }) => {
    return (
        <div className="cta_input_container">
            <input className="input" type="text" placeholder={placeHolder}></input>
            <Button text={'Buscar'}/>
        </div>
        
    )
}

export default CTAInput