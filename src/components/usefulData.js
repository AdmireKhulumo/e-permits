import React, { Component } from 'react';
import {Doughnut} from 'react-chartjs-2';
import {db, firebaseApp} from '../firebase';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


//console.log("essential: ", essential);
const styles={
    card:{
        /*display: 'flex',
        margin: '0px auto 20px auto',
        alignItems:'center',
		justifyContent:'center',*/
		margin: '0px auto 20px auto',
	},
	content:{
		padding: 25,
		margin: 'auto auto auto auto',
	},
	table:{
		margin: 'auto 0px auto auto',
	}
};

export class userfulData extends Component {


	state = {
		esssential: null,
		special:null,
		transport: null,
		esssentialLoc: null,
		specialLoc:null,
		transportLoc: null,
		dataBw:[],
		totalBw: null,
		dataLocation: [],
		totalLocation:[],
		authLocation: '',
	};


	constructor(props) {
		super(props);
	};
	

	componentDidMount(){
		
		//count permits in bw
		db.collection('permits')
		.where('status','==','Approved').where('type','==','Essential Services')
		.get()
		.then((querySnapshot) =>{
			var size0 = querySnapshot.size;
			return size0;
		})     
		.then((size0)=>{
			this.setState({essential: size0});
		})
		.catch(err=>console.log(err));

		db.collection('permits')
		.where('status','==','Approved').where('type','==','Transport of Essential Goods')
		.get()
		.then((querySnapshot) =>{
			var size1 = querySnapshot.size;
			return size1;
		})
		.then((size1)=>{
			this.setState({transport: size1});
		})
		.catch(err=>console.log(err));;
				
		db.collection('permits')
		.where('status','==','Approved').where('type','==','Special Permit')
		.get()
		.then((querySnapshot) =>{
				var size2=querySnapshot.size;
				return size2;
		})
		.then((size2)=>{
			this.setState({special:size2});
			this.setState({dataBw: [this.state.essential, this.state.transport, this.state.special]});
			this.setState({totalBw: (this.state.essential + this.state.transport + this.state.special)});
		})
		.catch(err=>console.log(err));;


		//Getting Logged in user's data and counting permits in their location
		var verifierEmail = firebaseApp.auth().currentUser.email
		console.log(verifierEmail);
		db.collection("verifiers").doc(`${verifierEmail}`)
			.get()
			.then((doc)=>{
				var authLocation = doc.data().authLocation;
				console.log(authLocation);
				return authLocation;
			})
			.then(authLocation=>{	
				this.setState({authLocation : authLocation});
				db.collection('permits')
				.where('status','==','Approved').where('type','==','Essential Services').where('destination','==',`${this.state.authLocation}`)
				.get()
				.then((querySnapshot) =>{
					var size0 = querySnapshot.size;
					console.log(size0);
					return size0;
				})     
				.then((size0)=>{
					this.setState({essentialLoc: size0});
				})
				.catch(err=>console.log(err));

				db.collection('permits')
				.where('status','==','Approved').where('type','==','Transport of Essential Goods').where('destination','==',`${this.state.authLocation}`)
				.get()
				.then((querySnapshot) =>{
					var size1 = querySnapshot.size;
					console.log(size1);
					return size1;
				})
				.then((size1)=>{
					this.setState({transportLoc: size1});
				})
				.catch(err=>console.log(err));;
						
				db.collection('permits')
				.where('status','==','Approved').where('type','==','Special Permit').where('destination','==',`${this.state.authLocation}`)
				.get()
				.then((querySnapshot) =>{
						var size2=querySnapshot.size;
						console.log(size2);
						return size2;
				})
				.then((size2)=>{
					this.setState({specialLoc:size2});
					console.log(this.state.essentialLoc);
					console.log(this.state.transportLoc);
					console.log(this.state.specialLoc);
					this.setState({dataLocation: [this.state.essentialLoc, this.state.transportLoc, this.state.specialLoc]});
					this.setState({totalLocation: (this.state.essentialLoc + this.state.transportLoc + this.state.specialLoc)});
				})
				.catch(err=>console.log(err));;
			})
			.catch(err=>console.log(err));
	};
		
	

	
	
