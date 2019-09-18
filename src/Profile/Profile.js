import React from "react";
import "./Profile.css";
import {MDBBtn, MDBContainer, MDBIcon, MDBInput} from "mdbreact";
import Avatar from "../imgs/avatar.png";
import Divider from "@material-ui/core/Divider";
import {Redirect} from "react-router-dom";

export class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: localStorage.getItem("name") ? localStorage.getItem("name") : "",
            username: localStorage.getItem("username") ? localStorage.getItem("username") : "",
            email: localStorage.getItem("email") ? localStorage.getItem("email") : "",
            pwd: localStorage.getItem("pwd") ? localStorage.getItem("pwd") : "",
            isUpdated: false
        };
        this.handleNameInput = this.handleNameInput.bind(this);
        this.handleUsernameInput = this.handleUsernameInput.bind(this);
        this.handleEmailInput = this.handleEmailInput.bind(this);
        this.handlePwdInput = this.handlePwdInput.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleGoBack = this.handleGoBack.bind(this);
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

    handleUpdate(e) {
        e.preventDefault();
        const name = this.state.name;
        const username = this.state.username;
        const email = this.state.email;
        const pwd = this.state.pwd;
        localStorage.setItem("name", name);
        localStorage.setItem("username", username);
        localStorage.setItem("email", email);
        localStorage.setItem("pwd", pwd);
        alert("Success: you have updated your profile!");
        this.setState({
            name: localStorage.getItem("name") ? localStorage.getItem("name") : "",
            username: localStorage.getItem("username") ? localStorage.getItem("username") : "",
            email: localStorage.getItem("email") ? localStorage.getItem("email") : "",
            pwd: localStorage.getItem("pwd") ? localStorage.getItem("pwd") : "",
            isUpdated: true
        });
    }

    handleGoBack(e) {
        this.setState({isUpdated:true});
    }

    render() {
        if (this.state.isUpdated) return <Redirect to="/taskPlanner"/>;
        return (
            <MDBContainer style={{width: "80%", marginTop: "10%"}}>
                <div style={{textAlign: "center", marginBottom: "10%"}}>
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
                    </div>
                    <Divider/>
                    <div style={{textAlign: "center"}}>
                        <div className="btnUpdateProfile">
                            <MDBBtn id="updateProfile" color="blue" type={"submit"}><MDBIcon
                                icon="user-edit"/> Update</MDBBtn>
                        </div>
                        <div>
                            <MDBBtn id="goBack" color="blue" onClick={this.handleGoBack}><MDBIcon icon="arrow-circle-left"/> Go Back</MDBBtn>
                        </div>
                    </div>
                </form>
            </MDBContainer>
        );
    }
}