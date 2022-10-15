import '../styles/componentStyles/tag.css'

const Tag = ({ type='default', text=''}) => {
    return(
        <div className={`tag ${type}`}>
            <p>{text}</p>
        </div>
    )
}

export default Tag