import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import CreateXqq from "./component/create_xqq/create_xqq.jsx";
import UserLogin from "./component/user.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <UserLogin/>
        <div className="fixed top-20 left-10">
            <button
                className="shadow-2xl w-60 h-16 p-4 rounded-xl cursor-pointer hover:bg-gray-100"
                onClick={() => (window.location.href = "/xqq_choose.html")}
            >
                <span className="text-xl font-semibold text-blue-200">返回</span>
            </button>
        </div>
        <div className="min-h-screen flex items-center justify-center">
            <CreateXqq/>
        </div>
    </React.StrictMode>,
);
