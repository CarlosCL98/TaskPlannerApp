import React from "react";
import {
    MDBCard,
    MDBCardBody,
    MDBCardHeader,
    MDBCardText,
    MDBCardTitle,
    MDBIcon
} from "mdbreact";
import {Redirect} from "react-router-dom";

export class Task extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            update: false
        }
        this.handleOnUpdate = this.handleOnUpdate.bind(this);
    }

    handleOnUpdate(e) {
        e.preventDefault();
        this.setState({update: true});
    }

    render() {
        const iconStatus = (
            this.props.status === "ready" ?
                <MDBIcon icon={"business-time"} style={{color: "red"}}/> : (
                    this.props.status === "in progress" ?
                        <MDBIcon icon={"tasks"} style={{color: "orange"}}/> :
                        <MDBIcon icon={"check-circle"} style={{color: "green"}}/>)
        );
        if (this.state.update) {
            return <Redirect to={{pathname: "/taskPlanner/updateTask"}}/>
        }
        return (
            <button className="cardTask" onClick={this.handleOnUpdate}>
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
                    </MDBCardBody>
                </MDBCard>
            </button>
        );
    }
}