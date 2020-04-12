import React, { Component } from 'react';
import {Doughnut} from 'react-chartjs-2';
import {db} from '../firebase';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';





//console.log("essential: ", essential);


export class test extends Component {


	state = {
		esssential: null
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

		console.log("essential: ", this.state.essential);
	};

	
	
	//console.log("essential: ", this.state.essential);
	
    render() {

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
		
		//console.log("inner essential: ", {this.state.esssential});

        return (
				<div>
					<h2>Palapye Approved Permit Types</h2>
					<Doughnut data={data} />

					<h2>Palapye Approved Permit Types</h2>
					<Doughnut data={data} />
				</div>
                
        );
    }
}

export default test;

