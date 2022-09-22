import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Register } from './routes/Register.jsx'
import Home from './routes/Home.jsx'

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route>
            <Route path='register' element={<Register />} />
            <Route path='/' element={<Home />} />
          </Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
