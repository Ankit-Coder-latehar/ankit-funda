import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import routing components
import './App.css';
import Home from './pages/Home';
import Task from './pages/Task';
import Project from './pages/Project';
import Team from './pages/Team';
import Report from './pages/Report';
import Login from './components/Login';
import SignIn from './components/SignIn';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Define different routes for the components */}
          <Route path="/" element={<SignIn/>} />  {/* Default route (Login Page) */}
          <Route path="/login" element={<Login/>} />  {/* Default route (Login Page) */}
          <Route path="/dashboard" element={<Home/>} />
          <Route path="/task" element={<Task/>} />
          <Route path="/project" element={<Project/>} />
          <Route path="/team" element={<Team/>} />
          <Route path="/report" element={<Report/>} />




        </Routes>
      </div>
    </Router>
  );
}

export default App;
