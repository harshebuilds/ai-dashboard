import React, { createContext, useReducer } from "react";

const TaskContext = createContext();

const taskReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TASK":
      return [...state, action.payload];
    case "EDIT_TASK":
      return state.map((task) =>
        task.id === action.payload.id
          ? {
              ...task,
              name: action.payload.name,
              description: action.payload.description,
            }
          : task
      );
    case "TOGGLE_TASK_COMPLETION":
      return state.map((task) =>
        task.id === action.payload.id
          ? { ...task, completed: !task.completed } // Toggle the 'completed' state
          : task
      );
    default:
      return state;
  }
};

export const TaskProvider = ({ children }) => {
  const [tasks, dispatch] = useReducer(taskReducer, []);
  return (
    <TaskContext.Provider value={{ tasks, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContext;
