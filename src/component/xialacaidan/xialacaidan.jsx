import './xialacaidan.css'
import {useEffect, useState} from "react";
import axiosInstance from "../../../axios.config.js";

function Xialacaidan() {
    const [user_message, setUser_message] = useState([]);
    useEffect(() => {
        axiosInstance.get('/user/get_message')
            .then(response => {
                setUser_message(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);
    return (
        <ul className="shell">
            <li className="button">
                <span>我的消息</span>
                <ul>
                    <li onClick={() => {
                        window.location.href = 'others_comment.html';
                    }}>评论我的
                    </li>
                    <li onClick={() => {
                        window.location.href = 'others_like.html';
                    }}>收到的赞
                    </li>
                </ul>
            </li>
            <li className="button">
                <span onClick={() => {
                    window.location.href = 'mypost.html';
                }}>我的帖子</span>
            </li>
            <div className={"por1 mt-4"}>
                <img src={`http://127.0.0.1:7001/file/show?id=${user_message.image_id}`} alt="xqq image"/>
            </div>
            <li className="button">
                <span>我的互动</span>
                <ul>
                    <li onClick={() => {
                        window.location.href = 'mylike.html';
                    }}>我的点赞
                    </li>
                    <li onClick={() => {
                        window.location.href = 'mycomment.html';
                    }}>我的评论
                    </li>
                </ul>
            </li>
            <li className="button">
                <span>关于我</span>
                <ul>
                    <li onClick={() => {
                        window.location.href = '/home';
                    }}>个人信息
                    </li>
                    <li onClick={() => {
                        window.location.href = `/`;
                        localStorage.removeItem('token');
                    }}>退出登录
                    </li>
                </ul>
            </li>
        </ul>
    )
}

export default Xialacaidan;
