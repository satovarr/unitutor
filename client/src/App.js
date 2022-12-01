import { useState, createContext } from 'react'
import { auth, onAuthStateChanged } from './services/firebase'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Register } from './routes/Register.jsx'
import Home from './routes/Home.jsx'
import Login from './routes/Login.jsx'
import ForgotPassword from './routes/ForgotPassword'
import Tutorships from './routes/Tutorships'
import NotFound from './routes/NotFound'
import TutorshipsCreate from './routes/TutorshipsCreate'
import TutorshipsInfo from './routes/TutorshipsInfo'
import Search from './routes/Search'
import Categories from './routes/Categories'
import CategoriesCategory from './routes/CategoriesCategory'
import AboutUs from './routes/AboutUs'

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
        setCurrentUser({ accessToken: user.accessToken, name: user.displayName, profilePic: user.photoURL })
      }

      // Else if to tackle a problem when creating account with email and password
      else if(!currentUser.name) {
        setCurrentUser({ accessToken: user.accessToken, name: user.displayName, profilePic: user.photoURL })
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
              <Route path='about' element={<AboutUs />} />
              <Route path='categories' element={<Categories />} />
              <Route path='categories/:cat_id' element={<CategoriesCategory />} />
              <Route path='search' element={<Search />} />
              <Route path='tutorships' element={<Tutorships />} />
              <Route path='tutorships/new' element={<TutorshipsCreate />} />
              <Route path='tutorships/:id' element={<TutorshipsInfo />} />
              <Route path='forgotPassword' element={<ForgotPassword />} />
              <Route path='login' element={<Login />} />
              <Route path='register' element={<Register />} />
              <Route path='/' element={<Home />} />
              <Route path='*' element={<NotFound />} />
            </Route>
          </Routes>
        </Router>
      </div>
    </UserContext.Provider>
  )
}

export default App;
export { UserContext };