import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, ArcElement, Legend } from "chart.js";

ChartJS.register(Title, Tooltip, ArcElement, Legend);

const ChartComponent = ({ data, options }) => {
  return <Doughnut data={data} options={options} />;
};

export default ChartComponent;
