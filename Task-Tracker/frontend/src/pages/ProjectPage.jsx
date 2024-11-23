import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProjectPage = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [taskId, setTaskId] = useState('');
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskStatus, setTaskStatus] = useState('new');
  const [taskOwnerId, setTaskOwnerId] = useState('');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    const getProjectData = async () => {
      try {
        const projectResponse = await axios.get(`http://localhost:8000/projects/${projectId}`);
        const tasksResponse = await axios.get('http://localhost:8000/tasks');
        const projectTasks = tasksResponse.data.filter(task => task.project_id === parseInt(projectId));
        setProject(projectResponse.data);
        setTasks(projectTasks);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getProjectData();
  }, [projectId]);

  const handleDelete = async () => {
    try {
      const tasksResponse = await axios.get('http://localhost:8000/tasks');
      const projectTasks = tasksResponse.data.filter(task => task.project_id === parseInt(projectId));

      for (const task of projectTasks) {
        await axios.delete(`http://localhost:8000/tasks/${task.task_id}`);
      }

      await axios.delete(`http://localhost:8000/projects/${projectId}`);
      navigate('/projects');
    } catch (err) {
      console.error('Failed to delete project and its tasks', err);
    }
  };

  const handleUpdate = () => {
    navigate(`/update-project/${projectId}`, { state: { project } });
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    const newTask = {
      task_id: taskId,
      task_name: taskName,
      task_description: taskDescription,
      task_status: taskStatus,
      task_owner_id: taskOwnerId,
      due_date: dueDate,
      project_id: parseInt(projectId),
    };

    try {
      await axios.post('http://localhost:8000/create-task/', newTask);
      setTasks([...tasks, newTask]);
      setShowTaskForm(false);
      setTaskId('');
      setTaskName('');
      setTaskDescription('');
      setTaskStatus('new');
      setTaskOwnerId('');
      setDueDate('');
    } catch (err) {
      console.error('Failed to add task', err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!project) return <p>Project not found</p>;

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">{project.project_name}</h1>
      <p className="text-gray-700 mb-4">{project.project_description}</p>
      <p className="text-gray-500"><strong>Start Date:</strong> {new Date(project.start_date).toLocaleDateString()}</p>
      <p className="text-gray-500"><strong>End Date:</strong> {project.end_date ? new Date(project.end_date).toLocaleDateString() : 'N/A'}</p>
      <div className="flex space-x-4 mb-6">
        <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700">Delete Project</button>
        <button onClick={handleUpdate} className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-700">Update Project</button>
        <button onClick={() => setShowTaskForm(true)} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700">Add Task</button>
      </div>
      <h2 className="text-2xl font-semibold mt-6 mb-4">Tasks</h2>
      {tasks.length === 0 ? (
        <p>No tasks available for this project.</p>
      ) : (
        tasks.map((task) => (
          <div key={task.task_id} className="bg-white p-4 rounded shadow mb-4">
            <h3 className="text-xl font-semibold">{task.task_name}</h3>
            <p className="text-gray-700">{task.task_description}</p>
            <p className="text-gray-500"><strong>Status:</strong> {task.task_status}</p>
            <p className="text-gray-500"><strong>Due Date:</strong> {new Date(task.due_date).toLocaleDateString()}</p>
          </div>
        ))
      )}
      {showTaskForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow w-full max-w-md">
            <h2 className="text-2xl font-semibold mb-4">Add New Task</h2>
            <form onSubmit={handleAddTask}>
              <div className="mb-4">
                <label className="block text-gray-700">Task ID</label>
                <input
                  type="text"
                  value={taskId}
                  onChange={(e) => setTaskId(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Task Name</label>
                <input
                  type="text"
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Task Description</label>
                <textarea
                  value={taskDescription}
                  onChange={(e) => setTaskDescription(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Task Status</label>
                <select
                  value={taskStatus}
                  onChange={(e) => setTaskStatus(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                >
                  <option value="new">New</option>
                  <option value="in-progress">In Progress</option>
                  <option value="blocked">Blocked</option>
                  <option value="completed">Completed</option>
                  <option value="not started">Not Started</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Task Owner ID</label>
                <input
                  type="number"
                  value={taskOwnerId}
                  onChange={(e) => setTaskOwnerId(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Due Date</label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="flex space-x-4">
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700">Add Task</button>
                <button type="button" onClick={() => setShowTaskForm(false)} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectPage;