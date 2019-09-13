import React from "react";
import { MDBRow, MDBCol, MDBContainer } from "mdbreact";
import homeBanner from "../taskList.png";
import "./Home.css";

export class Home extends React.Component {

    render() {
        return (
            <div>
                <MDBContainer>
                    <MDBRow className="titulo">
                        <MDBCol xs={4}></MDBCol>
                        <MDBCol xs={4}>
                            <h2>Task Planner<br/>App</h2>
                        </MDBCol>
                        <MDBCol xs={4}></MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol xs={5}></MDBCol>
                        <MDBCol xs={2}>
                            <img className="imgBanner" src={homeBanner}></img>
                        </MDBCol>
                        <MDBCol xs={5}></MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div>
        );
    }
}