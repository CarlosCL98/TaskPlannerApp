import React from "react";
import {Task} from "./Task";

export class TaskList extends React.Component {

    render() {
        const taskList = this.props.task;
        const tasks = taskList.map((task, i) => (
                <div key={"task_" + i}>
                    <Task></Task>
                </div>
            )
        );
        return (
            <div>
                {tasks}
            </div>
        );
    }
}