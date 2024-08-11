import './Comment.css';
import {useEffect, useState} from 'react';
import axiosInstance from '/axios.config.js';
import {useParams} from 'react-router-dom';

function CreateComment() {
    const {id} = useParams(); // 获取动态参数id
    const [message, setMessage] = useState('');
    const [currentTime, setCurrentTime] = useState(new Date());

    const post_id = parseInt(id, 10);


    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000); // 每秒更新一次

        return () => {
            clearInterval(timer); // 清除定时器，避免内存泄漏
        };
    }, []);

    const formattedTime = currentTime.toLocaleString();

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('handleSubmit called'); // 调试日志

        if (!message) {
            alert('请填写完整的内容');
            return;
        }


        let creator = '0';
        try {
            const response = await axiosInstance.get('user/get_name'); // 注意这里使用的是相对路径
            console.log('名字获取成功', response.data);
            creator = response.data.username;
        } catch (error) {
            console.error('Error:', error);
        }


        try {
            const response = await axiosInstance.post('/post/comment', {
                creator: creator,
                message: message,
                post_id: post_id,
                time: formattedTime,
            });
            console.log(response.data);
            alert('评论成功!');
            window.location.href = `/post2/${post_id}`;
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className={"flex flex-col justify-center items-center h-screen"}>
            <button
                className="fixed top-20 left-10 w-1/6 shadow-2xl p-4 rounded-xl cursor-pointer hover:bg-gray-100 mb-40"
                onClick={() => (window.location.href = `/post2/${post_id}`)}
            >
                <span className="text-xl font-semibold text-blue-200">返回</span>
            </button>
            <div className="shell">
                <h1 className="title mb-4">发表评论</h1>
                <form className="form" onSubmit={handleSubmit}>
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="评论内容"
                        className={"mb-4 textarea_now"}
                    />
                    <button
                        type="submit"
                        className="flex items-center justify-center shadow-xl p-4 rounded-xl cursor-pointer hover:bg-gray-100 w-full"
                    >
                        <span className="text-xl font-semibold text-blue-200">发表</span>
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CreateComment;
