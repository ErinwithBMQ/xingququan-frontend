import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {
        rollupOptions: {
            input: {
                main: 'index.html',
                login: 'login.html',
                mycomment: 'mycomment.html',
                mylike: 'mylike.html',
                mypost: 'mypost.html',
                others_comment: 'others_comment.html',
                others_like: 'others_like.html',
                register: 'register.html',
                xqq_choose: 'xqq_choose.html',
                xqq_create: 'xqq_create.html'
            }
        }
    }
})
