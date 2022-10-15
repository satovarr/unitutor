import { useParams } from "react-router-dom"

const TutorshipsInfo = () => {

    const { id } = useParams()

    return(
        <div>Info de la tutoría con el id: {id}</div>
    )
}

export default TutorshipsInfo