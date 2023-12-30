import React, { useState, useEffect } from "react";

import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function Todolist() {
  const [doesInputShown, setDoesInputShown] = useState(false);
  const [title, setTitle] = useState("");

  const addTodo = async (event) => {
    event.preventDefault();

    const res = await fetch(`/api/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, isCompleted: false }),
    });
    const result = await res.json();

    if (res.status === 201) {
      console.log(result);
      alert("Todo Created Successfully.");
      setTitle("");
    }
  };

  return (
    <>
      <h1>Next-Todos</h1>

      <div className="alert">
        <p>⚠ Please add a task first!</p>
      </div>

      <div className="container">
        <div
          className="form-container"
          style={{ display: `${doesInputShown ? "block" : "none"}` }}
        >
          <div className="add-form">
            <input
              id="input"
              type="text"
              placeholder="Type your To-Do works..."
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
            <button type="submit" id="submit" onClick={addTodo}>
              ADD
            </button>
          </div>
        </div>
        <div className="head">
          <div className="date">
            <p>{`user.name`}</p>
          </div>
          <div
            className="add"
            onClick={() => setDoesInputShown(!doesInputShown)}
          >
            <svg
              width="2rem"
              height="2rem"
              viewBox="0 0 16 16"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
              />
              <path
                fillRule="evenodd"
                d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
              />
            </svg>
          </div>
          <div className="time">
            <a href="#">Logout</a>
          </div>
        </div>
        <div className="pad">
          <div id="todo">
            <ul id="tasksContainer">
              <li>
                <span className="mark">
                  <input type="checkbox" className="checkbox" />
                </span>
                <div className="list">
                  <p>{`Todo.title`}</p>
                </div>
                <span className="delete">
                  <FontAwesomeIcon icon={faTrash} />
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Todolist;
