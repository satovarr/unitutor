const ProgressBar = ({ percentage }) => {
    return (
        <div className="progress-bar bar__container">
            <span className={`progress-bar bar percent__${percentage}`}/>
        </div>
    )
}

export default ProgressBar