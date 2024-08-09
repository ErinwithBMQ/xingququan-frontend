// eslint-disable-next-line no-unused-vars
import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import InterestCirclePage from './InterestCirclePage/InterestCirclePage.jsx';
import App from './app/App.jsx';
import CreatePost from "./create_post/create_post.jsx";
import ShowPost from "./post/post.jsx";
import ShowPost2 from "./post/post2.jsx";
import CreateComment from "./Comment/Comment.jsx";
import Active from "./active/active.jsx";
import Home from "./home/home.jsx";

function XqqMain() {
    return (
        <Router>
            <Routes>
                <Route path="/xqq/:id" element={<InterestCirclePage/>}/>
                <Route path="/" element={<App/>}/>
                <Route path="/xqq/:id/post" element={<CreatePost/>}/>
                <Route path="/post/:id" element={<ShowPost/>}/>
                <Route path="/post2/:id" element={<ShowPost2/>}/>
                <Route path="/post/:id/comment" element={<CreateComment/>}/>
                <Route path="/xqq/:id/active" element={<Active/>}/>
                <Route path="/home" element={<Home/>}/>
            </Routes>
        </Router>
    );
}

export default XqqMain;
