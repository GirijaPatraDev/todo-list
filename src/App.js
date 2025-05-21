
import { ToastContainer } from 'react-toastify';
import './App.css';
import Home from './comps/Home';
import Login from './comps/Login';
import Todo from './comps/Todo';
import ResetPassword from './comps/ResetPassword';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Account from './comps/Account';
import Signup from './comps/Signup';

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Router>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="todo" element={<Todo />} />
        <Route path="forgot-password" element={<ResetPassword />} />
        <Route path="account" element={<Account />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
