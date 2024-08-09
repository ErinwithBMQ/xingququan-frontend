import {useEffect} from 'react';
import axiosInstance from '/axios.config.js'

const UserLogin = () => {
    useEffect(() => {
        const fetchProtectedData = async () => {
            try {
                const response = await axiosInstance.get('user/get_name'); // 注意这里使用的是相对路径
                console.log('身份校验成功');
                console.log(response.data);
                return response.data;
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchProtectedData();
    }, []);

    return (
        <div>

        </div>
    );
};

export default UserLogin;
