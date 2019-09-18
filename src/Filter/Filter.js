import React from 'react';
import {MDBContainer, MDBModal} from "mdbreact";

export class Filter extends React.Component {

    render() {
        return (
            <MDBContainer>
            <MDBModal isOpen={this.props.isOpen}>

            </MDBModal>
            </MDBContainer>
        );
    }
}
