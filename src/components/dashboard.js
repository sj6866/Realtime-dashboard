import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import './Dashboard.css';  // Ensure this path is correct

// Register components with Chart.js
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend);

const Dashboard = () => {
  const [totalUsers, setTotalUsers] = useState(faker.datatype.number({ min: 0, max: 1000 }));
  const [activeUsers, setActiveUsers] = useState(faker.datatype.number({ min: 0, max: 500 }));
  const [totalSales, setTotalSales] = useState(faker.datatype.number({ min: 0, max: 10000 }));
  const [averageOrderValue, setAverageOrderValue] = useState(faker.datatype.number({ min: 0, max: 500 }));

  useEffect(() => {
    const interval = setInterval(() => {
      setTotalUsers(faker.datatype.number({ min: 0, max: 1000 }));
      setActiveUsers(faker.datatype.number({ min: 0, max: 500 }));
      setTotalSales(faker.datatype.number({ min: 0, max: 10000 }));
      setAverageOrderValue(faker.datatype.number({ min: 0, max: 500 }));
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const data = {
    labels: ['Total Users', 'Active Users', 'Total Sales', 'Avg Order Value'],
    datasets: [
      {
        label: 'Metrics',
        data: [totalUsers, activeUsers, totalSales, averageOrderValue],
        backgroundColor: ['rgba(75, 192, 192, 0.2)'],
        borderColor: ['rgba(75, 192, 192, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="dashboard">
      <div className="metrics">
        <h3>Total Users: <span style={{ color: totalUsers > 1000 ? 'red' : 'black' }}>{totalUsers}</span></h3>
        <h3>Active Users: <span style={{ color: activeUsers > 500 ? 'green' : 'black' }}>{activeUsers}</span></h3>
        <h3>Total Sales: <span style={{ fontWeight: totalSales > 10000 ? 'bold' : 'normal' }}>${totalSales}</span></h3>
        <h3>Average Order Value: ${averageOrderValue}</h3>
      </div>
      <Line data={data} options={options} />
    </div>
  );
};

export default Dashboard;
