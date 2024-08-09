import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import OthersLike from "./component/others_like/others_like.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <div className={"content-center justify-center items-center"}>
            <OthersLike/>
        </div>
    </React.StrictMode>,
);
