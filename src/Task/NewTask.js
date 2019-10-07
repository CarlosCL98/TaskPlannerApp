import React from "react";
import "./Task.css";
import {MDBContainer, MDBIcon, MDBInput} from "mdbreact";
import Task from "../imgs/logo_v1.png";
import Divider from "@material-ui/core/Divider";
import {Link, Redirect} from "react-router-dom";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";

export class NewTask extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tasks: this.props.location.state,
            newTask: {
                title: "",
                description: "",
                status: "",
                dueDate: "",
                responsible: {
                    name: "",
                    email: ""
                }
            },
            isCreated: false
        };
        this.handleTitle = this.handleTitle.bind(this);
        this.handleDescription = this.handleDescription.bind(this);
        this.handleStatus = this.handleStatus.bind(this);
        this.handleDueDate = this.handleDueDate.bind(this);
        this.handleResponsible = this.handleResponsible.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
    }

    handleTitle(e) {
        e.persist();
        this.setState(prevState => ({
            newTask: {
                title: e.target.value,
                description: prevState.newTask.description,
                status: prevState.newTask.status,
                dueDate: prevState.newTask.dueDate,
                responsible: {
                    name: prevState.newTask.responsible.name,
                    email: prevState.newTask.responsible.email
                }
            }
        }));
    }

    handleDescription(e) {
        e.persist();
        this.setState(prevState => ({
            newTask: {
                title: prevState.newTask.title,
                description: e.target.value,
                status: prevState.newTask.status,
                dueDate: prevState.newTask.dueDate,
                responsible: {
                    name: prevState.newTask.responsible.name,
                    email: prevState.newTask.responsible.email
                }
            }
        }));
    }

    handleStatus(e) {
        e.persist();
        this.setState(prevState => ({
            newTask: {
                title: prevState.newTask.title,
                description: prevState.newTask.description,
                status: e.target.value,
                dueDate: prevState.newTask.dueDate,
                responsible: {
                    name: prevState.newTask.responsible.name,
                    email: prevState.newTask.responsible.email
                }
            }
        }));
    }

    handleDueDate(e) {
        e.persist();
        this.setState(prevState => ({
            newTask: {
                title: prevState.newTask.title,
                description: prevState.newTask.description,
                status: prevState.newTask.status,
                dueDate: e.target.value,
                responsible: {
                    name: prevState.newTask.responsible.name,
                    email: prevState.newTask.responsible.email
                }
            }
        }));
    }

    handleResponsible(e) {
        e.persist();
        this.setState(prevState => ({
            newTask: {
                title: prevState.newTask.title,
                description: prevState.newTask.description,
                status: prevState.newTask.status,
                dueDate: prevState.newTask.dueDate,
                responsible: {
                    name: e.target.value,
                    email: e.target.value + "@mail.com"
                }
            }
        }));
    }

    handleCreate(e) {
        e.preventDefault();
        const title = this.state.newTask.title;
        const description = this.state.newTask.description;
        const status = this.state.newTask.status;
        const dueDate = this.state.newTask.dueDate;
        const responsible = this.state.newTask.responsible.name;
        if (!title.length || !description.length || !status.length || !dueDate.length || !responsible.length) {
            alert("You must enter all fields to create a task.");
            return;
        }
        fetch("http://localhost:8081/taskPlanner/v1/tasks", {
          method: 'POST',
          body: JSON.stringify(this.state.newTask),
          headers:{
            'Content-Type': 'application/json'
          }
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            alert("Success: you have created a new task!");
            this.setState({isCreated: true});
        });
    }

    render() {
        if (this.state.isCreated)
            return <Redirect to={{pathname: "/taskPlanner"}}/>;
        return (
            <MDBContainer style={{width: "80%", marginTop: "5%"}}>
                <div style={{textAlign: "left"}}>
                    <Link to="/taskPlanner" className="btnBack"><MDBIcon icon="arrow-circle-left"/></Link>
                </div>
                <div style={{textAlign: "center", marginBottom: "10%"}}>
                    <h1>Create Task <img className="task" src={Task} alt="task"/></h1>
                </div>
                <Divider/>
                <form onSubmit={this.handleCreate}>
                    <div>
                        <MDBInput
                            label="Title"
                            icon="sticky-note"
                            group
                            type="text"
                            value={this.state.newTask.title}
                            onChange={this.handleTitle}
                        />
                        <MDBInput
                            label="Description"
                            icon="comment-alt"
                            group
                            type="text"
                            value={this.state.newTask.description}
                            onChange={this.handleDescription}
                        />
                        <InputLabel htmlFor="status">Status</InputLabel>
                        <Select style={{minWidth: "100%"}}
                                id="status"
                                value={this.state.newTask.status}
                                onChange={this.handleStatus}
                        >
                            <MenuItem value={"READY"}>READY</MenuItem>
                            <MenuItem value={"IN_PROGRESS"}>IN_PROGRESS</MenuItem>
                            <MenuItem value={"COMPLETE"}>COMPLETE</MenuItem>
                        </Select>
                        <InputLabel style={{marginTop: "5%"}} htmlFor="dueDate">Due Date</InputLabel>
                        <TextField style={{minWidth: "100%"}}
                                   id="dueDate"
                                   type="date"
                                   value={this.state.newTask.dueDate}
                                   onChange={this.handleDueDate}
                        />
                        <MDBInput
                            label="Responsible"
                            icon="user"
                            group
                            type="text"
                            value={this.state.newTask.responsible.name}
                            onChange={this.handleResponsible}
                        />
                    </div>
                    <Divider/>
                    <div style={{textAlign: "right"}}>
                        <div className="btnCreateTask">
                            <Fab style={{backgroundColor: "#0D75EA"}}>
                                <button id="createTask" type={"submit"}>
                                    <MDBIcon icon="check"/>
                                </button>
                            </Fab>
                        </div>
                    </div>
                </form>
            </MDBContainer>
        );
    }
}