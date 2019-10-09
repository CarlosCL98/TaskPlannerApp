import React from "react";
import "./Profile.css";
import {MDBContainer, MDBIcon, MDBInput} from "mdbreact";
import Avatar from "../imgs/avatar.png";
import Divider from "@material-ui/core/Divider";
import Fab from '@material-ui/core/Fab';
import {Link, Redirect} from "react-router-dom";
import axios from "axios";

export class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: "",
            name: "",
            username: "",
            email: "",
            pwd: "",
            pwdVerify: "",
            isUpdated: false
        };
        this.handleNameInput = this.handleNameInput.bind(this);
        this.handleUsernameInput = this.handleUsernameInput.bind(this);
        this.handleEmailInput = this.handleEmailInput.bind(this);
        this.handlePwdInput = this.handlePwdInput.bind(this);
        this.handlePwdVerifyInput = this.handlePwdVerifyInput.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.axios = axios.create({
            baseURL: 'http://localhost:8081/taskPlanner/v1/',
            timeout: 1000,
            headers: {'Authorization': 'Bearer ' + localStorage.getItem("authToken")}
        });
    }

    handleNameInput(e) {
        this.setState({name: e.target.value});
    }

    handleUsernameInput(e) {
        this.setState({username: e.target.value});
    }

    handleEmailInput(e) {
        this.setState({email: e.target.value});
    }

    handlePwdInput(e) {
        this.setState({pwd: e.target.value});
    }

    handlePwdVerifyInput(e) {
        this.setState({pwdVerify: e.target.value});
    }

    handleUpdate(e) {
        e.preventDefault();
        const name = this.state.name;
        const username = this.state.username;
        const email = this.state.email;
        const pwd = this.state.pwd;
        const pwdVerify = this.state.pwdVerify;
        if (pwd !== pwdVerify) {
            alert("Check your password. You must write it twice correctly.");
            return;
        }
        localStorage.setItem("user", email);
        const self = this;
        this.axios.put("http://localhost:8081/taskPlanner/v1/users", {
            id: this.state.id,
            name: name,
            username: username,
            email: email,
            password: pwd
        })
            .then(function (response) {
                alert("Success: you have updated your profile!");
                self.setState({isUpdated: true});
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    componentDidMount() {
        const self = this;
        this.axios.get("http://localhost:8081/taskPlanner/v1/users/usernameEmail/" + localStorage.getItem("user"))
            .then(function (response) {
                self.setState({
                    id: response.data.id,
                    name: response.data.name,
                    username: response.data.username,
                    email: response.data.email,
                    pwd: response.data.password,
                    pwdVerify: response.data.password
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        if (this.state.isUpdated) return <Redirect to="/taskPlanner"/>;
        return (
            <MDBContainer style={{width: "80%", marginTop: "5%"}}>
                <div style={{textAlign: "left"}}>
                    <Link to="/taskPlanner" className="btnBack"><MDBIcon icon="arrow-circle-left"/></Link>
                </div>
                <div style={{textAlign: "center", marginBottom: "2%"}}>
                    <h1>Update Profile</h1>
                    <img className="avatarProfile" src={Avatar} alt="avatar"/>
                </div>
                <Divider/>
                <form onSubmit={this.handleUpdate}>
                    <div>
                        <MDBInput
                            label="Name"
                            icon="user-circle"
                            group
                            type="text"
                            value={this.state.name}
                            onChange={this.handleNameInput}
                        />
                        <MDBInput
                            label="Username"
                            icon="user-circle"
                            group
                            type="text"
                            value={this.state.username}
                            onChange={this.handleUsernameInput}
                        />
                        <MDBInput
                            label="Email"
                            icon="envelope"
                            group
                            type="email"
                            value={this.state.email}
                            onChange={this.handleEmailInput}
                        />
                        <MDBInput
                            label="Password"
                            icon="lock"
                            group
                            type="password"
                            value={this.state.pwd}
                            onChange={this.handlePwdInput}
                        />
                        <MDBInput
                            label="Password Verify"
                            icon="lock"
                            group
                            type="password"
                            value={this.state.pwdVerify}
                            onChange={this.handlePwdVerifyInput}
                        />
                    </div>
                    <Divider/>
                    <div style={{textAlign: "right"}}>
                        <div className="btnUpdateProfile">
                            <Fab style={{backgroundColor: "#0D75EA"}}>
                                <button id="updateProfile" type={"submit"}>
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