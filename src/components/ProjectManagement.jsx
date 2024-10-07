import React, { useState } from 'react';

const ProjectDashboard = () => {
  // State to manage projects
  const [projects, setProjects] = useState([
    { id: 1, name: 'Google', description: 'This project is for the creation of user interfaces.', progress: 95, dueDate: '25 Sep', team: ['1', '2', '3', '4'] },
    { id: 2, name: 'Abbott', description: 'This project is for healthcare products.', progress: 75, dueDate: '15 Oct', team: ['1', '2', '3'] },
    { id: 3, name: 'Boeing', description: 'Project for airplane manufacturing.', progress: 60, dueDate: '10 Nov', team: ['1', '2'] },
  ]);

  // State to manage form input for adding and editing
  const [newProject, setNewProject] = useState({ id: '', name: '', description: '', progress: 0, dueDate: '', team: [] });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handler to add a new project
  const handleAddProject = () => {
    if (isEditing) {
      // If editing, update the project
      setProjects(
        projects.map((project) =>
          project.id === editingId ? { ...newProject, id: editingId } : project
        )
      );
      setIsEditing(false);
    } else {
      // Add a new project
      setProjects([...projects, { ...newProject, id: projects.length + 1 }]);
    }
    // Reset form
    setNewProject({ id: '', name: '', description: '', progress: 0, dueDate: '', team: [] });
    setIsModalOpen(false); // Close the modal after adding/updating
  };

  // Handler to delete a project
  const handleDeleteProject = (id) => {
    setProjects(projects.filter((project) => project.id !== id));
  };

  // Handler to edit a project
  const handleEditProject = (project) => {
    setIsEditing(true);
    setEditingId(project.id);
    setNewProject(project);
    setIsModalOpen(true); // Open the modal with existing project data
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="bg-gray-100 w-64 p-4">
        <div className="text-2xl font-semibold mb-8">LetsGyan</div>
        <nav className="space-y-4">
          <a href="/dashboard" className="block hover:bg-orange-500 hover:text-white py-2 px-4 rounded-lg">
            Dashboard
          </a>
          <a href="/task" className="block hover:text-white py-2 px-4 hover:bg-orange-500 rounded-lg">
            My Tasks
          </a>
          <a href="/team" className="block hover:text-white py-2 px-4 hover:bg-orange-500 rounded-lg">
            Team
          </a>
          <a href="/report" className="block hover:text-white py-2 px-4 hover:bg-orange-500 rounded-lg">
            Reports
          </a>
          <a href="/project" className="block text-white py-2 px-4 bg-orange-500 rounded-lg">
            Project
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold">Projects</h1>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search for anything..."
              className="py-2 px-4 border border-gray-300 rounded-lg"
            />
            <div className="flex items-center space-x-2">
              <img
                src="https://via.placeholder.com/40"
                alt="user"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-semibold">James Smith</p>
              </div>
            </div>
          </div>
        </div>

        {/* Projects Filters & Add Project Button */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-6">
            <a href="#" className="font-semibold text-orange-500 border-b-2 border-orange-500 pb-2">
              All (12)
            </a>
            <a href="#" className="font-semibold text-gray-600">
              In Progress (3)
            </a>
            <a href="#" className="font-semibold text-gray-600">
              Completed (8)
            </a>
            <a href="#" className="font-semibold text-gray-600">
              On Hold (1)
            </a>
          </div>
          {/* Add Project Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-orange-500 text-white py-2 px-4 rounded-lg"
          >
            + Add Project
          </button>
        </div>

        {/* Projects List */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-lg">{project.name}</h3>
                <div className="space-x-2">
                  <button
                    onClick={() => handleEditProject(project)}
                    className="text-blue-500 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProject(project.id)}
                    className="text-red-500 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-4">{project.description}</p>
              <div className="flex items-center justify-between mb-4">
                <span className="text-green-500 font-semibold">{project.progress}% Completed</span>
                <span className="text-sm text-gray-400">Due Date: {project.dueDate}</span>
              </div>
              <div className="relative w-full h-2 bg-gray-200 rounded-full mb-4">
                <div
                  className="absolute top-0 left-0 h-full bg-green-500 rounded-full"
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
              <div className="flex -space-x-2">
                {project.team.map((member, i) => (
                  <img
                    key={i}
                    src={`https://via.placeholder.com/40?text=${member}`}
                    alt={`user ${member}`}
                    className="w-8 h-8 rounded-full border-2 border-white"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Modal for Add/Edit Project Form */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg w-1/3">
              <h2 className="text-2xl font-semibold mb-4">
                {isEditing ? 'Edit Project' : 'Add Project'}
              </h2>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Project Name"
                  value={newProject.name}
                  onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                  className="block w-full py-2 px-4 border border-gray-300 rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Description"
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  className="block w-full py-2 px-4 border border-gray-300 rounded-lg"
                />
                <input
                  type="number"
                  placeholder="Progress (%)"
                  value={newProject.progress}
                  onChange={(e) => setNewProject({ ...newProject, progress: e.target.value })}
                  className="block w-full py-2 px-4 border border-gray-300 rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Due Date"
                  value={newProject.dueDate}
                  onChange={(e) => setNewProject({ ...newProject, dueDate: e.target.value })}
                  className="block w-full py-2 px-4 border border-gray-300 rounded-lg"
                />
                <button
                  onClick={handleAddProject}
                  className="py-2 px-4 bg-orange-500 text-white rounded-lg"
                >
                  {isEditing ? 'Update Project' : 'Add Project'}
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="py-2 px-4 bg-gray-400 text-white rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ProjectDashboard;
