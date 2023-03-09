import React, { FC } from "react";
import "./chart.css";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import {CategoryScale} from 'chart.js'; 
Chart.register(CategoryScale);

interface ChartProps {
  chartData: any;
}

const LineChart: FC<ChartProps> = ({ chartData }) => {
  console.log(chartData);

  return (
    <div className="chartContainer">
      <Line data={chartData} options={{}} />
    </div>
  );
};

export default LineChart;
