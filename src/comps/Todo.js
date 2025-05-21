import Header from "./Header";
import TaskList from "./TaskList";
import '../App.css';
import { useState } from "react";

function Todo() {
    const [searchQuery, setSearchQuery] = useState('');
    return(
        <div className="todo">
            <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
            <TaskList searchQuery={searchQuery}/>
        </div>
    );
}

export default Todo;