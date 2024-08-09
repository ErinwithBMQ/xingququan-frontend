import './post.css'
import axiosInstance from '/axios.config.js';
// eslint-disable-next-line no-unused-vars
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

function ShowPost2() {
    const [post, setPost] = useState([]);
    const [comment_list, setComment_list] = useState([]);
    const {id} = useParams(); // 获取动态参数id
    const [creator_photo, setCreator_photo] = useState([]);
    const [loading, setLoading] = useState(false);
    const [user_name, setUser_name] = useState([]);

    useEffect(() => {
        axiosInstance.get('/post/get_post_by_id', {params: {id: id}})
            .then(response => {
                setPost(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });

        axiosInstance.get('/post/get_all_comment', {params: {post_id: id}})
            .then(response => {
                setComment_list(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });

        axiosInstance.get('/user/touxiang', {params: {name: post.poster_name}})
            .then(response => {
                setCreator_photo(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });

        axiosInstance.get('/user/get_name')
            .then(response => {
                setUser_name(response.data.username);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [id, post.poster_name, loading]);

    const handleLikeClick = (postId) => {
        setLoading(true); // 开始加载

        // 假设有一个 API 可以用来更新点赞数
        axiosInstance.post(`/post/like`, {creator: user_name, post_id: postId})
            .then(response => {
                console.log(response.data)
                // 成功后刷新页面
                if (response.data === true) {
                    window.location.reload();
                } else {
                    alert('你已点赞过此贴。');
                }
            })
            .catch(error => {
                console.error('Error liking post:', error);
            })
            .finally(() => {
                setLoading(false); // 结束加载
            });
    };

    return (
        <>
            <div className={"flex w-full"}>
                <div className={"flex flex-col lr_between"}>
                    <button
                        className="flex items-center justify-center shadow-2xl p-4 rounded-xl cursor-pointer hover:bg-gray-100 w-1/6 mb-8"
                        onClick={() => (window.location.href = `/xqq/${post.xqq_id}`)}
                    >
                        <span className="text-xl font-semibold text-pink-200">返回</span>
                    </button>
                    <div className="flex flex-col bg-pink-100 items-center shadow-2xl p-4 rounded-xl my_width">
                        <div className={"text-3xl font-semibold text-white title"}>
                            帖子详情
                        </div>
                        <div className="flex bg-blue-100 p-4 rounded-xl shadow-xl w-full m-4">
                            <div className="por mb-4 mr-4">
                                <img src={`http://127.0.0.1:7001/file/show?id=${creator_photo}`}
                                     alt="xqq image"/>
                            </div>
                            <div className={"mr-6"}>

                            </div>
                            <div className={"flex flex-col justify-center"}>
                                <div className="text-3xl font-semibold text-pink-300 mb-4 ml-4">
                                    {post.title}
                                </div>
                                <div
                                    className="text-xl font-semibold text-blue-400 mb-4">
                                    发布者：{post.poster_name}
                                </div>
                                <div className="text-xl font-semibold text-blue-400">
                                    发布时间：{post.time}
                                </div>
                            </div>
                        </div>
                        <div className={"flex bg-red-50 p-2 rounded-xl shadow-lg justify-between w-full"}>
                            <div className={"flex content-center justify-center"}>
                                <div
                                    className="text-lg font-semibold text-red-300 mr-8">
                                    点赞数：{post.like_number}
                                </div>
                                <div className="text-lg font-semibold text-orange-300 ml-4">
                                    评论数：{post.comment_number}
                                </div>
                            </div>
                            <div>
                                <img src={"/heart.png"}
                                     alt="xqq image"
                                     className={"heart cursor-pointer"}
                                     onClick={() => handleLikeClick(post.id)}
                                />
                            </div>

                        </div>
                        <div className="bg-blue-100 p-4 rounded-xl shadow-xl w-full m-4">
                            {post.image_id !== 0 && <div className={"mb-4"}>
                                <img src={`http://127.0.0.1:7001/file/show?id=${post.image_id}`} alt="xqq image"
                                     className="image-responsive_post"/>
                            </div>}
                            <div className={"bg-white p-2 rounded-xl shadow-md w-full justify-center content-center"}>
                                <div className="text-lg font-semibold text-blue-300 whitespace-normal break-words">
                                    {post.message}
                                </div>
                            </div>
                        </div>
                    </div>
                    <button
                        className="flex items-center justify-center shadow-2xl p-4 rounded-xl cursor-pointer hover:bg-gray-100 w-1/2 mt-8"
                        onClick={() => (window.location.href = `/post/${post.id}/comment`)}
                    >
                        <span className="text-xl font-semibold text-pink-200">发表评论</span>
                    </button>
                </div>
                <div
                    className="flex flex-col bg-pink-100 items-center shadow-2xl p-4 rounded-xl w-3/5 h-full">
                    <div>
                        <div className={"text-3xl font-semibold text-white title"}>
                            评论区
                        </div>
                        <div>
                            {comment_list.length === 0 &&
                                <div className="text-xl font-semibold text-white mt-4">暂无评论</div>}
                        </div>
                        <div>
                            {comment_list.map((comment) => (
                                <div className="bg-blue-100 p-5 rounded-xl shadow-xl m-8" key={comment.id}>
                                    <div className={"flex content-center justify-center mb-2"}>
                                        <div
                                            className="text-lg font-semibold text-blue-400 mb-4 between_comment">
                                            评论者：{comment.creator}
                                        </div>
                                        <div className="text-lg font-semibold text-blue-400 mb-4">
                                            评论时间：{comment.time}
                                        </div>
                                    </div>

                                    <div
                                        className={"bg-white p-2 rounded-xl shadow-md w-full justify-center content-center"}>
                                        <div
                                            className="text-lg font-semibold text-blue-300 whitespace-normal break-words">
                                            {comment.message}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default ShowPost2;
