import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import {Link, useHistory} from 'react-router-dom';
import {db, firebaseApp} from "../firebase";
import { withRouter } from "react-router-dom";



//MUI stuff
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';


const styles={
    form:{
        textAlign: 'center'
    },
    image:{
        margin: '20px auto 20px auto'
    },
    pageTitle:{
        margin: '15px auto 15px auto'
    },
    textField:{
        margin:'15px auto 15px auto'
    },
    button:
    {
        marginTop: 20,
        position: 'reletive',
        margin:15
    },
    customError:{
        color:'red',
        fontSize:'0.8rem',
        marginTop: '10'
    },
    progress:{
        position: 'absolute'
    }
};


export class login extends Component {

    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.state={
            email:'',
            password: '',
            
        }
    }

    handleSubmit=(event)=>{
        event.preventDefault();
        this.setState({
            loading:true
        });
        const userData={
            email:this.state.email,
            password:this.state.password
        }
        firebaseApp.auth().signInWithEmailAndPassword(userData.email,userData.password).then((u)=>{
            console.log(u);
            if(u.data.status === "signeIn")
            {
                this.props.handleSuccessfulAuth(u.data);
            }
            
        }).catch((err)=>{
            console.log(err)
        })
        
        
    }

    handleChange=(event)=>{
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {

        const{classes}=this.props;
        const{errors,loading}=this.state;

        return (
            <Grid container className={classes.form}>
                <Grid item sm/>
                <Grid item sm>
                    <Typography 
                    variant='h2' 
                    className={classes.pageTitle}
                    disabled={loading}>
                        Login
                        
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField 
                        id="email" 
                        name="email" 
                        type="email" 
                        label="Email" 
                        className={classes.textField}
                        //helperText={errors.email}
                        //error={errors.email ? true : false}
                        value={this.state.email} 
                        onChange={this.handleChange} 
                        fullWidth/>

                        <TextField 
                        id="password" 
                        name="password" 
                        type="password" 
                        label="Password" 
                        className={classes.textField}
                        //helperText={errors.password}
                        //error={errors.password ? true : false}
                        value={this.state.password} 
                        onChange={this.handleChange} 
                        fullWidth/>

                        {/*{errors.general && (
                            <Typography 
                            variant="body2"
                            className={classes.customError}>
                                {errors.general}
                            </Typography>
                        )}*/}

                        <Button 
                        type="submit" 
                        variant="contained" 
                        color="primary" 
                        className={classes.button}>
                            Login
                            {
                            loading &&(
                                <CircularProgress 
                                size={30}
                                className={classes.progress}/>
                            )
                        }
                        </Button>
                        <br></br>

                        {/*<small>
                            If you don have an account 
                            <br></br>
                            <Link to="/signup">
                                Register Here
                            </Link>

                        </small>*/}
                    </form>
                </Grid>
                <Grid item sm/>
            </Grid>
        );
    }
}

login.propTypes ={
    classes: PropTypes.object.isRequired
}

export default withRouter(login)