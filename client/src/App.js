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


  //Keeping track of user session across the App (this executes every time a page is loaded)
  onAuthStateChanged(auth, (user) => {
    if (user) {

      if(!currentUser) {

        // Setting variable in local storage (if not already there) to be able to know before pages fully
        // render if there is an active session, to redirect some routes
        if (!localStorage.getItem('activeSession') || localStorage.getItem('activeSession') === 'false') {
          localStorage.setItem('activeSession', 'true')
        }

        setCurrentUser({ uid: user.uid, name: user.displayName, profilePic: user.photoURL })
      }

      // Else if to tackle a problem when creating account with email and password
      else if(!currentUser.name) {
        setCurrentUser({ uid: user.uid, name: user.displayName, profilePic: user.photoURL })
      }

    } else {
      // Check to avoid setting global state multiple times to null
      if (currentUser) {

        //also keep track of logout with local storage variable
        if (localStorage.getItem('activeSession') === 'true') {
          localStorage.setItem('activeSession', 'false')
        }

        setCurrentUser(null)
      }
    }
  })

  const value = {
    currentUser,
    setCurrentUser
  }

  return (
    <UserContext.Provider value={value}>
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