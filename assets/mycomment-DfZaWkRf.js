import{r as l,j as e,c,a as o}from"./index-D0tWTQow.js";import{a as r}from"./axios.config-BNfgfF5-.js";function a(){const[s,i]=l.useState([]);return l.useEffect(()=>{r.get("/user/get_name").then(t=>{const n=t.data.username;return console.log(n),r.get("/user/get_user_comment",{params:{name:n}})}).then(t=>{i(t.data)}).catch(t=>{console.error("Error fetching data:",t)})},[]),e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"fixed",children:e.jsx("button",{className:"fixed top-20 left-10 w-fit shadow-2xl p-4 rounded-xl cursor-pointer hover:bg-gray-100 mb-40",onClick:()=>window.location.href="/xqq_choose.html",children:e.jsx("span",{className:"text-xl font-semibold text-blue-200",children:"返回"})})}),e.jsx("div",{className:"shell0",children:e.jsxs("div",{className:"flex flex-col bg-pink-100 items-center shadow-2xl p-4 rounded-xl w-full h-full",children:[e.jsx("div",{className:"text-3xl font-semibold text-white title0",children:"我的评论"}),e.jsx("div",{children:s.length===0&&e.jsx("div",{className:"text-xl font-semibold text-white mt-4",children:"暂无评论"})}),e.jsx("div",{children:s.map(t=>e.jsxs("div",{className:"bg-blue-100 p-5 rounded-xl shadow-xl m-8 mywidth",children:[e.jsxs("div",{className:"flex content-center justify-between mb-4",children:[e.jsx("button",{className:"flex flex-col bg-white p-2 rounded-xl shadow-xl cursor-pointer w-fit justify-center content-center hover:bg-gray-100",onClick:()=>window.location.href=`/post/${t.post_id}`,children:e.jsx("div",{className:"text-lg font-semibold text-blue-300 whitespace-normal break-words  justify-center content-center",children:"原贴"})}),e.jsx("div",{className:"flex content-center justify-center",children:e.jsxs("div",{className:"text-lg font-semibold text-blue-400 mb-4",children:["评论时间：",t.time]})})]}),e.jsx("div",{className:"flex mt-2 bg-red-50 p-2 rounded-xl shadow-lg justify-between",children:e.jsxs("div",{className:"text-lg font-semibold text-blue-300 whitespace-normal break-words  justify-center content-center",children:["评论内容：",t.message]})})]},t.id))})]})})]})}c.createRoot(document.getElementById("root")).render(e.jsx(o.StrictMode,{children:e.jsx("div",{className:"content-center justify-center items-center",children:e.jsx(a,{})})}));
