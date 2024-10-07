import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
} from 'chart.js';
import { Doughnut, Line } from 'react-chartjs-2';
import {
  HomeIcon,
  ClipboardDocumentListIcon,
  UsersIcon,
  ChartBarIcon,
  CogIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

function DashBoard() {
  const stats = [
    { label: 'Total Revenue', value: '$75,000', change: '8% increase', icon: <ChartBarIcon className="w-8 h-8 text-blue-400" /> },
    { label: 'Projects', value: '45 / 100', change: '15% decrease', icon: <ClipboardDocumentListIcon className="w-8 h-8 text-orange-400" /> },
    { label: 'Time Spent', value: '850 / 1000 hrs', change: '6% decrease', icon: <ClockIcon className="w-8 h-8 text-red-400" /> },
    { label: 'Resources', value: '95 / 100', change: '5% increase', icon: <UsersIcon className="w-8 h-8 text-green-400" /> }
  ];

  const projects = [
    { name: 'Cinema App Design', manager: 'Lee A.', due: 'June 10, 2024', status: 'Completed', progress: '100%' },
    { name: 'E-commerce Website Dev', manager: 'Lewis S.', due: 'July 20, 2024', status: 'Delayed', progress: '65%' },
    { name: 'CRM Dashboard Launch', manager: 'Ramirez K.', due: 'July 10, 2024', status: 'At risk', progress: '45%' },
    { name: 'Shop iOS App UI/UX', manager: 'Matthew M.', due: 'Aug 10, 2024', status: 'Completed', progress: '100%' },
    { name: 'Travel App Development', manager: 'Jacklin R.', due: 'Sept 15, 2024', status: 'Ongoing', progress: '55%' }
  ];

  const doughnutData = {
    labels: ['Completed', 'Delayed', 'Ongoing'],
    datasets: [
      {
        label: 'Project Status',
        data: [28, 33, 39],
        backgroundColor: ['#22c55e', '#ef4444', '#f59e0b'],
        hoverOffset: 4
      }
    ]
  };

  const lineData = {
    labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    datasets: [
      {
        label: 'This Week',
        data: [8, 15, 5, 10, 25, 20, 30],
        fill: false,
        borderColor: '#3b82f6',
        tension: 0.1
      },
      {
        label: 'Last Week',
        data: [12, 5, 14, 8, 10, 15, 18],
        fill: false,
        borderColor: '#ef4444',
        tension: 0.1
      }
    ]
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 h-screen p-4 flex flex-col fixed left-0 top-0">
        <div className="flex items-center mb-10">
          <div className="text-3xl font-bold">LetsGyan</div>
        </div>

        {/* Sidebar links */}
        <nav className="flex flex-col space-y-4">
          <a href="/dashboard" className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
            <HomeIcon className="w-6 h-6" /> <span>Dashboard</span>
          </a>
          <a href="/task" className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
            <ClipboardDocumentListIcon className="w-6 h-6" /> <span>Tasks</span>
          </a>
          <a href="/team" className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
            <UsersIcon className="w-6 h-6" /> <span>Teams</span>
          </a>
          <a href="/report" className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
            <ChartBarIcon className="w-6 h-6" /> <span>Reports</span>
          </a>
          <a href="/project" className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
            <CogIcon className="w-6 h-6" /> <span>Projects</span>
          </a>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 p-6 ml-64 h-screen overflow-y-auto">
        {/* Top Navigation */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Welcome to the Dashboard!</h1>
          <div className="flex items-center space-x-4">
            <input type="text" placeholder="Search here..." className="p-2 rounded bg-gray-700" />
            <img src="path_to_profile_picture" alt="profile" className="w-8 h-8 rounded-full" />
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Overview Section */}
          <div className="col-span-4 lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="bg-gray-800 p-4 rounded flex items-center space-x-4">
                  {stat.icon}
                  <div>
                    <h2 className="text-xl">{stat.label}</h2>
                    <p className="text-3xl font-bold">{stat.value}</p>
                    <p className="text-green-400">{stat.change}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Project Summary */}
          <div className="col-span-4 lg:col-span-3">
            <div className="bg-gray-800 p-4 rounded">
              <h2 className="text-xl font-semibold mb-4">Project Summary</h2>
              <table className="min-w-full table-auto">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-4 py-2 text-left text-gray-300">Name</th>
                    <th className="px-4 py-2 text-left text-gray-300">Manager</th>
                    <th className="px-4 py-2 text-left text-gray-300">Due Date</th>
                    <th className="px-4 py-2 text-left text-gray-300">Status</th>
                    <th className="px-4 py-2 text-left text-gray-300">Progress</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project, index) => (
                    <tr key={index} className={`border-t ${index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-900'}`}>
                      <td className="px-4 py-2">{project.name}</td>
                      <td className="px-4 py-2">{project.manager}</td>
                      <td className="px-4 py-2">{project.due}</td>
                      <td
                        className={`px-4 py-2 font-bold ${
                          project.status === 'Completed'
                            ? 'text-green-400'
                            : project.status === 'Delayed'
                            ? 'text-red-400'
                            : 'text-yellow-400'
                        }`}
                      >
                        {project.status}
                      </td>
                      <td className="px-4 py-2">{project.progress}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Progress and Weekly Report */}
          <div className="grid grid-cols-1 lg:grid-cols-2 col-span-4 gap-4">
            {/* Overall Progress */}
            <div className="bg-gray-800 p-4 rounded">
              <h2 className="text-xl font-semibold mb-4">Overall Progress</h2>
              <Doughnut data={doughnutData} />
            </div>

            {/* Weekly Report */}
            <div className="bg-gray-800 p-4 rounded">
              <h2 className="text-xl font-semibold mb-4">Weekly Report</h2>
              <Line data={lineData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashBoard;

