import React from 'react';
import { Pie } from 'react-chartjs-2';

const PieChart = () => {
    const data = {
        labels: ['Completed', 'Pending', 'In Progress'],
        datasets: [
            {
                data: [10, 15, 5],
                backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384'],
            }
        ]
    };

    return <Pie data={data} />;
};

export default PieChart;
