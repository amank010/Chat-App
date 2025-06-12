import axios from "axios";
import { createContext, use, useEffect, useState } from "react";
import toast from "react-hot-toast";


const backendUrl = import.meta.env.VITE_BACKEND_URL;
axios.defaults.baseURL = backendUrl;

export const authContext = createContext();

export const AuthProvider=({children})=>{

    const [token, setToken] =useState(localStorage.getItem("token"));
    const [authUser, setAuthUser] =useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [socket,setSocket] =useState(null);

    //check if user is authenticated and if so then set user data and connect the socket
    const checkAuth =async()=>{
        try {
            const {data} =await axios.get("/api/auth/check");

            if(data.success){
                setAuthUser(data.user)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    //connect socket function to handle socket connection and online users updates
    




    useEffect(()=>{
        if(token){
            axios.defaults.headers.common["token"] = token;
        }
        checkAuth;
    },[])

    const value ={
        axios,
        authUser,
        onlineUsers,
        socket
    }

    return (
        <authContext.Provider value={value}>
            {children}

        </authContext.Provider>
    )
}