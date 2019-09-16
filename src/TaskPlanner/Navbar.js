import React from "react";
import "./Navbar.css";
import {MDBBtn, MDBContainer, MDBIcon, MDBRow} from "mdbreact";
import {Drawer, List, ListItem, ListItemIcon, ListItemText, Divider} from "@material-ui/core";
import Avatar from "../imgs/avatar.png";

export class Navbar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
        this.handleToggle = this.handleToggle.bind(this);
    }

    handleToggle = (open) => (e) => {
        this.setState({
            isOpen: open
        });
    };

    render() {
        const sideMenu = (
            <div style={{width:300}} role="presentation" onClick={this.handleToggle(false)}>
                <List>
                    <ListItem>
                        <img className="avatarNav" src={Avatar} alt="avatar"/>
                        <ListItemText primary={localStorage.getItem("username")} secondary={localStorage.getItem("email")}/>
                    </ListItem>
                </List>
                <Divider/>
            </div>
        );
        return (
            <div>
                <MDBBtn onClick={this.handleToggle(true)}><MDBIcon icon="bars"/></MDBBtn>
                <Drawer open={this.state.isOpen} onClose={this.handleToggle(false)}>
                    {sideMenu}
                </Drawer>
            </div>
        );
    }
}