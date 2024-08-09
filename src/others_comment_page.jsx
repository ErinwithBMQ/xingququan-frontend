import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import OthersComment from "./component/others_comment/others_comment.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <div className={"content-center justify-center items-center"}>
            <OthersComment/>
        </div>
    </React.StrictMode>,
);
