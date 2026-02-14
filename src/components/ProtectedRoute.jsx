import axios from 'axios'
import { useEffect, useState } from 'react';
import { RotatingTriangles } from 'react-loader-spinner';
import { Navigate } from 'react-router';
import Swal from 'sweetalert2'

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

// children 是指 <AdminLayout />
function ProtectedRoute({children}){
    const [isAuth, setIsAuth] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() =>{
        // 檢查登入狀態
        const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("hexToken="))
        ?.split("=")[1]; // 讀取 Cookie

        // 有取得 Token 才將 Token 設定到 Header 上
        if(token){
            axios.defaults.headers.common['Authorization'] = token;
        }
        
        // 檢查管理員權限
        const checkLogin = async()=>{
            try {
                // eslint-disable-next-line no-unused-vars
                const response = await axios.post(`${API_BASE}/api/user/check`)
                setIsAuth(true);
            } catch (error) {
                Swal.fire({
                    text: `${error.response?.data.message}`,
                    icon: "error"
                });
            } finally {
                setLoading(false);
            }
        };
        checkLogin();
    },[])

    if(loading){
        return <RotatingTriangles />
    }
    if(!isAuth){
        return <Navigate to='/login' />
    }

    return children;
}

export default ProtectedRoute