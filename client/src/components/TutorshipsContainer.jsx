import Tutorship from "./Tutorship"
import '../styles/componentStyles/tutorshipsContainer.css'

const TutorshipsContainer = ({ tutorships, own }) => {
    return (
        <div className="page tutorships">
            {
                tutorships && Array.isArray(tutorships)?
                    tutorships.map(tutorship => (
                        <Tutorship key={tutorship.tutoring_id} tutorship={tutorship} own={own} />
                    ))
                : <></>
            }
        </div>
    )
}

export default TutorshipsContainer