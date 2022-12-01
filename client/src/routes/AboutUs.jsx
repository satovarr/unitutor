import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import '../styles/AboutUs.css'

const AboutUs = () => {
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
                            <h4>Pregunta 1</h4>
                            <div>Hidden content</div>
                        </li>
                        <li>
                            <h4>Pregunta 2</h4>
                            <div>Hidden content</div>
                        </li>
                        <li>
                            <h4>Pregunta 3</h4>
                            <div>Hidden content</div>
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