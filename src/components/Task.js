import React from "react";

export default function Task(props) {

    const toggleCheck = {
        backgroundColor : props.task.isComplete ? "#5cb85c" : "white" ,
        color : props.task.isComplete ? "white" : "black" 
    }

    return (
        props.task.id && <div className="task" style={toggleCheck}>
            <span className="number">{props.task.id}</span>
            <input  type="checkbox" 
                    onChange={()=>props.toggleComplete(props.task.id)}
                    checked={props.isComplete}
            />
            <span className="work"> {props.task.work}</span>
            <button className="delete">
                <span className="material-symbols-outlined" onClick={()=> props.deleteTask(props.task.id)} >
                    delete
                </span>
            </button>
            <button className="up" onClick={()=>props.moveUp(props.task.id)} >
                <span className="material-symbols-outlined">
                    north
                </span>
            </button>
            <button className="down" onClick={()=>props.moveDown(props.task.id)} >
                <span className="material-symbols-outlined">
                    south
                </span>
            </button>
        </div>
    )
}