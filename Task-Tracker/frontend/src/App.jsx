import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard.jsx';
import ProjectsListPage from './pages/ProjectsListPage.jsx';
import ProjectFormPage from './pages/ProjectFormPage.jsx';
import ProjectPage from './pages/ProjectPage.jsx';
import UpdateProjectPage from './pages/UpdateProjectPage.jsx';
import { useEffect } from 'react';
import { gapi } from 'gapi-script';
import Login from './components/Login.jsx';
import Logout from './components/Logout.jsx';
import LoginUnsuccessful from './pages/LoginUnsuccessful.jsx';

const clientId="714826473195-mkbur5p2vel0mtc8o8suvr94rdni8n4g.apps.googleusercontent.com";

const App = () => {
  useEffect(()=>{
    function start(){
      gapi.client.init({
        clientId: {clientId},
        scope: ""
    })
    }
    gapi.load('client:auth2',start)
  });

  return (
    <Router>
        <Routes>
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/projects" element={<ProjectsListPage/>} />
          <Route path="/projects/:projectId" element={<ProjectPage/>} />
          <Route path="/add-project" element={<ProjectFormPage/>} />
          <Route path="/update-project/:projectId" element={<UpdateProjectPage/>} />
          <Route path="/" element={<Login/>} />
          <Route path="/logout" element={<Logout/>} />
          <Route path="/login-unsuccessful" element={<LoginUnsuccessful/>} />
        </Routes>
    </Router>
  );
};

export default App;
