import React from "react";
import "./TaskPlanner.css";
import {Navbar} from "./Navbar";
import {TaskList} from "../Task/TaskList";
import {Link} from "react-router-dom";
import {MDBIcon} from "mdbreact";
import Fab from "@material-ui/core/Fab";
import axios from "axios";

export class TaskPlanner extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: "",
            tasks: []
        };
        this.axios = axios.create({
            baseURL: 'http://localhost:8081/taskPlanner/v1/',
            timeout: 1000,
            headers: {'Authorization': 'Bearer ' + localStorage.getItem("authToken")}
        });
    }

    componentDidMount() {
        const self = this;
        this.axios.get("http://localhost:8081/taskPlanner/v1/users/usernameEmail/" + localStorage.getItem("user"))
            .then(function (response) {
                self.setState({user: response.data});
            })
            .catch(function (error) {
                console.log(error);
            });
        this.axios.get("http://localhost:8081/taskPlanner/v1/tasks")
            .then(function (response) {
                let tasksList = [];
                response.data.forEach(function (task) {
                    tasksList.push(
                        task
                    )
                });
                self.setState({tasks: tasksList});
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return (
            <div>
                <Navbar user={this.state.user}/>
                <TaskList task={this.state.tasks}/>
                <div className="btnCreateTask" style={{textAlign: "right", marginRight: "7%"}}>
                    <Link to={{pathname: "/taskPlanner/newTask"}}>
                        <Fab style={{backgroundColor: "#0D75EA"}}>
                            <MDBIcon icon={"plus"} className="iconNewTask"/>
                        </Fab>
                    </Link>
                </div>
            </div>
        );
    }
}