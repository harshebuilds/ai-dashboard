import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import InputComponent from "@/src/components/InputComponent";
import styles from "@/styles/home.module.scss";
import TaskContext from "@/src/context/TaskContext";
import ButtonComponent from "@/src/components/ButtonComponent";

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
      payload: {
        id: Date.now(),
        name: taskName,
        description,
        completed: false,
      },
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
        completed: false,
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
    <Box className={styles.container}>
      <Box className={styles.header}>Task Manager</Box>
      <form onSubmit={handleAddTask}>
        <Box className={styles.formFields}>
          <InputComponent
            label="Task"
            placeholder="Enter task"
            value={taskName}
            onChange={(e) => {
              setTaskName(e.target.value);
            }}
            required={true}
          />

          <InputComponent
            label="Description"
            placeholder="Description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            multiline
            maxRows={2}
          />
          <ButtonComponent text={"Add Task"} type={"submit"} />
        </Box>
      </form>

      <Box className={styles.result}>
        <Box className={styles.resultHeader}>Tasks</Box>
        <Box className={styles.sortContainer}>
          {/* Sort Button */}
          <ButtonComponent
            text={"Sort Alphabetically"}
            variant={"contained"}
            onClick={() => {
              setIsSorted(true);
              setSortOrder(sortOrder === "asc" ? "desc" : "asc");
            }}
          />
          <ButtonComponent
            text={"Original Order"}
            variant={"contained"}
            onClick={() => setIsSorted(false)}
          />
        </Box>

        {tasks.length > 0 ? (
          <List>
            {sortedTasks.map((task) => (
              <ListItem disablePadding>
                <Checkbox
                  checked={task.completed}
                  onChange={() => {
                    dispatch({
                      type: "TOGGLE_TASK_COMPLETION",
                      payload: task.id,
                    });
                  }}
                />
                {editingTaskId === task.id ? (
                  <>
                    <InputComponent
                      label="Task"
                      placeholder="Edit task"
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                      required={true}
                    />
                    <InputComponent
                      label="Description"
                      placeholder="Edit description"
                      value={editedDescription}
                      onChange={(e) => setEditedDescription(e.target.value)}
                    />
                    <ButtonComponent text={"Save"} onClick={handleSave} />
                    <ButtonComponent
                      text={"Cancel"}
                      onClick={() => {
                        setEditingTaskId(null);
                      }}
                    />
                  </>
                ) : (
                  <>
                    <ListItemText
                      sx={{
                        borderRadius: "4px",
                        padding: "10px 5px",
                        width: "400px",
                        backgroundColor: task.completed
                          ? "rgba(107, 199, 128, 0.73)"
                          : "transparent",
                      }}
                      primary={task.name}
                      secondary={task.description}
                    />
                    <ButtonComponent
                      text={"Edit"}
                      onClick={() => {
                        setEditingTaskId(task.id);
                        setEditedName(task.name);
                        setEditedDescription(task.description);
                      }}
                    />
                  </>
                )}
              </ListItem>
            ))}
          </List>
        ) : (
          <Box className={styles.notice}>Add some task</Box>
        )}
      </Box>
    </Box>
  );
};

export default Home;
