import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {db,firebaseApp} from '../firebase';
import { requirePropFactory } from '@material-ui/core';

//Components
//import InfoDisplay from '../components/InfoDisplay';
const InfoDisplayPromise=import('../components/InfoDisplay');
const InfoDisplay=React.lazy(()=>(InfoDisplayPromise));


export class essentialServices extends Component {
    _isMounted=false;

    state={
        applicationInfo: null, //state variable to store query results
        isLoading: true,
        authOffice:'',
    } 

    componentDidMount(){
        this._isMounted=true;

        var verifierEmail = firebaseApp.auth().currentUser.email;
        console.log('verifierEmail below');
		console.log(verifierEmail);

        db.collection('verifiers').doc(`${verifierEmail}`).get()
            .then((doc)=>{
                var authOffice = doc.data().authOffice;
                console.log(authOffice);
                return authOffice;
            })
            .then(authOffice=>{
                this.setState({authOffice:authOffice});

                db.collection("permits")
                .where("status", "==", "Pending")
                .where('type','==','Essential Services')
                .where('requestedAuthOffice', '==',`${this.state.authOffice}` )
                .limit(10)
                .get()
                .then((querySnapshot) =>{
                    var applicant={};
                    var dataItems=[];
                    querySnapshot.forEach((doc)=> {
                        console.log(this.state.applicationInfo);
                        //for each permit, get it's applicant's information
                        var applicantId = doc.data().applicantId;
                        db.collection("applicants").doc(`${applicantId}`).get()
                        .then(function(doc){

                                applicant={
                                    fullname: doc.data().fullname,
                                    gender: doc.data().gender,
                                    identificationNum: doc.data().identificationNum,
                                    nationality: doc.data().nationality,
                                    dateOfBirth: doc.data().dateOfBirth,
                                    physicalAddress: doc.data().physicalAddress,
                                    email: doc.data().email,
                                    phone: doc.data().phone,
                                    applicantId: doc.id,
                                    location: doc.data().location
                                };
                                return applicant;
                        })
                        .then(applicant=>{
                            dataItems.push({
                                permitId: doc.id,
                                applicantId: doc.data().applicantId,
                                type: doc.data().type,
                                organisation: doc.data().organisation,
                                contactPerson: doc.data().contactPerson,
                                contactPersonDesignation: doc.data().contactPersonDesignation,
                                contactPersonNum: doc.data().contactPersonNum,
                                startDate: doc.data().startDate,
                                endDate: doc.data().endDate,
                                endTime: doc.data().endTime,
                                departureLocation: doc.data().departureLocation,
                                destination: doc.data().destination,
                                reason: doc.data().reason,
                                applyDate: doc.data().applyDate,
                                status: doc.data().status,
                                fullname: applicant.fullname,
                                gender: applicant.gender,
                                identificationNum: applicant.identificationNum,
                                nationality: applicant.nationality,
                                dateOfBirth: applicant.dateOfBirth,
                                physicalAddress: applicant.physicalAddress,
                                email: applicant.email,
                                phone: applicant.phone,
                                location: applicant.location
                            });
                            return dataItems;
                        })
                        .then(dataItems=>{
                            this.setState({applicationInfo: dataItems});
                            if (this._isMounted){
                                this.setState({isLoading: false})
                            };
                        })
                        .catch(err=>console.log(err));
                    });
                })
                .catch(err=>console.log(err));
            })
            .catch(err=>console.log(err));

        
    };

    componentWillMount(){
        this._isMounted = false;
    };
    

    render() {

        //Sending Data to Info Display component
        let completePermitMarkup=this.state.applicationInfo?(
            this.state.applicationInfo.map(
                (info) => <InfoDisplay key={info.permitId} info={info}/>)
            ) : <p>Loading...</p>

        return (
            <div>
            <Grid container className="container">
                <Grid item sm={10} xs={12}>
                    <React.Suspense fallback={<div>Loading......</div>}>
                        <div>
                            {completePermitMarkup} 
                         </div>
                    </React.Suspense>
                </Grid>
            </Grid>     
            </div>
        )
    }
}

export default essentialServices;
