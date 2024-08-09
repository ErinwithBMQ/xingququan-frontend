import './mylike.css'
// eslint-disable-next-line no-unused-vars
import React, {useEffect, useState} from "react";
import axiosInstance from '/axios.config.js';

function MyLike() {
    const [post_list, setPostList] = useState([]);

    useEffect(() => {
        axiosInstance.get('/user/get_name')
            .then(response => {
                const newName = response.data.username;
                console.log(newName);

                return axiosInstance.get('/user/get_user_likepost', {params: {name: newName}});
            })
            .then(response => {
                setPostList(response.data);
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
                        我的点赞
                    </div>
                    <div>
                        {post_list.length === 0 &&
                            <div className="text-xl font-semibold text-white mt-4">暂无点赞信息</div>}
                    </div>
                    <div>
                        {post_list.map((post) => (
                            <div className="bg-blue-100 p-5 rounded-xl shadow-xl m-8 mywidth" key={post.id}>
                                <div className={"flex mb-4 bg-red-50 p-2 rounded-xl w-fit"}>
                                    <div
                                        className="text-lg font-semibold text-red-300">
                                        你点赞了
                                    </div>
                                </div>

                                <div className="text-3xl font-semibold text-pink-300 mb-4 mr-4">
                                    {post.title}
                                </div>

                                <div className={"flex content-center justify-between mb-2"}>
                                    <div className="text-lg font-semibold text-blue-400 mb-4">
                                        发布人：{post.poster_name}
                                    </div>
                                    <div className="text-lg font-semibold text-blue-400 mb-4">
                                        发布时间：{post.time}
                                    </div>
                                </div>

                                {post.image_id !== 0 && <div className={"mb-4"}>
                                    <img src={`http://127.0.0.1:7001/file/show?id=${post.image_id}`} alt="xqq image"
                                         className="image-responsive0"/>
                                </div>}

                                <button
                                    className={"flex flex-col bg-white p-2 rounded-xl shadow-xl mb-4 cursor-pointer w-full justify-center content-center hover:bg-gray-100"}
                                    onClick={() => (window.location.href = `/post/${post.id}`)}>
                                    <div
                                        className="text-lg font-semibold text-blue-300 whitespace-normal break-words  justify-center content-center">
                                        {post.message}
                                    </div>
                                </button>

                                <div className={"flex mt-2 bg-red-50 p-2 rounded-xl shadow-lg justify-between"}>
                                    <div className={"flex content-center justify-center"}>
                                        <div
                                            className="text-lg font-semibold text-red-300 mr-8">
                                            点赞数：{post.like_number}
                                        </div>
                                        <div className="text-lg font-semibold text-orange-300 ml-4">
                                            评论数：{post.comment_number}
                                        </div>
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

export default MyLike;
