import './login.css'
import {useState} from "react";
import axios from "axios";

function Login() {
    const [name, setName] = useState('');
    const [secret, setSecret] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!name || !secret) {
            alert('用户名和密码不得为空！');
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
                console.log(response.data, "检测到用户信息");
                const response2 = await axios.post('http://127.0.0.1:7001/user/secret', {
                    name,
                    secret,
                });
                if (response2.data !== false) {
                    alert('你已经成功登录!');
                    console.log(response2.data);
                    localStorage.setItem('token', response2.data.token);
                    window.location.href = "/xqq_choose.html";
                } else {
                    console.log("密码错误");
                    alert('密码错误。');
                }

            } else {
                console.log("未检测到用户信息");
                alert('用户不存在。请先注册。');
            }

        } catch (error) {
            console.error(error);
            alert('登录失败。出现问题。');
        }
    };

    return (
        <div>
            <div className="shell">
                <form onSubmit={handleSubmit}>
                    <h2 className="title"> Login</h2>

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

                    <input type="submit" value="Login" id="registerBtn"/>
                </form>
                <div className="footer">
                    <div className="Remember">
                    </div>
                    <button id="Password" onClick={() => (window.location.href = "/register.html")}>
                        去注册
                    </button>
                </div>
            </div>


        </div>
    )
}

export default Login;
