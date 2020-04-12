import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles'; //import higher order styles component
import {db} from '../firebase';
import { alert } from 'react-alert';
import Snackbar from '@material-ui/core/Snackbar';


//MUI imports
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Alert from '@material-ui/lab/Alert';




//setting style using jsx and higher order components
const styles={
    card:{
        display: 'flex',
        margin: 'auto auto 40px auto',
        alignItems:'center',
        justifyContent:'center'
    },
    image:{
        minwidth:200,
        
    },
    content:{
        padding:25
    },
    centerText:{
        textAlign:'center'
    },
    denyButton:{
        color:'#ffffff',
        backgroundColor:'#ff1919'
    },
    approveButton:{
        color:'#ffffff',
        backgroundColor:'#63FF00'
    },


};


export class InfoDisplay extends Component {
    
    state= {
        openDeny: false,
        setopenApprove: false,
        openDeny: false,
        setopenApprove: false,
        openSnack: false,
        setOpenSnack: false,
        moreDetails: false,
        setMoreDetails: false
    };

   //for buttons
    constructor(props) {
        super(props);
        this.approve = this.approve.bind(this);
        this.deny = this.deny.bind(this);
        
    };
    
    approve(permitId) {
        
        this.handleCloseApprove();
        //this.setState({openSnack:true});
        //this.handleClickSnack();
        var docRef=db.collection("permits").doc(`${permitId}`);
        return docRef.update({
            status: "Approved"
        })
        .then(function(){
            console.log("Approve Successfully Updated");
            window.location.reload();
        })
        .catch(function(error){
            console.error("Error updating document: ", error);
        });
  
        //alert("Application APPROVED");  
    };
    
    deny(permitId) {

        this.handleCloseDeny();
        //this.setState({openSnack:true});
        //this.handleClickSnack();
  
        var docRef=db.collection("permits").doc(`${permitId}`);
        return docRef.update({
            status: "Denied"
        })
        .then(function(){
            console.log("Deny Successfully Updated");
            window.location.reload();
        })
        .catch(function(error){
            console.error("Error updating document: ", error);
        });

    };

    handleClickOpenDeny(){
        this.setState({openDeny:true});
    };
    
    handleCloseDeny(){
        this.setState({openDeny:false});
    };

    handleClickOpenApprove() {
        this.setState({openApprove:true});
    };
    
    handleCloseApprove(){
        this.setState({openApprove:false});
    };

    handleClickSnack(){
        this.setState({openSnack:true});
    };

    handleCloseSnack = (event, reason)=>{
        if (reason === 'clickaway') {
          return;
        }
        this.setState({openSnack:false});
    };

    //for showing more details
    handleChange(){
        this.setState({setChecked: true});
    };


