import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Xialacaidan from "./component/xialacaidan/xialacaidan.jsx";
import UserLogin from "./component/user.jsx";
import ShowXqq from "./component/show_xqq/show_xqq.jsx";


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <UserLogin/>
        <div className={"mt-4 h-3"}>

        </div>
        <div className="container"> {/* 添加 show-xqq-container 类 */}
            <ShowXqq/>
        </div>
        <div className="fixed top-20 left-10"> {/* 使用 fixed 以及 top 和 left 属性 */}
            <button
                className="shadow-2xl w-60 h-16 p-4 rounded-xl cursor-pointer hover:bg-gray-100"
                onClick={() => (window.location.href = "/xqq_create.html")}
            >
                <span className="text-xl font-semibold text-blue-200">创建兴趣圈</span>
            </button>
        </div>
        <div className="fixed top-0 left-0">
            <Xialacaidan/>
        </div>
    </React.StrictMode>,
);
