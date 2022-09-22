import { Link } from "react-router-dom"
const Home = () => {

    return (
        <div>
            <p>Aquí va la home page</p>
            <Link to={'/register'}>Ir a registro</Link>
        </div>
    )
}

export default Home