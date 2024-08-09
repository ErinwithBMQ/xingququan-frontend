import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import MyComment from "./component/mycomment/mycomment.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <div className={"content-center justify-center items-center"}>
            <MyComment/>
        </div>
    </React.StrictMode>,
);
