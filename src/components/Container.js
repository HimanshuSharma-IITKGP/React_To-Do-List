import React, { useState } from "react";
import Task from "./Task";
import TaskCounter from "./TaskCounter";

export default function Container() {

    const [tasksArray, setTasksArray] = useState([]);
    const [index, setIndex] = useState(1);
    const [completed,setCompleted] = useState(0) ;
    const [total ,setTotal] = useState(0) ;
    const [inputData,setInputData] = useState("") ;

    function addNewTask() {
        if (inputData.replace(/\s/g, '').length === 0) {
            return;
        }
        setIndex( index + 1)
        setTasksArray((prevTasksArray) => [...prevTasksArray, { id: index, work: inputData , isComplete: false }]) ;
        setTotal( (t) => t + 1 )
    }


    function deleteTask(id) {
        setIndex((i) => i - 1) ;
        setTotal((t) => t - 1) ;
        setTasksArray((prevTasksArray) => {
            const newTasksArray = [];

            for (let i = 0; i < prevTasksArray.length; i++) {
                const a = prevTasksArray[i];
                if (a.id === id) {
                    continue ;
                }

                else if (a.id > id) {
                    a.id = prevTasksArray[i].id - 1 ;
                }

                newTasksArray.push(a) ;
            }

            return newTasksArray;
        })
    }


    
    function moveUp(id) {
        if (id === 1) {
            alert("Can't Move Up");
            return;
        }

        setTasksArray((prevTasksArray) => {
            const newTasksArray = [];

            for (let i = 0; i < prevTasksArray.length; i++) {
                if (prevTasksArray[i].id === id - 1) {
                    const a = prevTasksArray[i].work;
                    prevTasksArray[i].work = prevTasksArray[i + 1].work;
                    prevTasksArray[i + 1].work = a;
                }

                newTasksArray.push(prevTasksArray[i]);
            }

            return newTasksArray;
        })
    }



    function moveDown(id) {
    
        if (id === index - 1) {
            alert("Can't Go Down");
            return;
        }

        setTasksArray((prevTasksArray) => {
            const newTasksArray = [];

            for (let i = 0; i < prevTasksArray.length; i++) {
                if (prevTasksArray[i].id === id) {
                    const a = prevTasksArray[i].work;
                    prevTasksArray[i].work = prevTasksArray[i + 1].work;
                    prevTasksArray[i + 1].work = a;
                }

                newTasksArray.push(prevTasksArray[i]);
            }

            return newTasksArray;
        })
    }

    function toggleComplete(id) {
        setTasksArray((prevTasksArray) => {
            return prevTasksArray.map((task) => {

                if(task.id===id){
                    if(task.isComplete === true){
                        setCompleted( (c) => c - 1) ;
                    }
                    else{
                        setCompleted( (c) => c + 1) ;
                    }
                    return { ...task, isComplete: !task.isComplete }  ;
                }
                else{
                    return task ;
                }
            })
        })
    }

    const DOMTasks = tasksArray.map((task) => {
        return <Task task={task}
            deleteTask={deleteTask}
            moveUp={moveUp}
            moveDown={moveDown}
            toggleComplete={toggleComplete}
            key={task.id} />
    })

    function handleChange(event){
        setInputData(event.target.value) ;
    }




    return (
        <div className="wrapper">
            <TaskCounter    completed={completed} 
                            total = {total} />
            <div className="container">
                <div className="input-div">
                    <input 
                            type="text" 
                            name="" 
                            id="input-area" 
                            placeholder="Write something and click on plus" 
                            onChange={handleChange}  
                            value = {inputData}
                    />

                    <button id="add" onClick={addNewTask} >+</button>
                </div>
                {DOMTasks}
            </div>
        </div>
    )
}