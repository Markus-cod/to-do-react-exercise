// /components/Task.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiTrash2, FiCheck } from "react-icons/fi";

export default function Task({ taskName, onRemoveTask, taskId, darkMode, onComplete }) {
    const [isCompleted, setIsCompleted] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    function handleCheck() {
        setIsCompleted(!isCompleted);
        onComplete(taskId);
    }

    function handleDelete() {
        onRemoveTask(taskId);
    }

    return (
        <motion.div
            className="w-full"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.3 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            whileTap={{ scale: 0.98 }}
        >
            <div className={`flex items-center justify-between p-3 sm:p-4 ${darkMode ? 'bg-gray-700/80' : 'bg-white/80'} backdrop-blur-sm rounded-xl shadow-sm hover:shadow-md transition-all duration-300 group`}>
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                    <button
                        onClick={handleCheck}
                        className={`min-w-5 min-h-5 sm:min-w-6 sm:min-h-6 rounded-full flex items-center justify-center transition-all duration-200 
                            ${isCompleted ? 'bg-emerald-500' : `border-2 ${darkMode ? 'border-gray-500' : 'border-gray-300'} hover:border-emerald-400`}`}
                    >
                        {isCompleted && <FiCheck className="text-white text-sm sm:text-base" />}
                    </button>

                    <p className={`text-base sm:text-lg truncate ${isCompleted ? 'line-through' : ''} ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                        {taskName}
                    </p>
                </div>

                <AnimatePresence>
                    {(isHovered || isCompleted) && (
                        <motion.button
                            onClick={handleDelete}
                            className={`p-1 sm:p-1.5 rounded-full ${darkMode ? 'bg-red-900/30 text-red-400 hover:bg-red-500' : 'bg-red-100 text-red-500 hover:bg-red-500 hover:text-white'} transition-colors`}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <FiTrash2 className="text-sm sm:text-base" />
                        </motion.button>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}