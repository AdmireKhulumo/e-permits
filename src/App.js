import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import {MuiThemeProvider} from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import jwtDecode from 'jwt-decode';
import { withRouter } from "react-router-dom";

//Components
import Navbar from './components/navbar'

//Pages
import login from './pages/login'
import signup from './pages/signup'
import verifyApplications from './pages/verifyApplications'
import { render } from '@testing-library/react';
import AuthRoute from './AuthRoute';
import {db, firebaseApp} from './firebase';

const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#00e5ff',
        light:'#33eaff',
        dark:'#00a0b2',
        contrastText:'#ffff'
      },
      secondary: {
        main: '#00e5ff',
        light:'#33eaff',
        dark:'#00a0b2',
        contrastText:'#ffff' 
      }
    },
    typography: {
      useNextVariants:true
    }  
  
});

let authenticated;
const token = localStorage.FBIdToken;
if(token){
  const decodeToken = jwtDecode(token);
  if(decodeToken.exp * 1000< Date.now()){
    window.location.href='/login'
    authenticated=false;
  }else{
    authenticated=true;
  }
}

export class App extends Component {

  constructor()
  {
    super();
      this.state = {
      loggedInstatus: "NOT_LOGGED_IN",
      user:{}
    }
  }

  componentDidMount(){
    this.authListener()
  }

  authListener(){
    firebaseApp.auth().onAuthStateChanged((user)=>{
      if(user)
      {
        this.setState({user})
      }else{
        this.setState({user : null})
      }
    })
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
          <div className="App">

          <Router>
            <Navbar/>
            <div className="container">
              <Switch>
                <Route exact path="/" render={props =>(
                  <verifyApplications{...props} loggedInstatus={this.state.loggedInstatus}/>
                )}/>
                <Route exact path="/verifyApplications" component={verifyApplications}/>
                <Route exact path="/login" component={login}/>
                <Route exact path="/signup" component={signup}/>
              </Switch>
            </div>
          </Router>
        </div>
        </MuiThemeProvider>
    );
  }
}

export default App;
