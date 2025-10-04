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
    <>
    {/* <div className="App">
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

      Chart.js pie chart for CPU usage
      <Pie data={chartData} />
    </div> */}

    <div className="bg-gray-100 min-h-screen p-8">
      {/* Header */}
      <header className="text-center bg-blue-600 text-white py-4 rounded-md mb-8">
        <h1 className="text-2xl font-bold">System Check Dashboard</h1>
      </header>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-4">
          {/* Chart Container */}
          <div className="bg-white shadow-md p-4 rounded-md">
            <h2 className="text-lg font-semibold mb-2">Pie Chart</h2>
            <div className="h-48 bg-gray-200 flex items-center justify-center">
            <Pie data={chartData} />
            </div>
          </div>

          {/* Bullet Points */}
          <div className="bg-white shadow-md p-4 rounded-md">
            <h3 className="text-lg font-semibold mb-2">Active Processes</h3>
            <ul className="list-disc pl-5">
            {data.getProcesses.map((process, index) => (
          <li key={index}>
            {process.name}: CPU {process.cpu}% - Memory {process.memVsz}%
          </li>
        ))}
            </ul>
          </div>
        </div>

        {/* Right Column */}
        <div className="bg-white shadow-md p-4 rounded-md">
          <h2 className="text-lg font-semibold mb-2">Quiz Panel</h2>
          <p>Welcome To LinuxQuizzer!</p>
        </div>
      </div>
    </div>

</>
  );
}

export default App;