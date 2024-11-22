import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard.jsx';
import ProjectsListPage from './pages/ProjectsListPage.jsx';
import ProjectFormPage from './pages/ProjectFormPage.jsx';
import ProjectPage from './pages/ProjectPage.jsx';
import UpdateProjectPage from './pages/UpdateProjectPage.jsx';

const App = () => {

  return (
    <Router>
        <Routes>
          <Route path="/" element={<Dashboard/>} />
          <Route path="/projects" element={<ProjectsListPage/>} />
          <Route path="/projects/:projectId" element={<ProjectPage/>} />
          <Route path="/add-project" element={<ProjectFormPage/>} />
          <Route path="/update-project/:projectId" element={<UpdateProjectPage/>} />
        </Routes>
    </Router>
  );
};

export default App;