import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    taskList: [],
};

export const taskSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        addTask: (state, action) =>{
            state.taskList.push(action.payload);
        },
        deleteTask: (state, action) =>{
            state.taskList = state.taskList.filter(task => task.id!==action.payload)
            //state.markedTasks = state.markedTasks.filter(id => id!==action.payload)
        },
        toggleMarkAsDone: (state, action)=>{
            //const taskid = action.payload;
            /*if (state.markedTasks.includes(id)) {
                state.markedTasks = state.markedTasks.filter(tid => tid !== id)
                
            } else{
                state.markedTasks.push(id)
            }*/
           state.taskList = state.taskList.map(t=>{
            if (t.id === action.payload) {
               return { ...t, markedAsDone: !t.markedAsDone}
            } else {
                return t;
            }
           })
        }
    }
});

export const { addTask, deleteTask, toggleMarkAsDone } = taskSlice.actions;
export default taskSlice.reducer;