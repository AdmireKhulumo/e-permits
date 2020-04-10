
import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import {MuiThemeProvider} from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import jwtDecode from 'jwt-decode';

//Components
import Navbar from './components/navbar'

//Pages
import login from './pages/login'
import signup from './pages/signup'
import verifyApplications from './pages/verifyApplications'
import { render } from '@testing-library/react';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#00e5ff',
      light:'#33eaff',
      dark:'#00a0b2',
      contrastText:'#ffff'
    },
    secondary: {
      main: '#FF2868',
      light:'#33eaff',
      dark:'#00a0b2',
      contrastText:'#ffff' 
    }
  },
  typography: {
    useNextVariants:true
  }  

});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
    <div className="App">
    <Router>
      <Navbar/>
        <div className="container">
          <Switch>
            <Route exact path="/" component={verifyApplications}/>
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



export default App;