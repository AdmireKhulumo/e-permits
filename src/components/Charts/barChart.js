import {Pie,Bar,Line,Scatter} from 'react-chartjs-2';
import React, { useEffect, useState ,Component} from 'react';


class Chart extends Component{

    render(){

        const [chartData, setChartData]=useState({})

        const chart=()=>{
          setChartData({
            labels:['0000','0100','0200','0300','0400','0500','0600','0700','0800','0900','1000','1100',
            '1200','1300','1400','1500','1600','1700','1800','1900','2000','2100','2200','2300',],
            datasets:[{
              label:'Movement In the Station',
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
          })
        }
      
      
        useEffect(() => {
          chart()
        }, [])
        return(
            <div className="chart">
                <Line data={chartData} options={{
                    responsive: true,
                    scales: {
                      yAxes:[
                        {
                          ticks:{
                            autoSkip: true,
                            maxTicksLimit: 10,
                            beginAtZero: true
                          },
                          gridLines:{
                            display: false
                          }
                        }
                      ],
                      xAxes:[
                        {
                          gridLines:{
                            display: false
                          }
                        }
                      ]
                      
                    }
                  
                  }
                  }/>
            </div>
        )
    }
}

export default Chart;