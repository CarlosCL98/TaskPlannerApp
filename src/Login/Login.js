import React from "react";
import "./Login.css";
import {MDBBtn, MDBCol, MDBContainer, MDBIcon, MDBInput, MDBRow} from "mdbreact";
import {Link, Redirect} from "react-router-dom";

export class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: "",
            pwd: "",
            isLoggedIn: false
        };
        this.handleUserInput = this.handleUserInput.bind(this);
        this.handlePwdInput = this.handlePwdInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleUserInput(e) {
        this.setState({user: e.target.value});
    }

    handlePwdInput(e) {
        this.setState({pwd: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        const user = this.state.user;
        const pwd = this.state.pwd;
        if (!user.length || !pwd.length) {
            alert("You must enter your email or username and password.");
            return;
        }
        const localUsername = localStorage.getItem("username");
        const localEmail = localStorage.getItem("email");
        const localPwd = localStorage.getItem("pwd");
        if ((localUsername !== user || localEmail !== user) && localPwd !== pwd) {
            alert("Incorrect credentials. Try again!");
            return;
        } else {
            this.setState({isLoggedIn: true});
            localStorage.setItem("isLoggedIn", "true");
        }
    }

    render() {
        if (this.state.isLoggedIn) return <Redirect to="/taskPlanner"/>;
        return (
            <MDBContainer style={{width: "70%"}}>
                <MDBRow>
                    <MDBCol xs={4} sm={5} md={3}></MDBCol>
                    <MDBCol xs={4} sm={2} md={6}>
                        <form onSubmit={this.handleSubmit}>
                            <div>
                                <MDBInput
                                    label="Email or Username"
                                    icon="envelope"
                                    group
                                    type="text"
                                    value={this.state.user}
                                    onChange={this.handleUserInput}
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
                            <div className="btnLogin">
                                <MDBBtn color="blue" type={"submit"}><MDBIcon icon="sign-in-alt"/> Login</MDBBtn>
                            </div>
                        </form>
                    </MDBCol>
                    <MDBCol xs={4} sm={5} md={3}></MDBCol>
                </MDBRow>
                <MDBRow className="registerText">
                    <MDBCol xs={4} sm={5} md={3}></MDBCol>
                    <MDBCol xs={4} sm={2} md={6}>
                        Don't have an account? <Link to="/register">Create one!</Link>
                    </MDBCol>
                    <MDBCol xs={4} sm={5} md={3}></MDBCol>
                </MDBRow>
            </MDBContainer>
        );
    }
}
