import React from "react";
import {Navbar} from "./Navbar";
import {TaskList} from "../Task/TaskList";

export class TaskPlanner extends React.Component {

    render() {
        const task = [{
            "description": "some description text ",
            "responsible": {
                "name": "Santiago Carrillo",
                "email": "sancarbar@gmail"
            },
            "status": "ready",
            "dueDate": 156464645646
        }];
        return (
            <div>
                <Navbar/>
                <TaskList task={task}/>
            </div>
        );
    }
}