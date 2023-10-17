import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';

// hooks
import {useState, useEffect} from "react"
import { useAuthentication } from './hooks/useAuthentication';

// context
import { AuthProvider } from './context/AuthContext';

// Components
import Footer from './components/Footer';
import Header from './components/Navbar';
import TaskForm from './components/TaskForm';
import Modal from './components/Modal';
import About from './pages/About/About';
import Home from './pages/Home/Home';

// CSS
import styles from './App.module.css'
import TaskList from './components/TaskList';

// Interface
import { ITask } from "./interfaces/Task"
import Navbar from './components/Navbar';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';

function App() {

  const [taskList, setTaskList] = useState<ITask[]>([])
  const [taskToUpdate, setTaskToUpdate] = useState<(ITask | null)>(null)

  const deleteTask = (id: number) => {
    setTaskList(
      taskList.filter(task => {
        return task.id !== id
      })
    )
  }

  const hideOrShowModal = (display: boolean) => {
    const modal = document.querySelector("#modal")
    if(display) {
      modal!.classList.remove("hide")
    } else {
      modal!.classList.add("hide")
    }
  }

  const editTask = (task: ITask): void => {
    hideOrShowModal(true)
    setTaskToUpdate(task)
  }

  const updateTask = (id: number, title: string, difficulty: number) => {

    const updatedTask: ITask = {id, title, difficulty}

    const updatedItens = taskList.map((task) => {
      return task.id === updatedTask.id ? updatedTask : task
    })

    setTaskList(updatedItens)

    hideOrShowModal(false)

  }

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
                <Route path='/' element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Routes>
            <Footer />
          </BrowserRouter>
        </AuthProvider>
      </div>
  );
}

export default App;