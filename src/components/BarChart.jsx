import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

// Register the required components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
    const data = {
        labels: ['Task 1', 'Task 2', 'Task 3', 'Task 4'],
        datasets: [
            {
                label: 'Tasks Progress',
                data: [30, 50, 70, 100],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            }
        ]
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return <Bar data={data} options={options} />;
};

export default BarChart;
