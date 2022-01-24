import React from "react";
import { useState } from "react";

const ToDo = (args) => {
  // defining and iteracting with states --------------------------------
  const [input, setInput] = useState(""); //manages input box
  const [tasks, setTasks] = useState([]); //array of task objects
  const [archive, setArchive] = useState([]); //this is where deleted tasks go

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
      <div className={className + " task"}>
        <div className="taskText" onClick={onClickTask} key={task.task}>
          {task.task}
        </div>

        <div
          className="delete button"
          onClick={() => {
            onClickDelete(task.task);
          }}
        ></div>
      </div>
    );
  };

  const getPFromObject = (task) => {
    return <p>{task.task}</p>;
  };

  const onClickTask = (event) => {
    const taskText = event.target.innerHTML;
    const taskLocation = findTaskObjectInArray(tasks, taskText);
    const tempTasks = [...tasks];
    tempTasks[taskLocation].changeTaskCompletion();
    setTasks(tempTasks);
  };

  const onClickDelete = (string) => {
    const taskText = string;
    const taskLocation = findTaskObjectInArray(tasks, taskText);

    //archive deleted task
    const tempArchive = [...archive];
    tempArchive.push(tasks[taskLocation]);
    setArchive(tempArchive);

    //delete task from main list
    const tempTasks = [...tasks];
    tempTasks.splice(taskLocation, 1);
    setTasks(tempTasks);
  };

  //return ---------------------------------------------------
  return (
    <div id="container">
      <form onSubmit={handleSubmission}>
        <label>
          New Task:
          <input
            id="textInput"
            type="text"
            value={input}
            onChange={handleInputChange}
          />
        </label>
        <input id="submitButton" type="submit" value="+" />
      </form>
      <div id="tasks">{tasks.map(getTaskComponentFromObject)}</div>
      <div id="archive">
        <h1>Archived</h1>
        {archive.map(getPFromObject)}
      </div>
    </div>
  );
};

export default ToDo;
