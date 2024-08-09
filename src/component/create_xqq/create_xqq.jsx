import './create_xqq.css';
import {useState} from 'react';
import axiosInstance from '/axios.config.js';

function CreateXqq() {
    const [xqq_name, setXqq_name] = useState('');
    const [introduction, setIntroduction] = useState('');
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('handleSubmit called'); // 调试日志

        if (!xqq_name || !introduction) {
            alert('请填写完整的信息');
            return;
        }

        if (!file) {
            alert('请上传头像');
            return;
        }

        const formData = new FormData();
        if (file) {
            formData.append('file', file);
        }

        let image_id = 0;

        try {
            const response = await axiosInstance.post('/file/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            image_id = response.data;
            console.log('图片上传成功');
        } catch (error) {
            console.error('Error:', error);
        }

        let creator = '0';
        try {
            const response = await axiosInstance.get('user/get_name'); // 注意这里使用的是相对路径
            console.log('名字获取成功', response.data);
            creator = response.data.username;
        } catch (error) {
            console.error('Error:', error);
        }

        console.log(xqq_name, introduction);

        let active_people = 1;

        try {
            const response = await axiosInstance.post('/xqq/create', {
                xqq_name,
                introduction,
                creator,
                active_people,
                image_id,
                post_number: 0,
            });
            console.log(response.data);
            alert('创建成功!');
            window.location.href = "/xqq_choose.html";
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <div className="shell">
                <h1 className="title">创建兴趣圈</h1>
                <form className="form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={xqq_name}
                        onChange={(e) => setXqq_name(e.target.value)}
                        placeholder="兴趣圈名称"
                    />
                    <textarea
                        value={introduction}
                        onChange={(e) => setIntroduction(e.target.value)}
                        placeholder="兴趣圈简介"
                    />
                    <div className="flex">
                        <input
                            type="file"
                            onChange={handleFileChange}
                            className="pb-4"
                        />
                        <div className="text-xl font-semibold text-purple-400">上传兴趣圈头像</div>
                    </div>
                    <button
                        type="submit"
                        className="flex items-center justify-center shadow-xl p-4 rounded-xl cursor-pointer hover:bg-gray-100 w-full"
                    >
                        <span className="text-xl font-semibold text-blue-200">创建</span>
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CreateXqq;
