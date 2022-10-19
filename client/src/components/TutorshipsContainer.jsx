import Tutorship from "./Tutorship"
import '../styles/componentStyles/tutorshipsContainer.css'

const TutorshipsContainer = ({ tutorships }) => {
    return (
        <div className="page tutorships">
            {
                tutorships ?
                    tutorships.map(tutorship => (
                        <Tutorship key={tutorship.tutoring_id} tutorship={tutorship} />
                    ))
                : <></>
            }
        </div>
    )
}

export default TutorshipsContainer