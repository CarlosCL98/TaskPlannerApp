import React from "react";
import {MDBRow, MDBCol, MDBContainer} from "mdbreact";
import homeBanner from "../imgs/logo_v2.png";
import "./Home.css";
import {Login} from "../Login/Login";

export class Home extends React.Component {

    render() {
        return (
            <div>
                <MDBContainer style={{width: "100%"}}>
                    <MDBRow className="title">
                        <MDBCol xs={2} sm={2} md={2}></MDBCol>
                        <MDBCol xs={8} sm={8} md={8}>
                            <img className="imgBanner" src={homeBanner} alt="banner"></img>
                        </MDBCol>
                        <MDBCol xs={2} sm={2} md={2}></MDBCol>
                    </MDBRow>
                </MDBContainer>
                <MDBContainer style={{width: "70%"}}>
                    <MDBRow className="description">
                        <MDBCol xs={5} sm={2} md={2}></MDBCol>
                        <MDBCol xs={2} sm={8} md={8}>
                            <p>Task Planner App allows you to create tasks, asign them to a responsible, establish a due
                                date to do it and put them a state to do the correct tracing of all the activities
                                ready, in progress or complete.</p>
                        </MDBCol>
                        <MDBCol xs={5} sm={2} md={2}></MDBCol>
                    </MDBRow>
                </MDBContainer>
                <Login/>
            </div>
        );
    }
}