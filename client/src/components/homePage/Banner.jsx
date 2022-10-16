import '../../styles/componentStyles/banner.css'
import onlineMeeting from '../../imgs/malte-helmhold-m0r4a8nMarw-unsplash.jpg'
import CTAInput from './CTAInput'


const Banner = ({ navigate }) => {

    return (
        <section className="banner_container">
            <div className='banner_cta'>
                <h1>Encuentra la tutoría que tanto buscas</h1>
                <p>
                    En línea o presencial, encuentra
                    tutores que se ajusten a <span>tus
                    necesidades</span>. 
                </p>
                <CTAInput placeHolder={'¿Qué quieres reforzar?'} navigate={navigate}/>
            </div>
            <img src={onlineMeeting} alt="men in online meeting"></img>
        </section>
    )
}

export default Banner