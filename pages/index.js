import React, { useContext } from "react";
import TaskContext from "../src/context/TaskContext";
import { Button } from "@mui/material";

const Home = () => {
  const { tasks, dispatch } = useContext(TaskContext);

  const addTask = () => {
    dispatch({ type: "ADD_TASK", payload: { id: 1, name: "Test Task" } });
  };

  return (
    <div>
      <h1>Task List</h1>
      {tasks.map((task) => (
        <p key={task.id}>{task.name}</p>
      ))}
      <Button variant="contained" color="primary" onClick={addTask}>
        Add Task
      </Button>
    </div>
  );
};

export default Home;
