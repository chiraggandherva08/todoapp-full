import React, { useState } from "react";
import './planner.css';
import Notification from "../Notification/Notification";

const checkTimer = (timedTasks) => {
    let allDone = [];

    const date = new Date();
    const dateObj = date.getFullYear() + '-' + date.getMonth() + "-" + date.getDate();
    const timeObj = date.getHours() + ":" + date.getMinutes();

    timedTasks.map((task) => {
        const time_ = timeObj.split(":");
        const time_user = task[1].split(":");

        time_[0] = parseInt(time_[0]);
        time_[1] = parseInt(time_[1]);
        time_user[0] = parseInt(time_user[0]);
        time_user[1] = parseInt(time_user[1]);

        if (time_[0] === time_user[0] && time_[1] === time_user[1]) {
            allDone.push(task[0]);
        }
    })

    if (allDone.length > 0) {
        const audio = new Audio("./notify.mp3");
        audio.play();

        const notification = document.querySelector(".notification");

        notification.classList.add('transform-notification');
        notification.innerHTML = "";

        allDone.map((task_) => {
            notification.innerHTML += `• ${task_} [${timeObj}] : [${dateObj}] <br>`;
        })

        setTimeout(() => {
            notification.classList.remove('transform-notification');
        }, 60 * 1000);
    }
}

const Planner = () => {
    const [timedTasks, setTimedTasks] = useState([]);

    const addToPlanner = () => {
        const title = document.querySelector("#planner-title-input").value.trim();
        const time = document.querySelector("#time-input").value.trim();
        const date = document.querySelector("#date-input").value.trim();

        if (title == '' || time == "" || date == "")
            return;

        const userPlanner = [title, time, date];
        setTimedTasks([...timedTasks, userPlanner]);
    }

    setInterval(() => {
        checkTimer(timedTasks);
    }, 10 * 1000);

    return <React.Fragment>
        <Notification />

        <div id="planner-section">
            <h2 id="task-to-be-done-heading">
                <img src="./planner.svg" id="pending-icon" />
                Future
            </h2>

            <div className="planner-input">
                <input type="text" id="planner-title-input" placeholder="Enter title..." />
                <input type="time" id="time-input" />
                <input type="date" id="date-input" />
                <button id="planner-added" onClick={() => { addToPlanner() }} >Add</button>
            </div>

            <ul id="planner-list"> {
                (timedTasks.length > 0) ? timedTasks.map((task, index) => {
                    return <li key={index} className="listitem" >
                        <img className="delete-btn" src="./delete.svg" />
                        <p className="todo-title" > {task[0]} </p>
                        <p className="time-sec" > {task[1]} </p>
                        <p className="date-sec" > {task[2]} </p>
                    </li>
                }) : <div id="nothing-found">
                    Nothing future planned yet!
                </div>
            }
            </ul>
        </div>
    </React.Fragment>
}

export default Planner;