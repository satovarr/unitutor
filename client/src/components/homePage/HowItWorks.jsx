import '../../styles/componentStyles/howItWorks.css'
import search from '../../imgs/how_it_works-search.svg'
import message from '../../imgs/how_it_works-message.svg'
import date from '../../imgs/how_it_works-date.svg'

const HowItWorks = () => {
    return (
        <section className="how_it_works">
            <h2>¿Cómo funciona UniTutor?</h2>
            <div className='steps'>
                <div className="step_description">
                    <h4>1. &nbsp; Busca</h4>
                    <p>
                        Busca el área de tu interés y elige entre varios
                        tutores hasta hallar el que más se ajuste a tus
                        necesidades (costo, preparación, opiniones).
                    </p>
                </div>
                <div className="step_image_container">
                    <img src ={search} alt="lupa"></img>
                </div>
            </div>
            <div className='steps'>
                <div className="step_description">
                    <h4>2. &nbsp; Escribe</h4>
                    <p>
                        Utiliza nuestra mensajería para ponerte en
                        contacto con el tutor de tu preferencia.
                    </p>
                </div>
                <div className="step_image_container">
                    <img src={message} alt="mensajes"></img>
                </div>
            </div>
            <div className='steps'>
                <div className="step_description">
                    <h4>3. &nbsp; Lleguen a un acuerdo</h4>
                    <p>
                        Acuerden los detalles de la clase junto al tutor
                        una vez estén comunicados.
                    </p>
                </div>
                <div className="step_image_container">
                    <img src={date} alt="fecha"></img>
                </div>
                </div>
        </section>
    )
}

export default HowItWorks