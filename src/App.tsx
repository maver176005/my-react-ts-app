import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserManagementView from '@/components/UserManagementView';
import './App.css'
const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={
                   <UserManagementView />
                    } />
            </Routes>
        </Router>
    );
};

export default App;
