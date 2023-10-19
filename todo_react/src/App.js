import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';

// hooks
import {useState, useEffect} from "react"
import { useAuthentication } from './hooks/useAuthentication';

// context
import { AuthProvider } from './context/AuthContext';

// Components
import Footer from './components/Footer';
import About from './pages/About/About';

// CSS
import styles from './App.module.css'

// Interface
import Navbar from './components/Navbar';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Dashboard from './pages/Dashboard/Dashboard';
import Search from './pages/Search/Search';

function App() {

  const [user, setUser] = useState(undefined)
  const {auth} = useAuthentication()

  const loadingUser = user === undefined

  useEffect(() => {

    onAuthStateChanged(auth, (user) => {
      setUser(user)
    })
  }, [auth])

  if(loadingUser) {
    return <p>Loading...</p>
  }

  return (
      <div className="App">
        <AuthProvider value={{user}}>
          <BrowserRouter>
            <Navbar />
              <Routes>
                <Route path="/about" element={<About />} />
                <Route path="/search" element={<Search />} />
                <Route path="/" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
                <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
                <Route path="/dashboard" element={<Dashboard />} />
              </Routes>
            <Footer />
          </BrowserRouter>
        </AuthProvider>
      </div>
  );
}

export default App;