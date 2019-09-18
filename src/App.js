import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from "react-router-dom";
import {Home} from "./Home/Home";
import {Register} from "./Register/Register";
import {TaskPlanner} from "./TaskPlanner/TaskPlanner";
import {Profile} from "./Profile/Profile";
import {NewTask} from "./Task/NewTask";

class App extends React.Component {

    render() {
        return (
            <Router>
                <div>
                    <div>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/register" component={Register}/>
                        <Route exact path="/taskPlanner" component={TaskPlanner}/>
                        <Route exact path="/profile" component={Profile}/>
                        <Route exact path="/taskPlanner/newTask" component={NewTask}/>
                    </div>
                </div>
            </Router>

        );
    }
}

export default App;
