import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from 'axios';
import Chart from "chart.js";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartRef: React.createRef(),
      lables: [],
      data: []
    }
    this.getInfo = this.getInfo.bind(this);
  }


  componentDidMount() {
    this.getInfo()

  }

  getInfo() {
    axios.get('https://api.coindesk.com/v1/bpi/historical/close.json?start=2013-01-01&end=2013-09-08')
      .then((res) => {
        let newData = [];
        let newLables = [];
        for (var key in res.data.bpi) {
          newData.push(res.data.bpi[key]);
          newLables.push(key);
        }
        this.setState({
          labels: newLables,
          data: newData
        })
      })
      .then(() => {
        const myChartRef = this.state.chartRef.current.getContext("2d");

        new Chart(myChartRef, {
          type: "line",
          data: {
            //Bring in data
            labels: this.state.labels,
            datasets: [
              {
                label: "Closing Prices",
                data: this.state.data,
              }
            ]
          },
          options: {
            //Customize chart options
          }
        });
        console.log(this.state.data);
      })
  }
  render() {
    return (
      <div>
        <canvas
          id="myChart"
          ref={this.state.chartRef}
        />
      </div>
    )
  }
}

export default App;