import { useState } from "react";
import { motion } from "framer-motion";
import { FiPlus } from "react-icons/fi";

export default function InputTask({ onAddTask, darkMode }) {
    const [enteredValue, setEnteredValue] = useState("");
    const [isFocused, setIsFocused] = useState(false);

    function handleSubmit(event) {
        event.preventDefault();
        if (enteredValue.trim()) {
            onAddTask(enteredValue);
            setEnteredValue("");
        }
    }

    return (
        <form onSubmit={handleSubmit} className="relative">
            <motion.div
                className={`absolute inset-0 rounded-xl ${darkMode ? 'bg-gray-700/30' : 'bg-white/50'} backdrop-blur-sm`}
                animate={{
                    boxShadow: isFocused
                        ? (darkMode
                            ? '0 0 0 2px rgba(245, 158, 11, 0.5)'
                            : '0 0 0 2px rgba(251, 191, 36, 0.5)')
                        : '0 0 0 0px rgba(251, 191, 36, 0)'
                }}
                transition={{ duration: 0.2 }}
            />

            <div className="relative flex items-center">
                <input
                    type="text"
                    className={`w-full py-2 sm:py-3 pl-3 sm:pl-4 pr-10 sm:pr-12 rounded-xl border-0 bg-transparent focus:outline-none focus:ring-0 text-base sm:text-lg placeholder-gray-400 ${darkMode ? 'text-white' : 'text-gray-800'
                        }`}
                    placeholder="What needs to be done?"
                    id="task"
                    value={enteredValue}
                    onChange={e => setEnteredValue(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    aria-label="Add new task"
                />
                <motion.button
                    type="submit"
                    className={`absolute right-1 sm:right-2 p-1 sm:p-2 rounded-full ${darkMode
                        ? 'bg-amber-500/20 text-amber-400 hover:bg-amber-500/30'
                        : 'bg-amber-500/10 text-amber-600 hover:bg-amber-500/20'
                        } transition-colors`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={!enteredValue.trim()}
                    aria-label="Add task"
                >
                    <FiPlus className="text-lg sm:text-xl" />
                </motion.button>
            </div>
        </form>
    );
}