import React from "react";
import {Task} from "./Task";
import {MDBContainer} from "mdbreact";

export class TaskList extends React.Component {

    render() {
        const taskList = this.props.task;
        const tasks = taskList.map((task, i) => (
                <MDBContainer key={"task_" + i} style={{width: "90%", marginBottom: "10%"}}>
                    <Task key={"task_" + i} title={task.title} description={task.description} status={task.status}
                          dueDate={task.dueDate} responsible={task.responsible}/>
                </MDBContainer>
            )
        );
        return (
            <div style={{width: "100%", marginTop: "10%"}}>
                {tasks}
            </div>
        );
    }
}