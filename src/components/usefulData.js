import React, { Component } from 'react';
import {Doughnut} from 'react-chartjs-2';
import {db} from '../firebase';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';


//console.log("essential: ", essential);
const styles={
    card:{
        /*display: 'flex',
        margin: '0px auto 20px auto',
        alignItems:'center',
		justifyContent:'center',*/
		margin: '0px auto 20px auto',
	}
};

export class userfulData extends Component {


	state = {
		esssential: null
	};


	constructor(props) {
		super(props);
	};

	componentDidMount(){
		db.collection('applicationInfo')
		.where('destination','==','Palapye').where('status','==','Approved').where('type','==','Essential Services')
		.get()
		.then(function(querySnapshot,essential){
			var size= 0;
			size=querySnapshot.size;
			console.log('size: ', size);
			return size;
		})     
		.then(size=>{
			this.setState({essential: size});
		});
	};

	
    render() {


		const classes=this.props.classes;

		//for palapye
		const data = {
			labels: [
				'Essential Services',
				'Transport of Goods',
				'Special Permits'
			],
			datasets: [{
				data: [300, 50, 100],
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

		//for Botswana
		const dataBots = {
			labels: [
				'Essential Services',
				'Transport of Goods',
				'Special Permits'
			],
			datasets: [{
				data: [440, 300, 70],
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
						<Paper>
							<Typography variant='button' color='primary'><h3>Palapye Approved Permit Types</h3></Typography>
							<Doughnut data={data} />
						</Paper>
					</Card>

					<Card className={classes.card} varient="outlined" raised={true}>
						<Paper>
							<Typography variant='button' color='primary'><h3>Botswana Approved Permit Types</h3></Typography>
							<Doughnut data={dataBots} />
						</Paper>
					</Card>
				</div>
                
        );
    }
}

export default withStyles(styles)(userfulData);

