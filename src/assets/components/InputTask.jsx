import { useState } from "react"

export default function InputTask({ onAddTask }) {
    const [enteredValue, setEnteredValue] = useState("");

    function handleSubmit(event) {
        event.preventDefault();
        onAddTask(enteredValue);
        setEnteredValue("");
    }

    return (
        <form onSubmit={handleSubmit} className="flex space-x-2 justify-center">
            <input
                type="text"
                className="border-neutral-400 border-2 rounded-md p-1 caret-amber-500 focus:border-amber-500 focus:outline-none"
                placeholder="Write a task"
                id="task"
                required
                value={enteredValue}
                onChange={e => setEnteredValue(e.target.value)}
            />
            <button
                type="submit"
                className="px-4 bg-amber-500 rounded-md text-neutral-900"
            >
                Add
            </button>
        </form>
    )
}