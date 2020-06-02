import React,{Component} from 'react';
import {Bar,Line,Pie} from 'react-chartjs-2';

class Chart extends Component{

    constructor(props) {
        super(props);
        this.state={
            data:{
                labels:['Monday','Tuesday','Wednesday','Thursday','Friday'],
                datasets:[{
                    label:'Highest Tempreature Recorded in the Station',
                    data: [55,70,20,50,34],
                    backgroundColor:[
                      'rgba(75,192,192,0.6)',
                      'rgba(50,32,87,0.6)',
                      'rgba(75,92,142,0.6)',
                      'rgba(75,3,0,0.6)',
                      'rgba(64,200,55,0.6)',
                    ],
                    borderWidth:4
                  }]
            }
        }
      }

    render(){
        return(
            <div className="chart">
                <Bar
                    data={this.state.data}
                    options={{
                         maintainAspectRatio: false }}
                    />
            </div>
        )
    }
}

export default Chart