import React from 'react';
import './App.css';
import Tasks from './components/Tasks/tasks';
import Planner from './components/Planned/Planner';

function App() {
  return (
    <div className="App">
      <Tasks />
      <Planner />
    </div>
  );
}

export default App;