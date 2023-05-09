import React from "react";
import './input.css';

const Input = ({ addTodoToState, addState, allTodos, setAllTodos }) => {
    return <div id="input-section">
        <input type="text" placeholder="Enter new item..." id="input-field"
            onChange={(event) => {
                const newTodo = event.target.value.trim();
                if (newTodo == "")
                    return;
                addState(newTodo);
            }}
        />

        <button id="add-btn"
            onClick={() => {
                const newTodo = document.querySelector("#input-field").value.trim();
                if (newTodo == '')
                    return;

                allTodos = [...allTodos, addTodoToState];
                setAllTodos(allTodos);
                document.querySelector("#input-field").value = "";
            }}>
            Add
        </button>
    </div>
}

export default Input;