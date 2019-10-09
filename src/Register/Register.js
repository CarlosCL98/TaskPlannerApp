import React from "react";
import "./Register.css";
import {MDBBtn, MDBCol, MDBContainer, MDBInput, MDBRow} from "mdbreact";
import {Link, Redirect} from "react-router-dom";
import Avatar from "../imgs/avatar.png";
import axios from "axios";

export class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            username: "",
            email: "",
            pwd: "",
            pwdVerify: "",
            isRegistered: false
        };
        this.handleNameInput = this.handleNameInput.bind(this);
        this.handleUsernameInput = this.handleUsernameInput.bind(this);
        this.handleEmailInput = this.handleEmailInput.bind(this);
        this.handlePwdInput = this.handlePwdInput.bind(this);
        this.handlePwdVerifyInput = this.handlePwdVerifyInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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

    handleSubmit(e) {
        e.preventDefault();
        const name = this.state.name;
        const username = this.state.username;
        const email = this.state.email;
        const pwd = this.state.pwd;
        const pwdVerify = this.state.pwdVerify;
        if (!name.length || !username.length || !email.length || !pwd.length || !pwdVerify.length) {
            alert("You must enter all fields.");
            return;
        }
        if (pwd !== pwdVerify) {
            alert("Verify password.");
            return;
        }
        const self = this;
        axios.post('http://localhost:8081/taskPlanner/v1/user/register', {
            name: self.state.name,
            username: self.state.username,
            email: self.state.email,
            password: self.state.pwd
        })
            .then(function (response) {
                alert("Success: you have registered!");
                self.setState({isRegistered: true});
            })
            .catch(function (error) {
                console.log(error);
                alert("Error: register was not complete. Try again");
            });
    }

    render() {
        if (this.state.isRegistered) return <Redirect to="/"/>;
        return (
            <div>
                <MDBContainer style={{width: "100%"}}>
                    <MDBRow className="registerTitle">
                        <MDBCol xs={2} sm={2} md={2}></MDBCol>
                        <MDBCol xs={8} sm={8} md={8}>
                            <h1>Register</h1>
                            <p>It's easy. It would take just a few seconds.</p>
                        </MDBCol>
                        <MDBCol xs={2} sm={2} md={2}></MDBCol>
                    </MDBRow>
                </MDBContainer>
                <MDBContainer style={{width: "80%"}}>
                    <MDBRow>
                        <MDBCol xs={4} sm={5} md={3}></MDBCol>
                        <MDBCol xs={4} sm={2} md={6}>
                            <form onSubmit={this.handleSubmit}>
                                <div>
                                    <div style={{textAlign: "center"}}>
                                        <img className="avatar" src={Avatar} alt="avatar"/>
                                    </div>
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
                                <div className="btnRegister">
                                    <MDBBtn color="blue" type={"submit"}>Register</MDBBtn>
                                </div>
                            </form>
                        </MDBCol>
                        <MDBCol xs={4} sm={5} md={3}></MDBCol>
                    </MDBRow>
                    <MDBRow className="loginText">
                        <MDBCol xs={4} sm={5} md={3}></MDBCol>
                        <MDBCol xs={4} sm={2} md={6}>
                            Already have an account? <Link to="/">Login</Link>
                        </MDBCol>
                        <MDBCol xs={4} sm={5} md={3}></MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div>
        );
    }

}