import React from "react";
import "./Navbar.css";
import {
    MDBBtn,
    MDBDropdown, MDBDropdownItem,
    MDBDropdownMenu,
    MDBDropdownToggle,
    MDBIcon, MDBModal, MDBModalBody, MDBModalFooter, MDBModalHeader,
    MDBNavbar
} from "mdbreact";
import {Drawer, List, ListItem, ListItemText, Divider} from "@material-ui/core";
import Avatar from "../imgs/avatar.png";
import {Link} from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";

export class Navbar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dueDate: "",
            responsible: "",
            status: "",
            isOpen: false,
            modal: false
        };
        this.handleToggle = this.handleToggle.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleToggleModal = this.handleToggleModal.bind(this);
        this.handleDueDateFilter = this.handleDueDateFilter.bind(this);
        this.handleResponsibleFilter = this.handleResponsibleFilter.bind(this);
        this.handleStatusFilter = this.handleStatusFilter.bind(this);
        this.handleClear = this.handleClear.bind(this);
    }

    handleToggle = (open) => (e) => {
        this.setState({
            isOpen: open
        });
    };

    handleLogout(e) {
        localStorage.clear();
    }

    handleToggleModal = (open) => (e) => {
        this.setState({
            modal: open
        });
    }

    handleDueDateFilter(e) {
        this.setState({dueDate: e.target.value});
    }

    handleResponsibleFilter(e) {
        this.setState({responsible: e.target.value});
    }

    handleStatusFilter(e) {
        this.setState({status: e.target.value});
    }

    handleClear(e) {
        this.setState({
            dueDate: "",
            responsible: "",
            status: ""
        });
    }

    render() {
        const profileBtn = (
            <Link to="/profile" style={{color: "black"}}><MDBIcon icon="user-edit"/></Link>
        );
        const logout = (
            <Link to="/" style={{color: "black"}} onClick={this.handleLogout}><MDBIcon
                icon="sign-out-alt"/> Logout</Link>
        );
        const sideMenu = (
            <div style={{width: 300}} role="presentation" onClick={this.handleToggle(false)}>
                <List>
                    <ListItem>
                        <img className="avatarNav" src={Avatar} alt="avatar"/>
                        <ListItemText primary={this.props.user.username}
                                      secondary={this.props.user.email}/>
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
        const responsibleFilter = (
            <Select style={{minWidth: "80%"}}
                    id="responsible"
                    value={this.state.responsible}
                    onChange={this.handleResponsibleFilter}
            >
                <MenuItem value={"c@m.com"}>Carlos Medina</MenuItem> /*GET USERS*/
            </Select>
        );
        return (
            <div>
                <MDBNavbar color={"blue"}>
                    <MDBBtn onClick={this.handleToggle(true)} color={"blue"}>
                        <MDBIcon icon="bars"/>
                    </MDBBtn>
                    <Drawer open={this.state.isOpen} onClose={this.handleToggle(false)}>
                        {sideMenu}
                    </Drawer>
                    <MDBDropdown style={{textAlign: "right"}}>
                        <MDBDropdownToggle color={"blue"}>
                            <MDBIcon icon="ellipsis-v"/>
                        </MDBDropdownToggle>
                        <MDBDropdownMenu basic>
                            <MDBDropdownItem>
                                <MDBBtn size={"sm"} color={"blue"}
                                        onClick={this.handleToggleModal(true)}>Filter</MDBBtn>
                            </MDBDropdownItem>
                        </MDBDropdownMenu>
                    </MDBDropdown>
                </MDBNavbar>
                <MDBModal color={"blue"} isOpen={this.state.modal} toggle={this.handleToggleModal(true)}>
                    <MDBModalHeader toggle={this.handleToggleModal(false)}>Task
                        Filters
                    </MDBModalHeader>
                    <MDBModalBody style={{textAlign: "center"}}>
                        <InputLabel htmlFor="dueDateFilter">Due Date</InputLabel>
                        <Select style={{minWidth: "80%"}}
                                id="dueDateFilter"
                                value={this.state.dueDate}
                                onChange={this.handleDueDateFilter}
                        >
                            <MenuItem value={new Date().toDateString()}>{new Date().toDateString()}</MenuItem>
                        </Select>
                        <InputLabel htmlFor="responsible">Responsible</InputLabel>
                        {responsibleFilter}
                        <InputLabel htmlFor="statusFilter">Status</InputLabel>
                        <Select style={{minWidth: "80%"}}
                                id="statusFilter"
                                value={this.state.status}
                                onChange={this.handleStatusFilter}
                        >
                            <MenuItem value={"READY"}>READY</MenuItem>
                            <MenuItem value={"IN_PROGRESS"}>IN_PROGRESS</MenuItem>
                            <MenuItem value={"COMPLETE"}>COMPLETE</MenuItem>
                        </Select>
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color={"blue"} size={"sm"}>Apply</MDBBtn>
                        <MDBBtn color={"blue"} size={"sm"} onClick={this.handleClear}>Clear All</MDBBtn>
                        <MDBBtn color={"blue"} size={"sm"} onClick={this.handleToggleModal(false)}>Close</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
            </div>
        );
    }
}