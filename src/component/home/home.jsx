import './home.css';
// eslint-disable-next-line no-unused-vars
import React, {useEffect, useState} from "react";
import axiosInstance from '/axios.config.js';

function Home() {
    const [message, setMessage] = useState([]);
    const [file, setFile] = useState(null);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    useEffect(() => {
        axiosInstance.get('/user/get_message')
            .then(response => {
                setMessage(response.data)
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handleAvatarSubmit = async (event) => {
        event.preventDefault();

        if (!file) {
            alert('请上传头像');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axiosInstance.post('/file/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            const image_id = response.data;
            console.log('图片上传成功');

            try {
                await axiosInstance.post('/user/update_image', {
                    name: message.name,
                    photo_id: image_id,
                });
                console.log('更换头像成功');
                alert('更换头像成功');
                window.location.reload();
            } catch (error) {
                console.error('Error updating image:', error);
            }
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    const handlePasswordSubmit = async (event) => {
        event.preventDefault();

        if (!oldPassword) {
            alert('请输入旧密码');
            return;
        }

        try {
            const response = await axiosInstance.post('/user/update_secret', {
                name: message.name,
                old_secret: oldPassword,
                new_secret: newPassword,
            });
            if (response.data === false) {
                alert('密码更改失败，请检查旧密码是否正确');
                return;
            }
            console.log('密码更改成功');
            alert('密码更改成功');
            window.location.reload();
        } catch (error) {
            console.error('Error changing password:', error);
            alert('密码更改失败，请检查旧密码是否正确');
        }
    };

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
            <div className={"shell0 content-center justify-center justify-items-center"}>
                <div className={"text-3xl font-semibold text-white title0 mb-4"}>
                    个人信息
                </div>
                <div
                    className="flex flex-col bg-pink-100 items-center shadow-2xl p-4 rounded-xl w-full h-full">
                    <div className="por mb-4">
                        <img src={`http://127.0.0.1:7001/file/show?id=${message.image_id}`}
                             alt="touxiang"/>
                    </div>
                    <div className={"bg-white items-center shadow-2xl p-2 rounded-xl w-fit h-full mb-4 mt-2"}>
                        <div className="text-2xl font-semibold text-blue-300">
                            用户名：{message.name}
                        </div>
                    </div>

                    <form onSubmit={handleAvatarSubmit}>
                        <div className="flex mt-4 mb-4 bg-white items-center p-2 rounded-xl w-full h-full">
                            <input
                                type="file"
                                onChange={handleFileChange}
                            />
                            <input type="submit" value="更换头像" id="avatarBtn"
                                   className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl"}/>
                        </div>
                    </form>

                    <form onSubmit={handlePasswordSubmit}>
                        <input
                            type="password"
                            id="old-password"
                            value={oldPassword}
                            placeholder={"请输入旧密码"}
                            onChange={(e) => setOldPassword(e.target.value)}
                        />

                        <input
                            type="password"
                            id="new-password"
                            value={newPassword}
                            placeholder={"请输入新密码"}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />

                        <input type="submit" value="更改密码" id="passwordBtn"
                               className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl"}/>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Home;