    render() {
        const {classes, info:{fname,sname,gender,permitId,phone,dateOfBirth,identificationNum,nationality,physicalAddress,email,organisation,contactPerson,designation,organisationPhone,location,destination,reason,startDate,startTime,endDate,endTime,status,applyDate, type}} 
            = this.props; //same as const classes = this.props.classes;

        const {styled} = this.props;
                
        return (
            <Card className={classes.card} varient="outlined" raised="true">
                
                <CardContent className={classes.content} varient="outlined">
                    <Typography variant="h4" color="primary">{sname}: {fname}</Typography>
                    
                    <div>
                        <Typography variant="caption">Application ID: <strong>{permitId}</strong></Typography>
                        <br/>
                        <Typography variant="overline">Application Status: <strong>{status}</strong></Typography>
                        <br/>
                        <Typography variant="overline">Permit Type: <strong>{type}</strong></Typography>
                        </div>
                    <p></p>
                    <Card className={classes.card} varient="outlined" raised="true">
                        <CardContent className={classes.content}>
                            <Typography variant="button"><strong><u>Personal Details:</u></strong></Typography>
                            <p></p>
                            <Typography variant="button">identificationNum: {identificationNum}</Typography>
                            <br/>
                            <Typography variant="button">Gender: {gender}</Typography>
                            <br/>
                            <Typography variant="button">Date Of Birth: {dateOfBirth}</Typography>
                            <br/>
                            <Typography variant="button">Nationality: {nationality}</Typography>
                            <br/>
                            <Typography variant="button">Phone Number: {phone}</Typography>
                            <br/>
                            <Typography variant="button">Email: {email}</Typography>
                            <br/>
                            <Typography variant="button">Physical Address: {physicalAddress}</Typography>
                        </CardContent>
                    </Card>
        
                    <Card className={classes.card} varient="outlined" raised="true">
                        <CardContent className={classes.content}>
                            <Typography variant="button"><strong><u>Travel Details:</u></strong></Typography>
                            <p></p>
                            <Typography variant="button">Organisation: {organisation}</Typography>
                            <br/>
                            <Typography variant="button">Contact Person: {contactPerson}</Typography>
                            <br/>
                            <Typography variant="button">Designation: {designation}</Typography>
                            <br/>
                            <Typography variant="button">Mobile Numbers: {organisationPhone}</Typography>
                            <p></p>
                            <Typography variant="button">Depature: {location}</Typography>
                            <br/>
                            <Typography variant="button">Destination: {destination}</Typography>
                            <br/>
                            <Typography variant="button">From: {startDate}, {startTime} </Typography>
                            <br/>
                            <Typography variant="button">To: {endDate} , {endTime} hrs </Typography>
                            <br/>
                            <Typography variant="button">Reasons: {reason}</Typography>
                        </CardContent>
                    </Card>

                    <div>
                    <h4>ACTION: </h4>
                    <Grid container spacing={3} className="container">
                        <Grid item >
                            <Button
                                id="APPROVE"
                                variant="contained"
                                size="large"
                                className={classes.approveButton}
                                startIcon={<CheckIcon />}
                                onClick={()=>this.handleClickOpenApprove()}
                            >
                                APPROVE
                            </Button>
                            <Dialog
                                open={this.state.openApprove}
                                onClose={()=>this.handleCloseApprove()}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">{"Please Confirm Your Action"}</DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                         Are you sure you want to <h3><strong>APPROVE</strong></h3> application for <h4><strong>{sname}: {fname}</strong></h4>?
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={()=>this.handleCloseApprove()} color="primary">
                                        Cancel
                                    </Button>
                                <Button onClick={()=>this.approve(permitId)} color="primary" autoFocus>
                                        Approve
                                </Button>
                                </DialogActions>
                            </Dialog>
                        </Grid>
                        <Grid item >
                            <Button
                                id="DENY"
                                variant="contained"
                                size="large"
                                className={classes.denyButton}
                                startIcon={<CloseIcon />}
                                onClick={()=>this.handleClickOpenDeny()}
                            >
                                DENY
                            </Button>
                            <Dialog
                                open={this.state.openDeny}
                                onClose={()=>this.handleCloseDeny()}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">{"Please Confirm Your Action"}</DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        Are you sure you want to <h3><strong>DENY</strong></h3> application for <h4><strong>{sname}: {fname}</strong></h4>?
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={()=>this.handleCloseDeny()} color="primary">
                                        Cancel
                                    </Button>
                                <Button onClick={()=>this.deny(permitId)} color="primary" autoFocus>
                                        Deny
                                </Button>
                                <div className={classes.root}>
                                <Snackbar open={this.state.openSnack} autoHideDuration={4000} onClose={()=>this.handleCloseSnack()}>
                                    <Alert onClose={()=>this.handleCloseSnack()} severity="success">Success</Alert>
                                </Snackbar>
                                </div>
                                </DialogActions>
                            </Dialog>
                        </Grid>
                    </Grid>
                </div>
            </CardContent>
    </Card>
        
    )
}
}

export default withStyles(styles)(InfoDisplay);
