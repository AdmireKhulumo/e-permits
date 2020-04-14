import React from 'react';
import {Link} from 'react-router-dom/'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SignOutIcon from '@material-ui/icons/ExitToApp';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import HomeIcon from '@material-ui/icons/Home';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles} from '@material-ui/core/styles';
import {firebaseApp} from '../firebase';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}))(Tooltip);

function ElevationScroll(props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 0,
      target: window ? window() : undefined,
    });
  
    return React.cloneElement(children, {
      elevation: trigger ? 4 : 0,
    });
  }

export default function MenuAppBar(props) {
  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
    <React.Fragment>
      <CssBaseline />
      <ElevationScroll {...props}>
        <AppBar >
            <Toolbar>
              <LightTooltip title="HOME" arrow>
                <IconButton edge="start" component={Link} to="/verifyApplications" className={classes.menuButton} color="inherit" aria-label="home">
                    <HomeIcon/>
                </IconButton>
              </LightTooltip>

                

                <div style={{ 
                    float       : 'none', 
                    width       : '300px',
                    marginLeft  : 'auto',
                    marginRight : 'auto'
                }}>
                    <Typography variant="button" className={classes.title} href="./" >
                       <strong>Botswana Covid-19 E-Permit System</strong>
                    </Typography>
                </div>

                {/*<img src={'./logo'} alt='logo'></img>*/}

                {auth && (
                    <div>
                      <LightTooltip title="ACCOUNT" arrow>
                    <IconButton
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        //onClick={handleMenu}
                        color="inherit"
                        
                    >
                        <AccountCircle />
                    </IconButton>
                    </LightTooltip>
                    </div>
                )}
                
                <LightTooltip title="SIGN OUT" arrow>
                <IconButton
                   edge="start" 
                   className={classes.menuButton} 
                   color="inherit" 
                   aria-label="home"
                   onClick={()=>firebaseApp.auth().signOut()}
                   >
                  <SignOutIcon/>
                </IconButton>
                </LightTooltip>
            </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
      </React.Fragment>
    </div>
  
    );
}
