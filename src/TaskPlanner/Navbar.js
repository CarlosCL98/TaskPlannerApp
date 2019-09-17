import React from "react";
import "./Navbar.css";
import {
    MDBBtn,
    MDBContainer,
    MDBDropdown, MDBDropdownItem,
    MDBDropdownMenu,
    MDBDropdownToggle,
    MDBIcon,
    MDBNavbar,
    MDBRow
} from "mdbreact";
import {Drawer, List, ListItem, ListItemIcon, ListItemText, Divider} from "@material-ui/core";
import Avatar from "../imgs/avatar.png";
import {Link} from "react-router-dom";

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
        const profileBtn = (
            <Link to="/profile" style={{color: "black"}}><MDBIcon icon="user-edit"/></Link>
        );
        const logout = (
            <Link to="/" style={{color: "black"}}><MDBIcon icon="sign-out-alt"/> Logout</Link>
        );
        const sideMenu = (
            <div style={{width: 300}} role="presentation" onClick={this.handleToggle(false)}>
                <List>
                    <ListItem>
                        <img className="avatarNav" src={Avatar} alt="avatar"/>
                        <ListItemText primary={localStorage.getItem("username")}
                                      secondary={localStorage.getItem("email")}/>
                    </ListItem>
                    <ListItem>
                        <ListItemText primary={profileBtn} style={{textAlign: "right"}}/>
                    </ListItem>
                </List>
                <Divider/>
                <List style={{marginTop: "150%"}}>
                    <ListItem>
                        <ListItemText primary={logout} style={{textAlign: "right"}}/>
                    </ListItem>
                </List>
            </div>
        );
        return (
            <div>
                <MDBNavbar color={"blue"}>
                    <MDBBtn onClick={this.handleToggle(true)} color={"blue"}><MDBIcon icon="bars"/></MDBBtn>
                    <Drawer open={this.state.isOpen} onClose={this.handleToggle(false)}>
                        {sideMenu}
                    </Drawer>
                    <MDBDropdown style={{textAlign: "right"}}>
                        <MDBDropdownToggle color={"blue"}>
                            <MDBIcon icon="ellipsis-v"/>
                        </MDBDropdownToggle>
                        <MDBDropdownMenu basic>
                            <MDBDropdownItem><Link to="/filter">Filter</Link></MDBDropdownItem>
                        </MDBDropdownMenu>
                    </MDBDropdown>
                </MDBNavbar>
            </div>
        );
    }
}