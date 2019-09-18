import React from "react";
import {
    MDBCard,
    MDBCardBody,
    MDBCardHeader,
    MDBCardText,
    MDBCardTitle,
    MDBIcon
} from "mdbreact";
import {Link} from "react-router-dom";

export class Task extends React.Component {

    render() {
        const iconStatus = (
            this.props.status === "ready" ?
                <MDBIcon icon={"business-time"} style={{color: "red"}}/> : (
                    this.props.status === "in progress" ?
                        <MDBIcon icon={"tasks"} style={{color: "orange"}}/> :
                        <MDBIcon icon={"check-circle"} style={{color: "green"}}/>)
        );
        return (
            <MDBCard>
                <MDBCardHeader>
                    <MDBCardTitle>{this.props.title}
                        <div style={{textAlign: "right"}}>{iconStatus}</div>
                    </MDBCardTitle>
                </MDBCardHeader>
                <MDBCardBody>
                    <MDBCardText>{this.props.description}</MDBCardText>
                    <MDBCardText>{this.props.status}</MDBCardText>
                    <MDBCardText><MDBIcon icon={"clock"}/> {this.props.dueDate}</MDBCardText>
                    <MDBCardText>{this.props.responsible.name}</MDBCardText>
                    <div style={{textAlign: "right"}}>
                        <Link to="/taskPlanner/updateTask" color={"blue"}>
                            <MDBIcon icon={"edit"}/>
                        </Link>
                    </div>
                </MDBCardBody>
            </MDBCard>
        );
    }
}