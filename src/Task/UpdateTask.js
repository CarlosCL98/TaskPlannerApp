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
import axios from "axios";

export class UpdateTask extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            updatedTask: {
                id: this.props.location.state,
                title: "",
                description: "",
                status: "",
                dueDate: "",
                responsible: {
                    name: "",
                    email: ""
                }
            },
            isUpdated: false
        };
        this.handleTitle = this.handleTitle.bind(this);
        this.handleDescription = this.handleDescription.bind(this);
        this.handleStatus = this.handleStatus.bind(this);
        this.handleDueDate = this.handleDueDate.bind(this);
        this.handleResponsible = this.handleResponsible.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    handleTitle(e) {
        e.persist();
        this.setState(prevState => ({
            updatedTask: {
                id: prevState.updatedTask.id,
                title: e.target.value,
                description: prevState.updatedTask.description,
                status: prevState.updatedTask.status,
                dueDate: prevState.updatedTask.dueDate,
                responsible: {
                    name: prevState.updatedTask.responsible.name,
                    email: prevState.updatedTask.responsible.email
                }
            }
        }));
    }

    handleDescription(e) {
        e.persist();
        this.setState(prevState => ({
            updatedTask: {
                id: prevState.updatedTask.id,
                title: prevState.updatedTask.title,
                description: e.target.value,
                status: prevState.updatedTask.status,
                dueDate: prevState.updatedTask.dueDate,
                responsible: {
                    name: prevState.updatedTask.responsible.name,
                    email: prevState.updatedTask.responsible.email
                }
            }
        }));
    }

    handleStatus(e) {
        e.persist();
        this.setState(prevState => ({
            updatedTask: {
                id: prevState.updatedTask.id,
                title: prevState.updatedTask.title,
                description: prevState.updatedTask.description,
                status: e.target.value,
                dueDate: prevState.updatedTask.dueDate,
                responsible: {
                    name: prevState.updatedTask.responsible.name,
                    email: prevState.updatedTask.responsible.email
                }
            }
        }));
    }

    handleDueDate(e) {
        e.persist();
        this.setState(prevState => ({
            updatedTask: {
                id: prevState.updatedTask.id,
                title: prevState.updatedTask.title,
                description: prevState.updatedTask.description,
                status: prevState.updatedTask.status,
                dueDate: e.target.value,
                responsible: {
                    name: prevState.updatedTask.responsible.name,
                    email: prevState.updatedTask.responsible.email
                }
            }
        }));
    }

    handleResponsible(e) {
        e.persist();
        this.setState(prevState => ({
            updatedTask: {
                id: prevState.updatedTask.id,
                title: prevState.updatedTask.title,
                description: prevState.updatedTask.description,
                status: prevState.updatedTask.status,
                dueDate: prevState.updatedTask.dueDate,
                responsible: {
                    name: e.target.value,
                    email: e.target.value + "@mail.com"
                }
            }
        }));
    }

    handleUpdate(e) {
        e.preventDefault();
        const self = this;
        axios.put("http://localhost:8081/taskPlanner/v1/tasks", self.state.updatedTask)
            .then(function (response) {
                alert("Success: you have updated the task!");
                self.setState({isUpdated: true});
            })
            .catch(function (error) {
                console.log("Error: it could not update the task. --> " + error);
            });
    }

    componentDidMount() {
        fetch("http://localhost:8081/taskPlanner/v1/tasks/" + this.state.updatedTask.id)
            .then(response => response.json())
            .then(data => {
                this.setState(prevState => ({
                    updatedTask: {
                        id: data.id,
                        title: data.title,
                        description: data.description,
                        status: data.status,
                        dueDate: data.dueDate,
                        responsible: {
                            name: data.responsible.name,
                            email: data.responsible.email
                        }
                    }
                }));
            });
    }

    render() {
        if (this.state.isUpdated)
            return <Redirect to={{pathname: "/taskPlanner"}}/>;
        return (
            <MDBContainer style={{width: "80%", marginTop: "5%"}}>
                <div style={{textAlign: "left"}}>
                    <Link to="/taskPlanner" className="btnBack"><MDBIcon icon="arrow-circle-left"/></Link>
                </div>
                <div style={{textAlign: "center", marginBottom: "10%"}}>
                    <h1>Update Task <img className="task" src={Task} alt="task"/></h1>
                </div>
                <Divider/>
                <form onSubmit={this.handleUpdate}>
                    <div>
                        <MDBInput
                            label="Title"
                            icon="sticky-note"
                            group
                            type="text"
                            value={this.state.updatedTask.title}
                            onChange={this.handleTitle}
                        />
                        <MDBInput
                            label="Description"
                            icon="comment-alt"
                            group
                            type="text"
                            value={this.state.updatedTask.description}
                            onChange={this.handleDescription}
                        />
                        <InputLabel htmlFor="status">Status</InputLabel>
                        <Select style={{minWidth: "100%"}}
                                value={this.state.updatedTask.status}
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
                                   value={this.state.updatedTask.dueDate}
                                   onChange={this.handleDueDate}
                        />
                        <MDBInput
                            label="Responsible"
                            icon="user"
                            group
                            type="text"
                            value={this.state.updatedTask.responsible.name}
                            onChange={this.handleResponsible}
                        />
                    </div>
                    <Divider/>
                    <div style={{textAlign: "right"}}>
                        <div className="btnUpdateTask">
                            <Fab style={{backgroundColor:"#0D75EA"}}>
                                <button id="updateTask" type={"submit"}>
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