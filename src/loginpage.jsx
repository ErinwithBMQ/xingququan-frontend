import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from "./component/login/login.jsx";


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <div>
            <Login/>
        </div>
    </React.StrictMode>,
);
