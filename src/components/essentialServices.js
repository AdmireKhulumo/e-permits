import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {db} from '../firebase';

//Components
import InfoDisplay from '../components/InfoDisplay'; 


//var datas={fname:'',sname:'',type:'',location:''};

export class essentialServices extends Component {

    //fetching data from db
    state={
        applicationInfo: null,
    } //initialising

    

    componentDidMount(){


        var dataItems = [];
        var permitIdArray=[];
        db.collection("permits")
        .where("status", "==", "Pending")
        .where('type','==','Essential Services')
        .limit(5)
        .get()
        .then(function(querySnapshot) {
            
            querySnapshot.forEach(function(doc) {
                //for each document, get it's applicant's information
                var applicantId = doc.data().applicantId;
                var permitId=doc.id;
                permitIdArray.push(permitId);
                db.collection("applicants").doc(`${applicantId}`).get()
                .then(function(doc){
                    if (doc.exists) {

                        var docRef=db.collection("permits").doc(`${permitId}`);
                        return docRef.update({
                            fname: doc.data().fname,
                            sname: doc.data().sname,
                            gender: doc.data().gender,
                            omang: doc.data().omang,
                            nationality: doc.data().nationality,
                            dateOfBirth: doc.data().dateOfBirth,
                            physicalAddress: doc.data().physicalAddress,
                            email: doc.data().email,
                            phone: doc.data().phone,
                            applicantId: doc.id
                        });
                        
                        
                        /*dataItems.push({
                            fname: doc.data().fname,
                            sname: doc.data().sname,
                            gender: doc.data().gender,
                            omang: doc.data().omang,
                            nationality: doc.data().nationality,
                            dateOfBirth: doc.data().dateOfBirth,
                            physicalAddress: doc.data().physicalAddress,
                            email: doc.data().email,
                            phone: doc.data().phone,
                            applicantId: doc.id
                        });*/

                        //console.log(dataItems);
                        //window.datas.fname=doc.data().fname;
                        //console.log(datas.fname);
                        //window.collectionfname=doc.data().fname;
                        //console.log(window.fname);
                        //return datas;
                        //return dataItems;
                        
                    } else {
                        console.log("No such document!");
                    }
                    console.log(permitId);
                    return permitId;
                })
                .catch(function(error) {
                    console.log("Error getting document:", error);
                });

                //console.log(datas.fname);
                
                //getting permit details
                /*dataItems.push({
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
                    fname: doc.data().fname,
                    sname:doc.data().sname
                }); */ 
                //getData(permitId);             
            })
            //console.log(dataItems);
            //return dataItems;
        })
        /*.then(dataItems=>{
            this.setState({
                applicationInfo: dataItems
            });
            console.log(this.state.applicationInfo);
        })*/
        .catch(err=>console.log(err));

        console.log(permitIdArray);
        permitIdArray.map(permitId2=>{
            console.log("here");
            console.log(permitId2);
            var dataItems = [];
            db.collection("permits").doc(`${permitId2}`)
            .get()
            .then(function(doc) {
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
                        fname: doc.data().fname,
                        sname: doc.data().sname
                    });

                console.log(dataItems);
                return dataItems;
            })
            .then(dataItems=>{
                this.setState({
                    applicationInfo: dataItems
                })
            })
            .catch(err=>console.log(err));
        
        });

        console.log(permitIdArray);
        function getData(permitId){
            //permitIdArray.forEach(permitId=>{
                console.log("here");
                console.log(permitId);
                var dataItems = [];
                db.collection("permits").doc(`${permitId}`)
                .get()
                .then(function(doc) {
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
                            fname: doc.data().fname,
                            sname: doc.data().sname
                        });
    
                    console.log(dataItems);
                    return dataItems;
                })
                .then(dataItems=>{
                    this.setState({
                        applicationInfo: dataItems
                    })
                })
                .catch(err=>console.log(err));
            
        };
        
        //getData();
        console.log(this.state.applicationInfo);


    };
          

    render() {

        //creating markup to hold data from the server
        let completePermitMarkup=this.state.applicationInfo?(
        this.state.applicationInfo.map((info) => <InfoDisplay key={info.permitId} info={info}/>)
                //<appInfoDisplay info={applicationInfo}/>) //pass applInfo to component meant to display it
        ) : <p>Loading...</p> //shown when data has not been found
        
 
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
