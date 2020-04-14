import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import {MuiThemeProvider} from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import jwtDecode from 'jwt-decode';
import { withRouter } from "react-router-dom";
import { AuthProvider } from "./Auth";
import PrivateRoute from "./PrivateRoute";

//Components
import Navbar from './components/navbar'

//Pages
import login from './pages/login'
import verifyApplications from './pages/verifyApplications'
import { render } from '@testing-library/react';
import AuthRoute from './AuthRouteNims';
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

//Nims
/*let authenticated;
const token = localStorage.FBIdToken;
if(token){
  const decodeToken = jwtDecode(token);
  if(decodeToken.exp * 1000< Date.now()){
    window.location.href='/login'
    authenticated=false;
  }else{
    authenticated=true;
  }
}*/




  //Nims
 /* constructor()
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
  }*/
const App =()=>{
    return (
      <MuiThemeProvider theme={theme}>
          <div className="App">

         <AuthProvider>
          <Router>
            <Navbar/>
            <div className="container">
              {/* <Switch>
                <Route exact path="/" render={props =>(
                  <verifyApplications{...props} loggedInstatus={this.state.loggedInstatus}/>
                )}/> */}
                <PrivateRoute exact path="/" component={verifyApplications}/>
                <PrivateRoute exact path="/verifyApplications/" component={verifyApplications}/>
                <Route exact path="/login" component={login}/>
              
              {/*</Switch>*/}
            </div>
          </Router>
        </AuthProvider>
        </div>
        </MuiThemeProvider>
    );
  };

export default App;
