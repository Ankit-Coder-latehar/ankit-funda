import React, { useState } from 'react';
import { FaTachometerAlt, FaClipboardCheck, FaChartLine, FaProjectDiagram, FaUsers } from 'react-icons/fa';

// Dummy data for projects and tasks
const projectsData = [
  {
    id: 1,
    name: 'Project Alpha',
    tasks: [
      { id: 1, title: 'Design Homepage', description: 'Create the homepage layout', dueDate: '2024-10-10', status: 'Completed' },
      { id: 2, title: 'Develop API', description: 'Build REST API for the app', dueDate: '2024-11-01', status: 'In Progress' },
      { id: 3, title: 'Write Documentation', description: 'Document API and app usage', dueDate: '2024-12-15', status: 'Pending' },
    ],
  },
  {
    id: 2,
    name: 'Project Beta',
    tasks: [
      { id: 1, title: 'Setup CI/CD', description: 'Integrate continuous deployment', dueDate: '2024-10-25', status: 'Completed' },
      { id: 2, title: 'Optimize Database', description: 'Improve query efficiency', dueDate: '2024-11-10', status: 'In Progress' },
    ],
  },
];

const Sidebar = () => (
  <div className="w-64 bg-gray-800 text-white h-screen fixed top-0 left-0 flex flex-col">
    <div className="flex-shrink-0 p-4 text-lg font-bold">My App</div>
    <nav className="flex-grow">
      <ul className="space-y-2">
        <li>
          <a href="/dashboard" className="flex items-center py-2 px-4 hover:bg-gray-700">
            <FaTachometerAlt className="mr-3" />
            Dashboard
          </a>
        </li>
        <li>
          <a href="/task" className="flex items-center py-2 px-4 bg-gray-700">
            <FaClipboardCheck className="mr-3" />
            Tasks
          </a>
        </li>
        <li>
          <a href="/report" className="flex items-center py-2 px-4 hover:bg-gray-700">
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

const TaskList = () => {
  const [projects, setProjects] = useState(projectsData);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({ title: '', description: '', dueDate: '', status: 'Pending' });
  const [editingTask, setEditingTask] = useState(null);

  const toggleProjectTasks = (project) => {
    setSelectedProject(selectedProject === project.id ? null : project.id);
  };

  const openAddTaskModal = (project) => {
    setSelectedProject(project.id);
    setFormData({ title: '', description: '', dueDate: '', status: 'Pending' });
    setEditingTask(null);
    setModalOpen(true);
  };

  const openEditTaskModal = (task, project) => {
    setSelectedProject(project.id);
    setFormData(task);
    setEditingTask(task);
    setModalOpen(true);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    const updatedProjects = projects.map((project) => {
      if (project.id === selectedProject) {
        if (editingTask) {
          return {
            ...project,
            tasks: project.tasks.map((task) =>
              task.id === editingTask.id ? { ...task, ...formData } : task
            ),
          };
        } else {
          return {
            ...project,
            tasks: [...project.tasks, { id: project.tasks.length + 1, ...formData }],
          };
        }
      }
      return project;
    });

    setProjects(updatedProjects);
    setModalOpen(false);
  };

  const handleDeleteTask = (taskId, project) => {
    const updatedProjects = projects.map((proj) => {
      if (proj.id === project.id) {
        return { ...proj, tasks: proj.tasks.filter((task) => task.id !== taskId) };
      }
      return proj;
    });
    setProjects(updatedProjects);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main content */}
      <div className="ml-64 w-full h-screen overflow-y-scroll p-8 flex-grow">
        <h1 className="text-4xl font-bold mb-8 text-center">Project and Task List</h1>

        <div className="grid grid-cols-1 gap-4">
          {projects.map((project) => (
            <div key={project.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">{project.name}</h2>
                <div>
                  <button
                    onClick={() => openAddTaskModal(project)}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 mr-2"
                  >
                    Add Task
                  </button>
                  <button
                    onClick={() => toggleProjectTasks(project)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                  >
                    {selectedProject === project.id ? 'Hide Tasks' : 'View Tasks'}
                  </button>
                </div>
              </div>

              {selectedProject === project.id && (
                <div className="mt-4">
                  <h3 className="text-xl font-semibold mb-2">Tasks</h3>
                  <ul className="space-y-2">
                    {project.tasks.map((task) => (
                      <li key={task.id} className="p-4 border rounded-lg bg-gray-100">
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="font-semibold">{task.title}</span>
                            <span className="block text-sm text-gray-600">{task.description}</span>
                            <span className="block text-sm text-gray-600">Due: {task.dueDate}</span>
                            <span
                              className={`py-1 px-3 mt-2 rounded-full text-xs font-bold ${
                                task.status === 'Completed'
                                  ? 'bg-green-500 text-white'
                                  : task.status === 'In Progress'
                                  ? 'bg-yellow-500 text-white'
                                  : 'bg-red-500 text-white'
                              }`}
                            >
                              {task.status}
                            </span>
                          </div>
                          <div>
                            <button
                              onClick={() => openEditTaskModal(task, project)}
                              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 mr-2"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteTask(task.id, project)}
                              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Modal for adding/editing task */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
              <h2 className="text-2xl font-bold mb-4">
                {editingTask ? 'Edit Task' : 'Add Task'}
              </h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-bold mb-2">Task Name</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Task Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Due Date</label>
                  <input
                    type="date"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg"
                  >
                    <option value="Pending">To-do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </form>
              <div className="flex justify-end space-x-4 mt-4">
                <button
                  onClick={() => setModalOpen(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                >
                  {editingTask ? 'Update Task' : 'Add Task'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskList;

