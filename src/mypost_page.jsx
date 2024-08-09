import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Mypost from "./component/mypost/mypost.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <div className={"content-center justify-center items-center"}>
            <Mypost/>
        </div>
    </React.StrictMode>,
);
