import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  PointElement,
  Tooltip,
  LinearScale,
  CategoryScale,
  Legend
);
const data = {
  labels: ["Yak", "Dus", "Sesh", "Chor", "Pay", "Jum", "Shan"],
  datasets: [
    {
      label: "Furnitures sold this week",
      data: [65, 59, 80, 81, 56, 55, 40],
      borderWidth: 4,
      backgroundColor: "red",
      hoverBackgroundColor: "black",
      pointStyle: "triangle",
      borderColor: "rgb(75, 192, 190)",
      tension: 0.5,
    },
  ],
};
const options = {};
function Home() {
  return <Line data={data} options={options}></Line>;
}

export default Home;
