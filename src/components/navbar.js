import React, { Component } from 'react'
import {Link} from 'react-router-dom/'

//MUI imports
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'


export class navbar extends Component {
    render() {
        return (
            <AppBar>
                <Toolbar className="nav-container">
                    <Button color="inherit" component={Link} to="/login">Login</Button>
                    <Button color="inherit" component={Link} to="/verifyApplications" >Verify Applications</Button>
                    <Button color="inherit" component={Link} to="/signout" >Sign Out</Button> 
                </Toolbar>
            </AppBar>
        )
    }
}

export default navbar

//NOTE
//Home button must go to applicant home page not apply Applicant