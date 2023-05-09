import React from "react";
import './header.css';
import InputSection from "../InputSection/InputSection";

const Header = ({ addTodoToState, addState, allTodos, setAllTodos }) => {
    return <ul id="header">
        <div id="header-blur">
        </div>
        <h3 id="header-text">
            <InputSection
                addTodoToState={addTodoToState}
                addState={addState}
                allTodos={allTodos}
                setAllTodos={setAllTodos}
            />
        </h3>
    </ul>
}

export default Header;