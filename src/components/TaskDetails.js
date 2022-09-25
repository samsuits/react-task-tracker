import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button } from './Button'

const TaskDetails = () => {
  const [loading, setLoading] = useState(true)
  const [task, setTask] = useState({})

  const params = useParams()
  const navigate = useNavigate()
  const shouldFetch = useRef(true)

  useEffect(() => {
    const fetchTask = async () => {
      const res = await fetch(`http://localhost:5001/tasks/${params.id}`)
      const data = await res.json()
      if (res.status === 404) {
        navigate('/')
      }

      setTask(data)
      setLoading(false)
    }
    if (shouldFetch.current) {
      shouldFetch.current = false
      fetchTask()
    }
  }, [])

  return loading ? (
    <h3>Loading...</h3>
  ) : (
    <div>
      <h3>{task.text}</h3>
      <p>{task.day}</p>
      <Button
        onClick={() => {
          navigate('/')
        }}
        text="Go Back"
      />
    </div>
  )
}

export default TaskDetails
