import React, {useState} from 'react';

// Components
import Footer from './components/Footer';
import Header from './components/Header';
import TaskForm from './components/TaskForm';

// CSS
import styles from './App.module.css'
import TaskList from './components/TaskList';

// Interface
import { ITask } from "./interfaces/Task"

function App() {

  const [taskList, setTaskList] = useState<ITask[]>([])

  return (
      <div>
        <Header />
        <main className={styles.main}>
        <div>
          <h2>O que você vai fazer?</h2>
          <TaskForm 
            btnText="Criar Tarefa" 
            taskList={taskList} 
            setTaskList={setTaskList} 
          />

        </div>
        <div>
          <h2>Suas tarefas:</h2>
          <TaskList />
        </div>
        </main>
        <Footer />
      </div>
  );
}

export default App;
