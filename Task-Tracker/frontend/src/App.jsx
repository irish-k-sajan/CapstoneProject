import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import IndexPage from './components/IndexPage.jsx';

const App = () => {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<IndexPage/>} />
        </Routes>
    </Router>
  );
};

export default App;