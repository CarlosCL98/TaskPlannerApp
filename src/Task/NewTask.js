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

export class NewTask extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: "",
            title: "",
            description: "",
            status: "",
            dueDate: "",
            responsible: "",
            file: "",
            isCreated: false
        };
        this.handleTitle = this.handleTitle.bind(this);
        this.handleDescription = this.handleDescription.bind(this);
        this.handleStatus = this.handleStatus.bind(this);
        this.handleDueDate = this.handleDueDate.bind(this);
        this.handleResponsible = this.handleResponsible.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.handleFile = this.handleFile.bind(this);
        this.axios = axios.create({
            baseURL: 'http://localhost:8081/taskPlanner/v1/',
            timeout: 1000,
            headers: {'Authorization': 'Bearer ' + localStorage.getItem("authToken")}
        });
    }

    handleTitle(e) {
        this.setState({title: e.target.value});
    }

    handleDescription(e) {
        this.setState({description: e.target.value});
    }

    handleStatus(e) {
        this.setState({status: e.target.value});
    }

    handleDueDate(e) {
        this.setState({dueDate: e.target.value});
    }

    handleResponsible(e) {
        this.setState({responsible: e.target.value});
    }

    async handleCreate(e) {
        e.preventDefault();
        const title = this.state.title;
        const description = this.state.description;
        const status = this.state.status;
        const dueDate = this.state.dueDate;
        const responsible = this.state.responsible;
        let ok = true;
        if (!title.length || !description.length || !status.length || !dueDate.length) {
            alert("You must enter all fields to create a task.");
            return;
        }
        const self = this;
        let data = new FormData();
        data.append("file", this.state.file);
        await this.axios.post("http://localhost:8081/taskPlanner/v1/files", data)
            .then(function (response) {
                console.log("File uploaded successfully!");
            })
            .catch(function (error) {
                console.log("Failed file upload. Please verify.", error);
            });
        /*
        await this.axios.post('http://localhost:8081/taskPlanner/v1/tasks', {
            title: title,
            description: description,
            status: status,
            dueDate: dueDate,
            responsible: null
        })
            .then(function (response) {
                alert("Success: you have created a new task!");
                self.setState({id: response.data.id});
            })
            .catch(function (error) {
                alert("Something happen! The task couldn't be created. Try again.");
                console.log(error);
                ok = ok && false;
            });
        if (responsible.length) {
            await this.axios.get("http://localhost:8081/taskPlanner/v1/users/usernameEmail/" + this.state.responsible)
                .then(function (response) {
                    self.setState({responsible: response.data});
                })
                .catch(function (error) {
                    console.log(error);
                    ok = ok && false;
                });
            await this.axios.put("http://localhost:8081/taskPlanner/v1/users/tasks/" + this.state.id, this.state.responsible)
                .then(function (response) {
                })
                .catch(function (error) {
                    console.log(error);
                    ok = ok && false;
                });
        }
        if (ok) {
            this.setState({isCreated: true});
        }*/
    }

    handleFile(e) {
        this.setState({file: e.target.files[0]});
        console.log(e.target.files);
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
                            value={this.state.title}
                            onChange={this.handleTitle}
                        />
                        <MDBInput
                            label="Description"
                            icon="comment-alt"
                            group
                            type="text"
                            value={this.state.description}
                            onChange={this.handleDescription}
                        />
                        <InputLabel htmlFor="status">Status</InputLabel>
                        <Select style={{minWidth: "100%"}}
                                id="status"
                                value={this.state.status}
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
                                   value={this.state.dueDate}
                                   onChange={this.handleDueDate}
                        />
                        <MDBInput
                            label="Responsible Email"
                            icon="user"
                            group
                            type="email"
                            value={this.state.responsible}
                            onChange={this.handleResponsible}
                        />
                        <input
                            type="file"
                            id="file"
                            onChange={this.handleFile}
                            style={{width: "100%", marginBottom: "10%"}}
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