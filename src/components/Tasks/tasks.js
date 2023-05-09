import React, { useState } from "react";
import Header from '../Header/Header';
import './tasks.css';

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [doneTasks, setDoneTasks] = useState([]);
    const [todoChanged, setTodoChanged] = useState("");
    const [todoChangedIndex, setTodoChangedIndex] = useState("");
    const [newTodo, setNewTodo] = useState("");

    const shiftToDone = (index) => {
        const doneTasksAux = [...doneTasks, tasks[index]];
        tasks.splice(index, 1);
        setDoneTasks(doneTasksAux);
        setTasks([...tasks]);
    }

    const deleteTodo = (index) => {
        tasks.splice(index, 1);
        setTasks([...tasks]);
    }

    const deleteTodoDone = (index) => {
        doneTasks.splice(index, 1);
        setDoneTasks([...doneTasks]);
    }

    const editToDo = (index) => {
        const editField = document.querySelector(".edit-field");
        editField.classList.add("display-flex");
        setTodoChangedIndex(index);
    }

    const displayPreview = (index, event) => {
        const x = event.clientX;
        const y = event.clientY;
        const titlePreview = document.querySelector(".title-preview");
        const titlePreviewText = document.querySelector("#preview-text");

        titlePreview.style.display = 'flex';
        titlePreview.style.top = `${y + 30}px`;
        titlePreview.style.left = `${x - 20}px`;
        titlePreviewText.innerText = tasks[index];

        titlePreview.style.backgroundColor = 'rgb(71, 31, 33)';
    }

    const hidePreview = (index, event) => {
        const titlePreview = document.querySelector(".title-preview");
        const titlePreviewText = document.querySelector("#preview-text");
        
        titlePreview.style.display = 'none';
        titlePreviewText.innerText = "";
    }

    const displayPreviewDone = (index, event) => {
        const x = event.clientX;
        const y = event.clientY;
        const titlePreview = document.querySelector(".title-preview");
        const titlePreviewText = document.querySelector("#preview-text");

        titlePreview.style.display = 'flex';
        titlePreview.style.top = `${y + 30}px`;
        titlePreview.style.left = `${x - 20}px`;
        titlePreviewText.innerText = doneTasks[index];

        titlePreview.style.backgroundColor = 'rgb(31, 43, 78)';
    }

    const hidePreviewDone = (index, event) => {
        const titlePreview = document.querySelector(".title-preview");
        titlePreview.style.display = 'none';

        const titlePreviewText = document.querySelector("#preview-text");
        titlePreviewText.innerText = "";
    }

    return <React.Fragment>
        <Header
            addTodoToState={newTodo}
            addState={setNewTodo}
            allTodos={tasks}
            setAllTodos={setTasks}
        />

        <div className="title-preview">
            <div id="upward-arrow"></div>
            <p id="preview-text">
            </p>
        </div>

        <div className="tasksection">

            <div className="edit-field">
                <input type="text" id="edit-input-field" placeholder="Edit todo..."
                    onChange={(event) => {
                        const text = event.target.value;
                        setTodoChanged(text.trim());
                    }}
                />

                <button id="edit-button" onClick={() => {
                    const editField = document.querySelector(".edit-field");
                    editField.classList.remove("display-flex");

                    if (todoChanged == "")
                        return;
                    tasks[todoChangedIndex] = todoChanged;
                    setTasks([...tasks]);

                    document.querySelector("#edit-input-field").value = "";
                }}>
                    Edit
                </button>
            </div>

            <h2 id="task-to-be-done-heading">
                <img src="./pending.svg" id="pending-icon" />
                Pending
            </h2>

            <ul className="tasklist">
                {
                    (tasks.length > 0) ? tasks.map((task, index) => {
                        return <li key={index} className="tasks" >
                            <div className="mark-done-check" onClick={() => { shiftToDone(index) }} />
                            <img className="edit-btn" src="./edit.svg" onClick={() => { editToDo(index) }} />
                            <img className="delete-btn" onClick={() => { deleteTodo(index) }} src="./delete.svg" />
                            <p className="todotitle" 
                            onMouseOver={(event) => {displayPreview(index, event)}}
                            onMouseOut={(event) => {hidePreview(index, event)}}
                            > {task} </p>
                        </li>
                    }) : <div id="nothing-found">
                        <p> Nothing is pending! </p>
                    </div>

                } </ul>
        </div>

        <div className="tasksection-done">
            <h2 id="task-done-heading">
                <img src="./done.svg" id="done-icon" />
                Done
            </h2>

            <ul className="tasklist"> {
                (doneTasks.length > 0) ? doneTasks.map((task, index) => {
                    return <li key={index} className="tasks" >
                        <img style={{ marginLeft: '0px' }} className="delete-btn" onClick={() => { deleteTodoDone(index) }} src="./delete.svg" />
                        <p className="todotitle"
                            onMouseOver={(event) => {displayPreviewDone(index, event)}}
                            onMouseOut={(event) => {hidePreviewDone(index, event)}}
                        > {task} </p>
                    </li>
                }) : <div id="nothing-found">
                    <p> You haven't marked anything done yet! </p>
                </div>
            } </ul>
        </div>
    </React.Fragment>
}

export default Tasks;