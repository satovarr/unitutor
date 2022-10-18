import Button from "../Button"

const CTAInput = ({ placeHolder, navigate }) => {

    const search = (event) => {
        event.preventDefault()
        let input = event.target.children[0]
        navigate(`/search${input.value !== '' ? '?name='+input.value : ''}`)
    }

    return (
        <form className="cta_input_container" onSubmit={search}>
            <input className="input" type="text" placeholder={placeHolder}></input>
            <Button text={'Buscar'} />
        </form>
        
    )
}

export default CTAInput