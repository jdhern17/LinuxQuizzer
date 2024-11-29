import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const GET_SYSTEM_STATS = gql`
  query GetProcesses {
    getProcesses {
      pid
      parentPid
      name
      cpu
      memVsz
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(GET_SYSTEM_STATS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Prepare data for the chart
  const chartData = {
    labels: data.getProcesses.map((proc) => proc.name),
    datasets: [
      {
        label: 'CPU Usage (%)',
        data: data.getProcesses.map((proc) => proc.cpu),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="App">
      <h1>System Check Dashboard</h1>
      <p>CPU Usage: {data.getProcesses[0].cpu}%</p>
      <h2>Active Processes:</h2>
      <ul>
        {data.getProcesses.map((process, index) => (
          <li key={index}>
            {process.name}: CPU {process.cpu}% - Memory {process.memVsz}%
          </li>
        ))}
      </ul>

      {/* Chart.js pie chart for CPU usage */}
      <Pie data={chartData} />
    </div>
  );
}

export default App;