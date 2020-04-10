import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {db} from '../firebase';

//Components
import InfoDisplay from '../components/InfoDisplay'; 

export class essentialServices extends Component {

    //fetching data from db
    state={
        applicationInfo: null
    } //initialising
    componentDidMount(){

        db.collection("applicationInfo")
        .where("status", "==", "Pending")
        .get()
        .then(function(querySnapshot) {
            var dataItems = [];
            querySnapshot.forEach(function(doc) {
                //filling in application info into array
                dataItems.push({
                    applicationId: doc.id,
                    names: doc.data().names,
                    gender: doc.data().gender,
                    dateOfBirth: doc.data().dateOfBirth,
                    idNumber: doc.data().idNumber,
                    passportNumber: doc.data().passportNumber,
                    physicalAddress: doc.data().physicalAddress,
                    postalAddress: doc.data().postalAddress,
                    phone: doc.data().phone,
                    currentLocation: doc.data().currentLocation,
                    destination: doc.data().destination,
                    reason: doc.data().reason,
                    startTime: doc.data().startTime,
                    startDate: doc.data().startDate,
                    endDate: doc.data().endDate,
                    endTime: doc.data().endTime,
                    usrId: doc.data().usrId,
                    status: doc.data().status 
                });
            });
            return dataItems; 
        })
        .then(dataItems=>{
            this.setState({
                applicationInfo: dataItems
            })

        })
        .catch(err=>console.log(err));

    };
          

    render() {
        //creating markup to hold data from the server
        let myApplicationsMarkup=this.state.applicationInfo?(
        this.state.applicationInfo.map((info) => <InfoDisplay key={info.applicationId} info={info}/>)
                //<appInfoDisplay info={applicationInfo}/>) //pass applInfo to component meant to display it
        ) : <p>Loading...</p> //shown when data has not been found
        
 
        return (
            <div>
            <Grid container className="container">
                <Grid item sm={8} xs={12}>
                    <div>
                        <Paper>
                            {myApplicationsMarkup} 
                        </Paper>
                    </div>
                </Grid>
            </Grid>     
            </div>
        )
    }
}

export default essentialServices;
