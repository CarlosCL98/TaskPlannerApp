import React from "react";
import {MDBCard, MDBCardBody, MDBCardHeader, MDBCardTitle} from "mdbreact";

export class Task extends React.Component {

    render() {
        return (
            <MDBCard>
                <MDBCardHeader>
                    <MDBCardTitle>Task1</MDBCardTitle>
                </MDBCardHeader>
            </MDBCard>
        );
    }
}