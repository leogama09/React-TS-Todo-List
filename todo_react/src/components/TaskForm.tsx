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
  handleUpdate?(id: number, title: string, description: string): void
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
  const [description, setDescription] = useState<string>("")
  const [formError, setFormError] = useState("")

  const {insertDocument, response} = useInsertDocument("tasks")
  const {user} = useAuthValue()

  useEffect(() => {
    if (task) {
    setId(task.id)
    setTitle(task.title)
    setDescription(task.description)
    }
  }, [task])

  const addTaskHandler = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormError("")

    // check values
  if(!title || !description) {
    setFormError("Please, fill all fields!")
  }

  console.log({
    title,
    description,
    uid: user.uid,
    createdBy: user.displayName
  })

  if(formError) return

    insertDocument ({
      title,
      description,
      uid: user.uid,
      createdBy: user.displayName
    })
    
    if(handleUpdate) {
      handleUpdate(id, title, description)
    } else {
      const id = Math.floor(Math.random() * 1000)

      const newTask: ITask = {id, title, description}

      setTaskList!([...taskList, newTask])

      setTitle("")
      setDescription("")
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if(e.target.name === "title") {
      setTitle(e.target.value)
    } else {
      setDescription(e.target.value)
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
        <label htmlFor="description">Description:</label>
        <input 
          type="text" 
          name="description" 
          placeholder="Task description"
          onChange={handleChange}
          value={description}
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
