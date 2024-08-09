import './register.css';
import {useState} from 'react';
import axios from 'axios';
import axiosInstance from "../../../axios.config.js";

function Register() {

    const [name, setName] = useState('');
    const [secret, setSecret] = useState('');
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!name || !secret) {
            alert('用户名和密码不得为空！');
            return;
        }

        if (!file) {
            alert('请上传头像');
            return;
        }

        try {
            const response = await axios.get('http://127.0.0.1:7001/user/find_user', {
                params: {
                    name,
                },
            });

            console.log("检测是否有用户");

            if (response.data !== false) {
                console.log(response.data, "用户已存在");
                alert('用户已存在。请更换用户名。');
                return;
            }

        } catch (error) {
            console.error(error);
            alert('创建失败。出现问题。');
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

        try {
            const response = await axios.post('http://127.0.0.1:7001/user/create_user', {
                name,
                secret,
                photo_id: image_id,
            });
            console.log(response.data.name, "用户成功创建");
            alert('你已经成功创建用户!');
            window.location.href = "/login.html";
        } catch (error) {
            console.error(error);
            alert('创建失败。');
        }
    };

    return (
        <div>
            <div className="shell">
                <form onSubmit={handleSubmit}>
                    <h2 className="title">Register</h2>

                    <input
                        type="text"
                        id="username"
                        placeholder="Username"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <input
                        type="password"
                        id="password"
                        placeholder="Password"
                        value={secret}
                        onChange={(e) => setSecret(e.target.value)}
                    />

                    <div className="flex mt-4">
                        <input
                            type="file"
                            onChange={handleFileChange}
                            className="pb-4"
                        />
                        <div className="text-xl font-semibold text-purple-400">上传头像</div>
                    </div>

                    <input type="submit" value="Register" id="registerBtn"/>
                </form>
                <div className="footer">
                    <div className="Remember"></div>
                    <button id="Password" onClick={() => (window.location.href = "/login.html")}>
                        去登录
                    </button>
                </div>
            </div>


        </div>
    );
}

export default Register;


