import React, { useContext, useState } from "react";
import TaskContext from "@/src/context/TaskContext";

const Home = () => {
  const { tasks, dispatch } = useContext(TaskContext);
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [isSorted, setIsSorted] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc");

  const handleAddTask = (e) => {
    e.preventDefault(); //So the browser doesn't refresh after submit

    if (!taskName.trim()) {
      alert("Task name is required!");
      return;
    }

    dispatch({
      type: "ADD_TASK",
      payload: { id: Date.now(), name: taskName, description },
    });

    // Clear the form
    setTaskName("");
    setDescription("");
  };

  const handleSave = () => {
    if (!editedName.trim()) {
      alert("Task name cannot be empty!");
      return;
    }

    dispatch({
      type: "EDIT_TASK",
      payload: {
        id: editingTaskId,
        name: editedName,
        description: editedDescription,
      },
    });

    // Reset editing state
    setEditingTaskId(null);
    setEditedName("");
    setEditedDescription("");
  };

  const handleSort = () => {
    const sortedTasks = [...tasks];
    sortedTasks.sort((a, b) => {
      if (a.name.toLowerCase() < b.name.toLowerCase())
        return sortOrder === "asc" ? -1 : 1;
      if (a.name.toLowerCase() > b.name.toLowerCase())
        return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
    return sortedTasks;
  };

  const sortedTasks = isSorted ? handleSort() : tasks;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Task Manager</h1>
      <form onSubmit={handleAddTask} style={{ marginBottom: "20px" }}>
        <div>
          <label>
            Task Name:
            <input
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Description:
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
        </div>
        <button type="submit">Add Task</button>
      </form>

      {/* Sort Button */}
      <button
        onClick={() => {
          setIsSorted(true);
          setSortOrder(sortOrder === "asc" ? "desc" : "asc"); // Toggle sort order
        }}
      >
        Sort Alphabetically ({sortOrder === "asc" ? "Ascending" : "Descending"})
      </button>

      {/* Revert to Original Order Button */}
      <button onClick={() => setIsSorted(false)}>
        Revert to Original Order
      </button>

      <h2>Tasks</h2>
      <ul>
        {sortedTasks.map((task) => (
          <li
            key={task.id}
            style={{
              textDecoration: task.completed ? "line-through" : "none",
              backgroundColor: task.completed ? "red" : "transparent",
              padding: "5px",
              margin: "5px 0",
              borderRadius: "4px",
            }}
          >
            <input
              type="checkbox"
              checked={task.completed || false}
              onChange={() =>
                dispatch({
                  type: "TOGGLE_TASK_COMPLETION",
                  payload: { id: task.id },
                })
              }
            />
            {editingTaskId === task.id ? (
              <div>
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  placeholder="Edit Task Name"
                />
                <textarea
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                  placeholder="Edit Description"
                />
                <button onClick={handleSave}>Save</button>
                <button onClick={() => setEditingTaskId(null)}>Cancel</button>
              </div>
            ) : (
              <span>
                <strong>{task.name}</strong> -{" "}
                {task.description || "No description"}
                <button
                  onClick={() => {
                    setEditingTaskId(task.id);
                    setEditedName(task.name);
                    setEditedDescription(task.description || "");
                  }}
                >
                  Edit
                </button>
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
