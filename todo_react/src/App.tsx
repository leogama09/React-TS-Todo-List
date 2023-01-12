import React, {useState} from 'react';

// Components
import Footer from './components/Footer';
import Header from './components/Header';
import TaskForm from './components/TaskForm';
import Modal from './components/Modal';

// CSS
import styles from './App.module.css'
import TaskList from './components/TaskList';

// Interface
import { ITask } from "./interfaces/Task"

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

  return (
      <div>
        <Modal 
          children={<TaskForm 
            btnText="Editar Tarefa" 
            taskList={taskList}
            task={taskToUpdate}
            />}
        />
        <Header />
        <main className={styles.main}>
        <div>
          <h2>O que você vai fazer?</h2>
          <TaskForm 
            btnText="Criar Tarefa" 
            taskList={taskList}
            task={taskToUpdate}
            setTaskList={setTaskList} 
          />

        </div>
        <div>
          <h2>Suas tarefas:</h2>
          <TaskList 
            taskList={taskList} 
            handleDelete={deleteTask} 
            handleEdit={editTask}
          />
        </div>
        </main>
        <Footer />
      </div>
  );
}

export default App;
