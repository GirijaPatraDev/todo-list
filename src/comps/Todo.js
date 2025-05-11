import Header from "./Header";
import TaskList from "./TaskList";
import '../App.css';

function Todo() {
    return(
        <div className="todo">
            <Header />
            <h2>Todo List</h2>
            <TaskList />
        </div>
    );
}

export default Todo;