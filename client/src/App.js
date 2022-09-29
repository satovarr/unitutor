import { useState, createContext } from 'react'
import { auth, onAuthStateChanged } from './services/firebase'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Register } from './routes/Register.jsx'
import Home from './routes/Home.jsx'
import Login from './routes/Login.jsx'
import ForgotPassword from './routes/ForgotPassword'

// Context
const UserContext = createContext();

function App() {

  //Global user state
  const [currentUser, setCurrentUser] = useState(null);

  //Context

  //Keeping track of user session across the App
  onAuthStateChanged(auth, (user) => {
    if (user) {

      if(!currentUser) {
        setCurrentUser({ uid: user.uid, name: user.displayName, profilePic: user.photoURL })
      }

    } else {

      if (!currentUser) {
        setCurrentUser(null)
      }
    }
  })

  return (
    <UserContext.Provider value={currentUser}>
      <div>
        <Router>
          <Routes>
            <Route>
              <Route path='forgotPassword' element={<ForgotPassword />} />
              <Route path='login' element={<Login />} />
              <Route path='register' element={<Register />} />
              <Route path='/' element={<Home />} />
            </Route>
          </Routes>
        </Router>
      </div>
    </UserContext.Provider>
  )
}

export default App;
export { UserContext };