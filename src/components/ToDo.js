import React from "react";
import { useState } from "react";

const ToDo = (args) => {
  // defining and iteracting with states --------------------------------
  const [input, setInput] = useState(""); //manages input box
  const [tasks, setTasks] = useState([]); //array of task objects

  // Task object and related funcs--------------------------------------
  class Task {
    constructor(string) {
      this.task = string;
      this.completed = false;
    }

    changeTaskCompletion() {
      this.completed = this.completed ? false : true;
    }
  }

  const findTaskObjectInArray = (array, string) => {
    for (let i = 0; i < array.length; i++) {
      if (array[i].task === string) {
        return i;
      }
    }
  };

  //methods for handling text input-------------------------------------

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmission = (event) => {
    const newTask = new Task(input);
    tasks.push(newTask);
    setTasks(tasks);
    setInput("");
    event.preventDefault();
  };

  // Task components -------------------------------------------------
  const getTaskComponentFromObject = (task) => {
    const className = task.completed ? "complete" : "incomplete";
    return (
      <div
        className={className + " task"}
        onClick={onClickTask}
        key={task.task}
      >
        {task.task}
      </div>
    );
  };

  const onClickTask = (event) => {
    console.log("you clicked");
    const taskText = event.target.innerHTML;
    const taskLocation = findTaskObjectInArray(tasks, taskText);
    const tempTasks = [...tasks];
    tempTasks[taskLocation].changeTaskCompletion();
    setTasks(tempTasks);
    console.log(tasks);
  };

  //return ---------------------------------------------------
  return (
    <div>
      <form onSubmit={handleSubmission}>
        <label>
          New Task:
          <input type="text" value={input} onChange={handleInputChange} />
        </label>
        <input type="submit" value="+" />
      </form>
      <div id="tasks">{tasks.map(getTaskComponentFromObject)}</div>
    </div>
  );
};

export default ToDo;
