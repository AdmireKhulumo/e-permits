import React, { Component } from 'react';
import {Doughnut} from 'react-chartjs-2';
import {db} from '../firebase';
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
		dataBw:[],
		totalBw: null,
	};


	constructor(props) {
		super(props);
	};
	

	componentDidMount(){
		//var essential,transport,special;
		db.collection('permits')
		.where('status','==','Approved').where('type','==','Essential Services')
		.get()
		.then((querySnapshot) =>{
			var size0 = querySnapshot.size;
			console.log(size0);
			console.log(querySnapshot);
			return size0;
		})     
		.then((size0)=>{
			this.setState({essential: size0});
		});

		db.collection('permits')
		.where('status','==','Approved').where('type','==','Transport Of Essential Goods')
		.get()
		.then((querySnapshot) =>{
			var size1 = querySnapshot.size;
			console.log(size1);
			console.log(querySnapshot);
			return size1;
		})
		.then((size1)=>{
			this.setState({transport: size1});
		});
				
		db.collection('permits')
		.where('status','==','Approved').where('type','==','Special Permit')
		.get()
		.then((querySnapshot) =>{
				var size2=querySnapshot.size;
				console.log(size2);
				console.log(querySnapshot);
				return size2;
		})
		.then((size2)=>{
			this.setState({special:size2});
			this.setState({dataBw: [this.state.essential, this.state.transport, this.state.special]});
			this.setState({totalBw: (this.state.essential + this.state.transport + this.state.special)});
			console.log(this.state.esssential);
		});

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
				data: [250,86,33],
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
		const data = {
			labels: [
				'Essential Services',
				'Transport of Goods',
				'Special Permits'
			],
			datasets: [{
				data: [10,4,2],
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
								<TableCell align="right">250</TableCell>
							</TableRow>

							<TableRow hover='true' >
								<TableCell align="left">
									<Typography variant="overline">Transport of Goods</Typography>
								</TableCell>
								<TableCell align="right">86</TableCell>
							</TableRow>

							<TableRow hover='true' >
								<TableCell align="left">
										<Typography variant="overline">Special Permits</Typography>
								</TableCell>
								<TableCell align="right">33</TableCell>
							</TableRow>

							<TableRow hover='true' >
								<TableCell align="left">
										<Typography variant="overline"><strong>Total</strong></Typography>
								</TableCell>
								<TableCell align="right"><strong>369</strong></TableCell>
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
				<Typography variant='h5' color='primary'><u>Palapye Active Permit Types</u></Typography>
				<Grid container spacing={1}>

					<Grid item xs={8}>
						<Doughnut data={data} />
					</Grid>

					<Grid item xs={4} className={classes.table}>
						<Table size='medium' className={classes.table}>
							<TableBody>

								<TableRow hover='true' padding="10px">
									<TableCell align="left">
										<Typography variant="overline">Essential Services</Typography>
									</TableCell>
									<TableCell align="right">76</TableCell>
								</TableRow>

								<TableRow hover='true' >
									<TableCell align="left">
										<Typography variant="overline">Transport of Goods</Typography>
									</TableCell>
									<TableCell align="right">50</TableCell>
								</TableRow>

								<TableRow hover='true' >
									<TableCell align="left">
										 <Typography variant="overline">Special Permits</Typography>
									</TableCell>
									<TableCell align="right">10</TableCell>
								</TableRow>

								<TableRow hover='true' >
									<TableCell align="left">
										 <Typography variant="overline"><strong>Total</strong></Typography>
									</TableCell>
									<TableCell align="right"><strong>108</strong></TableCell>
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

