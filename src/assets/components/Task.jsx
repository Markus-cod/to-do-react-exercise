import { useState } from "react";

export default function Task({ taskName, onRemoveTask, taskId }) {
    const [crossed, setCrossed] = useState();

    function handleCheck(event) {
        if (event.target.checked) {
            setCrossed(true)
        } else {
            setCrossed(false)
        }
    }

    function handleDelete() {
        onRemoveTask(taskId);
    }

    return (
        <div className="w-full flex flex-row space-x-2 justify-between">
            <div className="flex flex-row space-x-3">
                <input
                    type="checkbox"
                    className="accent-amber-500 scale-200"
                    onClick={handleCheck}
                />
                <p className={`${crossed ? "line-through text-neutral-500" : ""} text-left max-w-full`} id={taskId}>{taskName}</p>
            </div>
            <button className="bg-red-500 py-0.5 px-3 rounded-md font-bold self-center" onClick={handleDelete}>X</button>
        </div>
    )
}