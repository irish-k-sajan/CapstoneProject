import React, { useState } from 'react';

const TaskForm = ({ projectId, onAddTask }) => {
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskStatus, setTaskStatus] = useState('new');
  const [taskOwnerId, setTaskOwnerId] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      task_id: Date.now(), // Temporary ID
      task_name: taskName,
      task_description: taskDescription,
      task_status: taskStatus,
      task_owner_id: taskOwnerId,
      due_date: dueDate,
      project_id: projectId,
    };
    onAddTask(newTask);
    setTaskName('');
    setTaskDescription('');
    setTaskStatus('new');
    setTaskOwnerId('');
    setDueDate('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-4">
      <h2 className="text-2xl font-semibold mb-4">Add New Task</h2>
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
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700">
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;