import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTask, deleteTask, toggleMarkAsDone } from "../redux/taskSlice";
import { toast } from "react-toastify";
import '../App.css';
import '../css/TaskList.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {v4 as uid} from 'uuid';

function TaskList({searchQuery}) {
    //const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState("");
    //const [markedTasks, setMarkedTasks] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedPriority, setSelectedPriority] = useState("Low");

    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.tasks.taskList);
    //const markedTasks = useSelector((state) => state.tasks.markedTasks);

    const searchedTasks = searchQuery ? tasks.filter(
        task=>
            task.text.toLowerCase().includes(searchQuery.toLowerCase())
    ) : tasks;


    const handleAddTask = (e) => {
        e.preventDefault();
        if (task.trim()) {
            //setTasks([...tasks, {text: task, date: selectedDate, priority: selectedPriority}]);
            dispatch(addTask({
                id: uid(),
                text: task, 
                date: selectedDate,
                priority: selectedPriority,
                markedAsDone: false
            }))
            console.log(task);
            setTask("");
            setSelectedDate(null);  
            setSelectedPriority("");
            toast.success("Task Added Successfully", {
                position: "top-center"
            });
            
        } else {
            console.log("could not add task");
        }
        
    }

    const handleDltTask = (e, taskToDltID)=>{
        e.preventDefault();
        //const filteredTasks = tasks.filter(t => t!== taskToDlt);
        //setTasks(filteredTasks);
        dispatch(deleteTask(taskToDltID));
        console.log("tasks: "  , tasks, " after removing task: ", taskToDltID);
    }

    const handleMarkDone = (taskToMarkID)=>{
        /*setMarkedTasks(prev =>
            prev.includes(taskToMark) ? 
            prev.filter(t => t!==taskToMark) :
            [...prev, taskToMark]
        );*/
        dispatch(toggleMarkAsDone(taskToMarkID));
    };


    const handleEditTask = (t)=>{
        
    }
    return(
        <div>
            <form onSubmit={handleAddTask}>
            <input value={task} onChange={(e)=>setTask(e.target.value)}
              placeholder="Add a new Task"/>
            <DatePicker selected={selectedDate} onChange={date=> setSelectedDate(date)}
                minDate={new Date()} isClearable
                showYearDropdown scrollableMonthYearDropdown showIcon 
                placeholderText="due date"/>
            <select value={selectedPriority} onChange={(e)=>setSelectedPriority(e.target.value)}>
                <option>Select Priority</option>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
            </select>
            <button>Add Task</button>
            </form>
            <ol>
                {
                   searchedTasks.map((element, index) => 
                   (
                    <div style={{display:"flex", alignItems: "center", gap:"10px"}}>
                    <li key={index} className={element.markedAsDone === true ? "marked" : ""}>{element.text}</li> 
                    <p>{element.date ? element.date.toLocaleDateString() : new Date().toLocaleDateString()}</p>
                    <p>{element.priority? element.priority: "Low"}</p>
                    <button style={{width:"100px"}} onClick={(element) => handleEditTask(element)}>
                        Edit Task</button>
                    <button style={{width:"100px"}} onClick={(e)=>handleDltTask(e, element.id)}>
                        Delete Task</button>
                    <button style={{width:"100px"}} onClick={() => handleMarkDone(element.id)}>
                        Mark as Done</button>
                    </div>
                   )
                )
                }
            </ol>
        </div>
    )
}

export default TaskList;