import './others_comment.css'
// eslint-disable-next-line no-unused-vars
import React, {useEffect, useState} from "react";
import axiosInstance from '/axios.config.js';

function OthersComment() {
    const [comment_list, setCommentList] = useState([]);

    useEffect(() => {
        axiosInstance.get('/user/get_name')
            .then(response => {
                const newName = response.data.username;
                console.log(newName);

                return axiosInstance.get('/user/get_others_comment', {params: {name: newName}});
            })
            .then(response => {
                setCommentList(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <>
            <div className={"fixed"}>
                <button
                    className="fixed top-20 left-10 w-fit shadow-2xl p-4 rounded-xl cursor-pointer hover:bg-gray-100 mb-40"
                    onClick={() => (window.location.href = "/xqq_choose.html")}
                >
                    <span className="text-xl font-semibold text-blue-200">返回</span>
                </button>
            </div>
            <div className={"shell0"}>
                <div
                    className="flex flex-col bg-pink-100 items-center shadow-2xl p-4 rounded-xl w-full h-full">
                    <div className={"text-3xl font-semibold text-white title0"}>
                        评论我的
                    </div>
                    <div>
                        {comment_list.length === 0 &&
                            <div className="text-xl font-semibold text-white mt-4">暂无评论</div>}
                    </div>
                    <div>
                        {comment_list.map((comment) => (
                            <div className="bg-blue-100 p-5 rounded-xl shadow-xl m-8 mywidth" key={comment.id}>
                                <div className={"flex content-center justify-between mb-4"}>
                                    <button
                                        className={"flex flex-col bg-white p-2 rounded-xl shadow-xl cursor-pointer w-fit justify-center content-center hover:bg-gray-100"}
                                        onClick={() => (window.location.href = `/post/${comment.post_id}`)}>
                                        <div
                                            className="text-lg font-semibold text-blue-300 whitespace-normal break-words  justify-center content-center">
                                            原贴
                                        </div>
                                    </button>

                                    <div className={"flex content-center justify-center"}>
                                        <div className="text-lg font-semibold text-blue-400 mb-4">
                                            评论时间：{comment.time}
                                        </div>
                                    </div>
                                </div>


                                <div className={"flex mt-2 bg-red-50 p-2 rounded-xl shadow-lg"}>
                                    <div
                                        className="text-lg font-semibold text-pink-300 whitespace-normal break-words  justify-center content-center">
                                        {comment.creator} 评论了我：
                                    </div>
                                    <div
                                        className="text-lg font-semibold text-blue-300 whitespace-normal break-words  justify-center content-center">
                                        {comment.message}
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </>
    );
}

export default OthersComment;
