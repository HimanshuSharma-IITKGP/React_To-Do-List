import React from "react";

export default function TaskCounter(props) {
    return (
        <div className="task-counter">
            <span>counter : </span>
            <span className="completed">{props.completed}</span>
            /<span className="total">{props.total}</span>
        </div>
    )
}