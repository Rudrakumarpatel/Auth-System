// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';

const App = () => {
    return (
        <Router>
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
                <h1>User Authentication System</h1>
                <div>
                    <Link to="/login">
                        <button style={{ margin: '10px', padding: '10px 20px' }}>Login</button>
                    </Link>
                    <Link to="/register">
                        <button style={{ margin: '10px', padding: '10px 20px' }}>Register</button>
                    </Link>
                </div>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;