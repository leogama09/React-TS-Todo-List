import React, {useState, ChangeEvent, FormEvent, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthValue } from '../context/AuthContext'

// CSS
import styles from './TaskForm.module.css'

// Interface
import { ITask } from "../interfaces/Task"
import { useInsertDocument } from '../hooks/useInsertDocument'

type Props = {
  btnText: string
  taskList: ITask[]
  setTaskList?: React.Dispatch<React.SetStateAction<ITask[]>>
  task?: ITask | null
  handleUpdate?(id: number, title: string, difficulty: number): void
}

const TaskForm = ({ 
  btnText, 
  taskList, 
  setTaskList, 
  task, 
  handleUpdate 
}: Props) => {

  const [id, setId] = useState<number>(0)
  const [title, setTitle] = useState<string>("")
  const [difficulty, setDifficulty] = useState<number>(0)
  const [formError, setFormError] = useState("")

  const {insertDocument, response} = useInsertDocument("tasks")
  const {user} = useAuthValue()

  useEffect(() => {
    if (task) {
    setId(task.id)
    setTitle(task.title)
    setDifficulty(task.difficulty)
    }
  }, [task])

  const addTaskHandler = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormError("")

    // check values
  if(!title || !difficulty) {
    setFormError("Please, fill all fields!")
  }

  console.log({
    title,
    difficulty,
    uid: user.uid,
    createdBy: user.displayName
  })

  if(formError) return

    insertDocument ({
      title,
      difficulty,
      uid: user.uid,
      createdBy: user.displayName
    })
    
    if(handleUpdate) {
      handleUpdate(id, title, difficulty)
    } else {
      const id = Math.floor(Math.random() * 1000)

      const newTask: ITask = {id, title, difficulty}

      setTaskList!([...taskList, newTask])

      setTitle("")
      setDifficulty(0)
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if(e.target.name === "title") {
      setTitle(e.target.value)
    } else {
      setDifficulty(parseInt(e.target.value))
    }
  }

  return (
    <form onSubmit={addTaskHandler} className={styles.form}>
      <div className={styles.input_container}>
        <label htmlFor="title">Title:</label>
        <input 
          type="text" 
          name="title" 
          placeholder="Task title" 
          onChange={handleChange} 
          value={title}
        />
      </div>
      <div className={styles.input_container}>
        <label htmlFor="difficulty">Difficulty:</label>
        <input 
          type="text" 
          name="difficulty" 
          placeholder="Task difficulty"
          onChange={handleChange}
          value={difficulty}
        />
      </div>
      {!response.loading && <input type="submit" value={btnText} />}
      {response.loading && (
        <button className="btn" disabled>
          Aguarde...
        </button>
      )}
      {response.error && <p className="error">{response.error}</p>}
      
    </form>
  )
}

export default TaskForm
