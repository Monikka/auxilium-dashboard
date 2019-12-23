import React from "react";
import { Line } from "react-chartjs-2";

export default class LineGraph extends React.Component {
  
  render() {
    console.log(this.props);
    var chartData = {
      labels: this.props.labels,
      datasets: [
        {
          label: "Message Count",
          fill: false,
          lineTension: 0.2,
          backgroundColor: "#264160",
          borderColor: "#264160",
          pointBorderColor: "#EBCC60",
          pointBackgroundColor: "#EBCC60",
          pointHoverBackgroundColor: "#EBCC60",
          pointHoverBorderColor: "#EBCC60",
          pointHoverBorderWidth: 2,
          pointRadius: 2,
          pointHitRadius: 10,
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          data: this.props.data
        }
      ]
    };
    return (
      <div>
        <Line data={chartData} />
      </div>
    );
  }
}
