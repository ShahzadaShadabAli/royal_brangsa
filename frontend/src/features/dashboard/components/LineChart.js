import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import TitleCard from '../../../components/Cards/TitleCard';
import { useEffect, useState } from 'react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

function LineChart(){
  const [labels, setLabels] = useState([])
  const [daData, setData] = useState([])
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  useEffect(() => {
    const fetchMonthlyRevenue = async () => {
        try {
            const res = await fetch("/booking/revenue", {method: "GET"});
            const result = await res.json();
            console.log(result)
            setLabels(result.labels); // Set labels for the chart
            setData(result.data); // Set data for the chart
        } catch (error) {
            console.log(error);
        }
    };

    fetchMonthlyRevenue();
}, []);

  

  const data = {
    labels: labels,
  datasets: [
    {
      fill: true,
      label: 'Revenue',
      data: daData,
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};
  

    return(
      <TitleCard title={"Monthly Revenue (Rs.)"}>
          <Line data={data} options={options}/>
      </TitleCard>
    )
}


export default LineChart