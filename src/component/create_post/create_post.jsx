import './create_post.css';
import {useEffect, useState} from 'react';
import axiosInstance from '/axios.config.js';
import {useParams} from 'react-router-dom';

function CreatePost() {
    const {id} = useParams(); // 获取动态参数id
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [file, setFile] = useState(null);
    const [currentTime, setCurrentTime] = useState(new Date());

    const xqq_id = parseInt(id, 10);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

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

        if (!title || !message) {
            alert('请填写完整的内容');
            return;
        }


        const formData = new FormData();
        if (file) {
            formData.append('file', file);
        }

        let image_id = 0;

        try {
            if (file) {
                const response = await axiosInstance.post('/file/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                image_id = response.data;
                console.log('图片上传成功');
            } else {
                image_id = 0;
            }
        } catch (error) {
            console.error('Error:', error);
        }

        let poster_name = '0';
        try {
            const response = await axiosInstance.get('user/get_name'); // 注意这里使用的是相对路径
            console.log('名字获取成功', response.data);
            poster_name = response.data.username;
        } catch (error) {
            console.error('Error:', error);
        }

        console.log(poster_name,
            message,
            xqq_id,
            image_id,
            title,
            formattedTime);

        try {
            const response = await axiosInstance.post('/post/create', {
                poster_name: poster_name,
                message: message,
                xqq_id: xqq_id,
                image_id: image_id,
                title: title,
                time: formattedTime,
                like_number: 0,
                comment_number: 0,
            });
            console.log(response.data);
            alert('帖子发布成功!');
            window.location.href = `/xqq/${id}`;

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className={"flex flex-col justify-center items-center h-screen"}>
            <button
                className="fixed top-20 left-10 w-1/6 shadow-2xl p-4 rounded-xl cursor-pointer hover:bg-gray-100 mb-40"
                onClick={() => (window.location.href = `/xqq/${id}`)}
            >
                <span className="text-xl font-semibold text-blue-200">返回</span>
            </button>
            <div className="shell">
                <h1 className="title">发表帖子</h1>
                <form className="form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="帖子标题"
                    />
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="帖子内容"
                        className={"textarea"}
                    />
                    <div className="flex">
                        <input
                            type="file"
                            onChange={handleFileChange}
                            className="pb-4"
                        />
                        <div className="text-xl font-semibold text-blue-300">上传帖子图片（可不上传）</div>
                    </div>
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

export default CreatePost;
