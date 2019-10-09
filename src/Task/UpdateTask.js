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
            id: this.props.location.state,
            title: "",
            description: "",
            status: "",
            dueDate: "",
            responsible: "",
            isUpdated: false
        };
        this.handleTitle = this.handleTitle.bind(this);
        this.handleDescription = this.handleDescription.bind(this);
        this.handleStatus = this.handleStatus.bind(this);
        this.handleDueDate = this.handleDueDate.bind(this);
        this.handleResponsible = this.handleResponsible.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
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

    async handleUpdate(e) {
        e.preventDefault();
        const title = this.state.title;
        const description = this.state.description;
        const status = this.state.status;
        const dueDate = this.state.dueDate;
        const responsible = this.state.responsible;
        let ok = true;
        const self = this;
        await this.axios.put("http://localhost:8081/taskPlanner/v1/tasks", {
            id: this.state.id,
            title: title,
            description: description,
            status: status,
            dueDate: dueDate,
            responsible: null
        })
            .then(function (response) {
                alert("Success: you have updated the task!");
            })
            .catch(function (error) {
                console.log("Error: it could not update the task. --> " + error);
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
            this.setState({isUpdated: true});
        }
    }

    componentDidMount() {
        const self = this;
        this.axios.get("http://localhost:8081/taskPlanner/v1/tasks/" + this.state.id)
            .then(function (response) {
                self.setState({
                    title: response.data.title,
                    description: response.data.description,
                    status: response.data.status,
                    dueDate: response.data.dueDate,
                    responsible: response.data.responsible !== null ? response.data.responsible.email : ""
                });
            })
            .catch(function (error) {
                console.log(error);
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
                    </div>
                    <Divider/>
                    <div style={{textAlign: "right"}}>
                        <div className="btnUpdateTask">
                            <Fab style={{backgroundColor: "#0D75EA"}}>
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