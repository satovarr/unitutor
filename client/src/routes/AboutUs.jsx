import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import '../styles/AboutUs.css'

const AboutUs = () => {

    const toggleQuestions = (event) => {
        let container = event.target.parentNode
        container.classList.toggle('expand')
    }

    return (
      <div className="aboutUs">
        <Navbar />
            <div className="aboutUs content">
                <h1 id="us">Sobre UniTutor</h1>
                <section className="who_we_are">
                    <h2>¿Quiénes somos?</h2>
                    <p>UniTutor es un proyecto que facilita a los estudiantes universitarios prestar sus servicios de tutorías académicas remuneradas en las áreas temáticas de sus carreras universitarias de la Universidad Nacional Sede Bogotá. Los tutores pueden establecer sus propios términos y tarifas para sus tutorías, así como buscar aquellas que satisfagan sus necesidades. Además, UniTutor conecta a los usuarios ofreciendo tutoriales a quienes estén interesados.</p>
                    <h4 className="bullets">Nuestra misión</h4>
                    <p>Crear un espacio en el que los estudiantes universitarios puedan ofrecer tutorías remuneradas a otros, con el fin de aportar al proceso de aprendizaje y facilitar el intercambio de conocimientos académicos por medio de un sistema web de tutorías remuneradas.</p>
                    <h4 className="bullets">Nuestra visión</h4>
                    <p>Para el 2025, UniTutor busca ser una de las plataformas de tutorías más útiles para estudiantes universitarios, ofreciendo un servicio de calidad en el que aquellos estudiantes con gusto de enseñar tengan la oportunidad de hacer crecer a otros con su conocimiento.</p>
                </section>
                <section className="faqs">
                    <h2>Preguntas frecuentes</h2>
                    <ul>
                        <li>
                            <h4 onClick={toggleQuestions}>¿Qué servicios ofrece UniTutor?</h4>
                            <div>
                                <p>
                                    Facilitamos los servicios de tutorías académicas remuneradas, en áreas del conocimiento abordadas en carreras universitarias de la Universidad Nacional Sede Bogotá, en una variedad de materias, que incluyen matemáticas, Química, Circuitos entre otros. 
                                </p>
                            </div>
                        </li>
                        <li>
                            <h4 onClick={toggleQuestions}>¿Cuánto cuestan sus servicios?</h4>
                            <div>
                                <p>
                                    Los precios varían según el tutor que presta el servicio y el tema. Por favor contacta al tutor que desees para más detalles.
                                </p>
                            </div>
                        </li>
                        <li>
                            <h4 onClick={toggleQuestions}>¿Cómo sé si un tutor académico es adecuado para mí?</h4>
                            <div>
                                <p>
                                    Cada tutor puede agregar una descripción para llamar tu atención. Además, tu primera hora con un tutor será gratis para que sirva como prueba y decidas si quieres continuar de forma remunerada o si prefieres buscar otro tutor.
                                </p>
                            </div>
                        </li>
                        <li>
                            <h4 onClick={toggleQuestions}>¿Qué tipos de tutorías ofrece UniTutor?</h4>
                            <div>
                                <p>
                                    Mediante nuestra plataforma tutores de asignaturas Universitarias ofrecen sus servicios en una variedad de materias que incluyen matemáticas, Química, Circuitos entre otros. 
                                </p>
                            </div>
                        </li>
                        <li>
                            <h4 onClick={toggleQuestions}>¿Cómo empiezo con la tutoría académica?</h4>
                            <div>
                                <p>
                                    Una vez encuentres al tutor de tu preferencia, contácta con este para acordar los detalles. 
                                </p>
                            </div>
                        </li>
                        <li>
                            <h4 onClick={toggleQuestions}>¿Cuánto duran las sesiones de tutoría?</h4>
                            <div>
                                <p>
                                    La duración de las sesiones las acuerdas tú con tu tutor. Sin embargo, ten en cuenta que el precio listado en las tutorías es un precio por hora, no por sesión. Por ende, sesiones más largas serán más costosas.
                                </p>
                            </div>
                        </li>
                    </ul>
                </section>
                <section className="team">
                    <h2>Nuestro equipo</h2>
                    <p>Parla</p>
                    <h4 className="bullets">Santiago Londoño</h4>
                    <p>Parla</p>
                    <h4 className="bullets">Santiago Tovar</h4>
                    <p>Parla</p>
                    <h4 className="bullets">Julián Sánchez</h4>
                    <p>Parla</p>
                </section>
                <section className="policies" id="policies">
                    <h2>Nuestras Políticas</h2>
                    <p>Parla</p>
                    <h4 className="bullets">Política de privacidad</h4>
                    <p>Parla</p>
                    <h4 className="bullets">Términos & Condiciones</h4>
                    <p>Parla</p>
                </section>
            </div>
        <Footer />
      </div>
    )
}

export default AboutUs