import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import MyLike from "./component/mylike/mylike.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <div className={"content-center justify-center items-center"}>
            <MyLike/>
        </div>
    </React.StrictMode>,
);
