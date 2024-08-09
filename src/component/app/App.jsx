import './App.css';

function App() {

    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <div className="mb-16">
                <h1 className="text-6xl font-bold text-white">欢迎来到兴趣圈!</h1>
            </div>
            <div className="flex flex-col space-y-4">
                <button
                    className="flex items-center justify-center shadow-2xl p-4 rounded-xl cursor-pointer hover:bg-gray-100"
                    onClick={() => (window.location.href = "/login.html")}
                >
                    <span className="text-xl font-semibold text-blue-200">立即注册/登录</span>
                </button>

                <button
                    className="flex items-center justify-center shadow-2xl p-4 rounded-xl cursor-pointer hover:bg-gray-100"
                    onClick={() => (window.location.href = "/xqq_choose.html")}
                >
                    <span className="text-xl font-semibold text-blue-200">进入兴趣圈</span>
                </button>

            </div>
        </div>
    );
}

export default App;


