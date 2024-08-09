// eslint-disable-next-line no-unused-vars
import React, {useState, useEffect} from 'react';
import axiosInstance from '../../../axios.config.js';
import {useParams} from 'react-router-dom';
import './active.css';

const Active = () => {
    const {id} = useParams(); // 获取动态参数 id
    const [postList, setPostList] = useState([]);

    useEffect(() => {
        axiosInstance.get('/post/get_all_post', {params: {xqq_id: id}})
            .then(response => {
                setPostList(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [id]);

    const postNumber = postList.length;
    let commentNumber = 0;
    let likeNumber = 0;

    // 统计每个用户的帖子数量
    const userPostCounts = {};

    if (postNumber > 0) {
        for (let i = 0; i < postNumber; i++) {
            const post = postList[i];
            const userName = post.poster_name;
            commentNumber += post.comment_number;
            likeNumber += post.like_number;

            // 更新用户帖子数量
            if (userPostCounts[userName]) {
                userPostCounts[userName]++;
            } else {
                userPostCounts[userName] = 1;
            }
        }
    }

    // 将 userPostCounts 转换成可以渲染的格式
    const userPostCountsEntries = Object.entries(userPostCounts).map(([user, count]) => (
        <>
            <div key={user} className="flex flex-col text-lg font-medium text-blue-400 mb-2">
                用户 {user}: {count} 篇帖子
            </div>
        </>
    ));

    return (
        <>
            <div className={"fixed top-10 left-20 w-full"}>
                <button
                    className="flex items-center justify-center shadow-2xl p-4 rounded-xl cursor-pointer hover:bg-gray-100 w-1/6"
                    onClick={() => window.history.back()}
                >
                    <span className="text-xl font-semibold text-pink-200">返回</span>
                </button>
            </div>
            <div className={"flex flex-col items-center justify-center h-screen"}>
                <div className="shell_a lr_between">
                    <h2 className="title_a">活跃情况</h2>
                    <div className="flex flex-col bg-pink-100 shadow-xl p-3 w-full h-full rounded-xl mb-4">
                        <div className="flex flex-col text-xl font-semibold text-blue-400 mb-2">
                            总帖子数量：{postNumber}
                        </div>
                        <div className="flex flex-col text-xl font-semibold text-blue-400 mb-2">
                            总点赞数量：{likeNumber}
                        </div>
                        <div className="flex flex-col text-xl font-semibold text-blue-400 mb-2">
                            总评论数量：{commentNumber}
                        </div>
                    </div>
                    <div className="flex flex-col bg-pink-100 shadow-xl p-3 w-full h-full rounded-xl mb-4">
                        <div className="flex flex-col text-xl font-semibold text-red-300 mb-2">
                            用户帖子数量
                        </div>
                        {userPostCountsEntries.length === 0 &&
                            <div className="text-xl font-semibold text-white">暂无数据</div>}
                        {userPostCountsEntries}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Active;

