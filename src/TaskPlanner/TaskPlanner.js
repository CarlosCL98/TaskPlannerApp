import React from "react";
import {Navbar} from "./Navbar";
import {TaskList} from "../Task/TaskList";
import {Link} from "react-router-dom";
import {MDBContainer, MDBIcon} from "mdbreact";

export class TaskPlanner extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tasks: [
                {
                    "title": "Implement Login View",
                    "description": "Here you must do the react view to allow someone to login in your app.",
                    "responsible": {
                        "name": "Carlos Medina",
                        "email": "carlos.medina@gmail.com"
                    },
                    "status": "ready",
                    "dueDate": new Date("2019-09-16").toDateString()
                },
                {
                    "title": "Implement Register View",
                    "description": "Here you must do the react view to allow someone to register in your app.",
                    "responsible": {
                        "name": "Carlos Medina",
                        "email": "carlos.medina@gmail.com"
                    },
                    "status": "in progress",
                    "dueDate": new Date("2019-09-16").toDateString()
                },
                {
                    "title": "Task Planner List",
                    "description": "Here you must do the react view to allow someone to see their tasks in your app.",
                    "responsible": {
                        "name": "Carlos Medina",
                        "email": "carlos.medina@gmail.com"
                    },
                    "status": "complete",
                    "dueDate": new Date("2019-09-16").toDateString()
                }
            ]
        };
        if (this.props.location.state) {
            const newTask = this.props.location.state;
            this.state = {
                tasks: newTask
            };
        }
    }

    render() {
        return (
            <div>
                <Navbar/>
                <TaskList task={this.state.tasks}/>
                <MDBContainer style={{textAlign: "right"}}>
                    <Link to={{pathname: "/taskPlanner/newTask", state: this.state.tasks}} color={"blue"} style={{borderRadius: "100%"}}>
                        <MDBIcon icon={"plus-circle"}/> New Task
                    </Link>
                </MDBContainer>
            </div>
        );
    }
}