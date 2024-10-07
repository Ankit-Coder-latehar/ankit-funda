import React from 'react';
import BarChart from './BarChart';
import PieChart from "./PiChart"
import LineChart from './LineChart';
import { FaTachometerAlt, FaClipboardCheck, FaChartLine, FaProjectDiagram, FaUsers } from 'react-icons/fa';

// Sidebar Component
const Sidebar = () => (
  <div className="w-64 bg-gray-800 text-white h-screen fixed">
    <div className="flex-shrink-0 p-4 text-2xl font-bold">LetsGyan</div>
    <nav className="flex-grow">
      <ul className="space-y-2">
        <li>
          <a href="/dashboard" className="flex items-center py-2 px-4 hover:bg-gray-700">
            <FaTachometerAlt className="mr-3" />
            Dashboard
          </a>
        </li>
        <li>
          <a href="/task" className="flex items-center py-2 px-4 hover:bg-gray-700">
            <FaClipboardCheck className="mr-3" />
            Tasks
          </a>
        </li>
        <li>
          <a href="/report" className="flex items-center py-2 px-4 bg-gray-700">
            <FaChartLine className="mr-3" />
            Reports
          </a>
        </li>
        <li>
          <a href="/project" className="flex items-center py-2 px-4 hover:bg-gray-700">
            <FaProjectDiagram className="mr-3" />
            Projects
          </a>
        </li>
        <li>
          <a href="/team" className="flex items-center py-2 px-4 hover:bg-gray-700">
            <FaUsers className="mr-3" />
            Users
          </a>
        </li>
      </ul>
    </nav>
  </div>
);

const ReportPage = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />
      {/* Main content */}
      <div className="ml-64 w-full p-4 h-screen overflow-y-auto bg-gray-100">
        <h1 className="text-3xl font-bold mb-4 text-center">Project and Task Statistics</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-white shadow rounded-lg">
            <h2 className="text-xl font-bold mb-2">Tasks Progress</h2>
            <BarChart />
          </div>
          <div className="p-4 bg-white shadow rounded-lg">
            <h2 className="text-xl font-bold mb-2">Task Status Distribution</h2>
            <PieChart />
          </div>
          <div className="p-4 bg-white shadow rounded-lg md:col-span-2">
            <h2 className="text-xl font-bold mb-2">Project Progress Over Time</h2>
            <LineChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportPage;