    render(props) {


		const classes=this.props.classes;

		//for Botswana
		const dataBw = {
			labels: [
				'Essential Services',
				'Transport of Goods',
				'Special Permits'
			],
			datasets: [{
				data: this.state.dataBw,
				backgroundColor: [
				'#FF6384',
				'#36A2EB',
				'#FFCE56'
				],
				hoverBackgroundColor: [
				'#FF6384',
				'#36A2EB',
				'#FFCE56'
				],
				weight: 20,
				hoverBorderWidth: 10,
				hoverBorderColor: '#ffffff'
			}]
		};

		//for palapye
		const dataLocation = {
			labels: [
				'Essential Services',
				'Transport of Goods',
				'Special Permits'
			],
			datasets: [{
				data: this.state.dataLocation,
				backgroundColor: [
				'#FF6384',
				'#36A2EB',
				'#FFCE56'
				],
				hoverBackgroundColor: [
				'#FF6384',
				'#36A2EB',
				'#FFCE56'
				],
				weight: 20,
				hoverBorderWidth: 10,
				hoverBorderColor: '#ffffff'
			}]
		};

        return (
			<div>
			<Card className={classes.card} varient="outlined" raised={true}>
				<Typography variant='h5' color='primary'><u>Botswana Active Permit Types</u></Typography>
				<Grid container spacing={1}>
					<Grid item xs={4} className={classes.table}>
						<Table size='medium' className={classes.table}>
						<TableBody>

							<TableRow hover='true' padding="10px">
								<TableCell align="left">
									<Typography variant="overline">Essential Services</Typography>
								</TableCell>
								<TableCell align="right">{this.state.dataBw[0]}</TableCell>
							</TableRow>

							<TableRow hover='true' >
								<TableCell align="left">
									<Typography variant="overline">Transport of Goods</Typography>
								</TableCell>
								<TableCell align="right">{this.state.dataBw[1]}</TableCell>
							</TableRow>

							<TableRow hover='true' >
								<TableCell align="left">
										<Typography variant="overline">Special Permits</Typography>
								</TableCell>
								<TableCell align="right">{this.state.dataBw[2]}</TableCell>
							</TableRow>

							<TableRow hover='true' >
								<TableCell align="left">
										<Typography variant="overline"><strong>Total</strong></Typography>
								</TableCell>
								<TableCell align="right"><strong>{this.state.totalBw}</strong></TableCell>
							</TableRow>
						</TableBody>
						</Table>
						
					</Grid>
					<Grid item xs={8}>
						<Doughnut data={dataBw} />
					</Grid>
				</Grid>
			</Card>

			<Card className={classes.card} varient="outlined" raised={true}>
				<Typography variant='h5' color='primary'><u>{this.state.authLocation} Active Permit Types</u></Typography>
				<Grid container spacing={1}>

					<Grid item xs={8}>
						<Doughnut data={dataLocation} />
					</Grid>

					<Grid item xs={4} className={classes.table}>
						<Table size='medium' className={classes.table}>
							<TableBody>

								<TableRow hover='true' padding="10px">
									<TableCell align="left">
										<Typography variant="overline">Essential Services</Typography>
									</TableCell>
									<TableCell align="right">{this.state.dataLocation[0]}</TableCell>
								</TableRow>

								<TableRow hover='true' >
									<TableCell align="left">
										<Typography variant="overline">Transport of Goods</Typography>
									</TableCell>
									<TableCell align="right">{this.state.dataLocation[1]}</TableCell>
								</TableRow>

								<TableRow hover='true' >
									<TableCell align="left">
										 <Typography variant="overline">Special Permits</Typography>
									</TableCell>
									<TableCell align="right">{this.state.dataLocation[2]}</TableCell>
								</TableRow>

								<TableRow hover='true' >
									<TableCell align="left">
										 <Typography variant="overline"><strong>Total</strong></Typography>
									</TableCell>
									<TableCell align="right"><strong>{this.state.totalLocation}</strong></TableCell>
								</TableRow>

							</TableBody>
						</Table>
					</Grid>

				</Grid>
			</Card>
			</div>
               
        );
    }
}

export default withStyles(styles)(userfulData);

