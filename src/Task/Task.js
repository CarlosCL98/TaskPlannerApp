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
            task: {
                id: this.props.id,
                title: this.props.title,
                description: this.props.description,
                status: this.props.status,
                dueDate: this.props.dueDate,
                responsible: {
                    name: this.props.responsible.name,
                    email: this.props.responsible.email
                }
            },
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
            this.props.status === "READY" ?
                <MDBIcon icon={"business-time"} style={{color: "red"}}/> : (
                    this.props.status === "IN_PROGRESS" ?
                        <MDBIcon icon={"tasks"} style={{color: "orange"}}/> :
                        <MDBIcon icon={"check-circle"} style={{color: "green"}}/>)
        );
        if (this.state.update) {
            return <Redirect to={{pathname: "/taskPlanner/updateTask", state: this.state.task.id}}/>
        }
        return (
            <button className="cardTask" onClick={this.handleOnUpdate}>
                <MDBCard>
                    <MDBCardHeader>
                        <MDBCardTitle>{this.state.task.title}
                            <div style={{textAlign: "right"}}>{iconStatus}</div>
                        </MDBCardTitle>
                    </MDBCardHeader>
                    <MDBCardBody>
                        <MDBCardText>{this.state.task.description}</MDBCardText>
                        <MDBCardText>{this.state.task.status}</MDBCardText>
                        <MDBCardText><MDBIcon icon={"clock"}/> {this.state.task.dueDate}</MDBCardText>
                        <MDBCardText>{this.state.task.responsible.name}</MDBCardText>
                    </MDBCardBody>
                </MDBCard>
            </button>
        );
    }
}