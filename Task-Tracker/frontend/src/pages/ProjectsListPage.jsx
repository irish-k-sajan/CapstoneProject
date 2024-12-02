import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchProjects } from '../utils/dataFetcher';
import axios from 'axios';
import Logout from '../components/Logout';

const ProjectsListPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const userId=JSON.parse(localStorage.getItem("user-details")).googleId;
  const admin=(localStorage.getItem("is-admin")=="true");
  const dashboard="Dashboard";
  useEffect(() => {
    const getProjects = async () => {
      try {
        const projectsResponse = await axios.get(`http://localhost:8000/projects/${userId}`);

        setProjects(projectsResponse.data);
        }
       catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    getProjects();
  }, []);

  const handleAddProject = (newProject) => {
    setProjects([...projects, newProject]);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="min-h-screen p-4">
      <Link to="/dashboard" className='text-xl text-gray-700 hover:text-gray-900'>{dashboard}</Link>
      <Logout/>
      <h1 className="text-5xl font-bold mb-6">Projects</h1>
      {admin && <button
        onClick={() => navigate('/add-project')}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mb-6"
      >
        Add New Project
      </button>}
      {projects.length === 0 ? (
        <p>No projects available.</p>
      ) : (
        projects.map((project) => (
          <Link to={`/projects/${project.project_id}`} key={project.project_id} className="block mb-4">
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 bg-gray-200 border border-gray-400">
              <h2 className="text-2xl font-semibold mb-2">{project.project_name}</h2>
              <p className="text-gray-700 mb-4">{project.project_description}</p>
              <p className="text-gray-500"><strong>Start Date:</strong> {new Date(project.start_date).toLocaleDateString()}</p>
              <p className="text-gray-500"><strong>End Date:</strong> {project.end_date ? new Date(project.end_date).toLocaleDateString() : 'N/A'}</p>
            </div>
          </Link>
        ))
      )}
    </div>
  );
};

export default ProjectsListPage;
