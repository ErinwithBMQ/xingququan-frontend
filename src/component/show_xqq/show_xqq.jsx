import './show_xqq.css'
import axiosInstance from '/axios.config.js';
import {useEffect, useState} from "react";

function ShowXqq() {
    const [xqq_list, setXqq_list] = useState([]);
    useEffect(() => {
        axiosInstance.get('/xqq/get_all')
            .then(response => {
                setXqq_list(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);
    return (
        <div className="flex flex-col bg-pink-100 items-center shadow-2xl p-4 rounded-xl w-3/4">
            <h1 className={"text-3xl font-semibold text-white title"}>
                兴趣圈列表
            </h1>
            <div>
                {xqq_list.length === 0 && <div className="text-xl font-semibold text-white mt-4">暂无兴趣圈</div>}
            </div>
            {xqq_list.map((xqq) => (
                <div className="bg-blue-100 p-4 rounded-xl shadow-xl w-full m-4" key={xqq.id}>
                    <div className={"flex"}>
                        <div className="por mb-4 mr-4">
                            <img src={`http://127.0.0.1:7001/file/show?id=${xqq.image_id}`} alt="xqq image"/>
                        </div>
                        <div className="text-2xl font-semibold text-pink-300 mb-4 mr-4 w-1/2">
                            名称：{xqq.xqq_name}
                        </div>
                        <div className="ml-12">
                            <a href={`/xqq/${xqq.id}`}>
                                <button
                                    className="flex items-center justify-center shadow-xl p-2 rounded-xl cursor-pointer hover:bg-gray-100 w-full">
                                    <span className="text-xl font-semibold text-blue-200">进入兴趣圈</span>
                                </button>
                            </a>
                        </div>
                    </div>
                    <div className="text-lg font-semibold text-blue-400 mb-4">
                        创建者：{xqq.creator}
                    </div>
                    <div className="text-lg font-semibold text-blue-300 whitespace-normal break-words">
                        简介：{xqq.introduction}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ShowXqq;
