import { Link } from 'react-router-dom'

// hooks
import { useFetchDocuments } from '../../hooks/useFetchDocuments'
import { useQuery } from '../../hooks/useQuery'

// components
import TaskList from '../../components/TaskList'

const Search = () => {
    const query = useQuery()
    const search = query.get("q")

    const tasks = useFetchDocuments("tasks", search)

  return (
    <div>
        <h2>Search</h2>
        <div>
          {tasks && tasks.length === 0 && (
            <>
              <p>Tasks were not found...</p>
              <Link to="/dashboard" className="btn btn-dark">
                Back
              </Link>
            </>
          )}
          {/* {tasks && tasks.map((task) => (
            <TaskList key={task.id} task={task} />
          ))} */}
        </div>
    </div>
  )
}

export default Search