import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {db} from '../firebase';

//Components
import InfoDisplay from '../components/InfoDisplay'; 


export class essentialServices extends Component {


    state={
        applicationInfo: null //state variable to store query results
    } 

    

    componentDidMount(){


        db.collection("permits")
        .where("status", "==", "Pending")
        .where('type','==','Essential Services')
        .limit(5)
        .get()
        .then(function(querySnapshot) {
            var dataItems=[];
            querySnapshot.forEach(function(doc) {

                //for each permit, get it's applicant's information
                var applicantId = doc.data().applicantId;
                db.collection("applicants").doc(`${applicantId}`).get()
                .then(function(doc){

                        dataItems.push({
                            fname: doc.data().fname,
                            sname: doc.data().sname,
                            gender: doc.data().gender,
                            identificationNum: doc.data().identificationNum,
                            nationality: doc.data().nationality,
                            dateOfBirth: doc.data().dateOfBirth,
                            physicalAddress: doc.data().physicalAddress,
                            email: doc.data().email,
                            phone: doc.data().phone,
                            applicantId: doc.id
                        });
                });
                console.log(dataItems);

                //Getting The Permit Info Too
                dataItems.push({
                    permitId: doc.id,
                    applicantId:doc.data().applicantId,
                    type: doc.data().type,
                    organisation: doc.data().organisation,
                    contactPerson: doc.data().contactPerson,
                    designation: doc.data().designation,
                    organisationPhone: doc.data().organisationPhone,
                    startDate: doc.data().startDate,
                    endDate: doc.data().endDate,
                    endTime: doc.data().endTime,
                    location: doc.data().location,
                    destination: doc.data().destination,
                    reason: doc.data().reason,
                    applyDate: doc.data().applyDate,
                    status: doc.data().status,
                });
            });
            console.log(dataItems);
            return dataItems;
        })
        .then(dataItems=>{
            this.setState({applicationInfo: dataItems});
        })
        .catch(err=>console.log(err));
    };
          

    render() {

        //Sending Data to Info Display component
        let completePermitMarkup=this.state.applicationInfo?(
        this.state.applicationInfo.map((info) => <InfoDisplay key={info.permitId} info={info}/>)
        ) : <p>Loading...</p> 
 
        return (
            <div>
            <Grid container className="container">
                <Grid item sm={8} xs={12}>
                    <div>
                        <Paper>
                            {completePermitMarkup} 
                        </Paper>
                    </div>
                </Grid>
            </Grid>     
            </div>
        )
    }
}

export default essentialServices;
