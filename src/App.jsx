import { useState } from 'react'
import './App.css'
import InputTask from './assets/components/InputTask'
import Task from './assets/components/Task'

function App() {
  const [tasks, setTasks] = useState([]);
  const [id, setId] = useState(0);

  function handleAddTask(newTask) {
    setId(id => id = id + 1)
    setTasks(prev => [...prev, { name: newTask, id: id }]);
  }

  function handleRemoveTask(taskId) {
    setTasks(tasks.filter(task => task.id != taskId))
  }

  return (
    <main className='space-y-5 md:w-[600px] w-full'>
      <InputTask onAddTask={handleAddTask} />
      <section className='space-y-2 w-full'>
        {tasks.length > 0 && <h1 className='text-xl font-semibold'>Tasks to do:</h1>}
        {tasks.map((task, index) => (
          <div key={`task-wrapper-${index}`}>
            {index > 0 &&
              <hr
                key={`hr-${index}`}
                className="mb-2"
              />}
            <Task
              key={`task-${index}`}
              taskName={task.name}
              taskId={task.id}
              onRemoveTask={handleRemoveTask}
            />
          </div>
        ))}
      </section>
    </main>
  )
}

export default App
