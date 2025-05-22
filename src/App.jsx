import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import InputTask from './components/InputTask';
import Task from './components/Task';
import { FiSun, FiMoon } from 'react-icons/fi';
import confetti from 'canvas-confetti';

function App() {
  const [tasks, setTasks] = useState([]);
  const [id, setId] = useState(0);
  const [darkMode, setDarkMode] = useState(() => {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [hasTasks, setHasTasks] = useState(false);
  const [addedCount, setAddedCount] = useState(0);

  useEffect(() => {
    setHasTasks(tasks.length > 0);
  }, [tasks]);

  function handleAddTask(newTask) {
    const newId = id + 1;
    setId(newId);
    setTasks(prev => {
      const updatedTasks = [...prev, { name: newTask, id: newId, completed: false }];
      setAddedCount(updatedTasks.length);
      return updatedTasks;
    });
  }

  function handleRemoveTask(taskId) {
    setTasks(tasks.filter(task => task.id !== taskId));
  }

  function toggleDarkMode() {
    setDarkMode(!darkMode);
  }

  function handleCompleteTask(taskId) {
    setTasks(tasks =>
      tasks.map(task =>
        task.id === taskId
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  function completedCount() {
    let count = 0;
    tasks.map(task => task.completed == true && count++)
    return count;
  }

  const handleFireworks = () => {
    const duration = 2 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min, max) =>
      Math.random() * (max - min) + min;

    const interval = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  };

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
  }, [darkMode]);

  useEffect(() => {
    ((completedCount() == addedCount) && tasks.length != 0) && handleFireworks()
  }, [completedCount(), addedCount])

  return (
    <div className={`min-h-screen w-full flex items-center justify-center p-4 transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-amber-50 to-blue-50'}`}>
      <motion.main
        className={`w-full max-w-md rounded-2xl p-4 sm:p-6 shadow-xl transition-all duration-300 ${darkMode ? 'bg-gray-800 text-gray-100' : 'bg-white/90 backdrop-blur-sm text-gray-800'}`}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent">
            Todo App
          </h1>
          <button
            onClick={toggleDarkMode}
            className="p-1 sm:p-2 rounded-full hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition-colors"
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? <FiSun className="text-lg sm:text-xl" /> : <FiMoon className="text-lg sm:text-xl" />}
          </button>
        </div>

        <InputTask onAddTask={handleAddTask} darkMode={darkMode} />

        <motion.section
          className="mt-4 sm:mt-6 space-y-2 sm:space-y-3"
          layout
        >
          <AnimatePresence>
            {hasTasks && (
              <motion.h2
                className={`text-md sm:text-lg font-semibold mb-1 sm:mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                Your Tasks
              </motion.h2>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {tasks.length === 0 ? (
              <motion.div
                className={`p-6 sm:p-8 rounded-xl text-center ${darkMode ? 'bg-gray-700/50' : 'bg-gray-100'}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <p className={`text-sm sm:text-base ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  No tasks yet. Add one to get started!
                </p>
              </motion.div>
            ) : (
              <div className="space-y-2 sm:space-y-3">
                <AnimatePresence>
                  {tasks.map(task => (
                    <Task
                      key={`task-${task.id}`}
                      taskName={task.name}
                      taskId={task.id}
                      onRemoveTask={handleRemoveTask}
                      darkMode={darkMode}
                      onComplete={handleCompleteTask}
                    />
                  ))}
                </AnimatePresence>
              </div>
            )}
          </AnimatePresence>
        </motion.section>

        {hasTasks && (
          <motion.div
            className={`mt-3 sm:mt-4 pt-3 sm:pt-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className={`text-xs sm:text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {completedCount()} / {tasks.length} completed
            </p>
          </motion.div>
        )}
      </motion.main>
    </div>
  );
}

export default App;