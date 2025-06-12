import express from "express"
import "dotenv/config"
import cors from "cors"
import http from "http"
import { mongo } from "mongoose";
import { connectDB } from "./lib/db.js";
import userRouter from "./routes/userRoutes.js";
import messageRouter from "./routes/messageRoutes.js";
import { Server } from "socket.io";

//Create Express app and HTTP servers
const app = express();
const server = http.createServer(app)

//Initialise socket.io server
export const io= new Server(server,{
    cors: {origin: "*"}
})

//store online users
export const userSocketMap = {}; //{userId : socketId}

// Socket.io connection handler
io.on("connection", (socket)=>{
    const userId= socket.handshake.query.userId;
    console.log("User Connected", userId);

    if(userId) userSocketMap[userId]= socket.id;

    //Emit online users to all connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnected",()=>{
        console.log("User disconnected", userId);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap))
    })
})

//Middleware setup
app.use(express.json({limit:"4mb"}));
app.use(cors());

//Route Setup
app.use("/api/status", (req,res)=>res.send("server is live"));
app.use("/api/auth",userRouter);
app.use("/api/messages",messageRouter);

//connect to mongodb
await connectDB();

//start server
const PORT =process.env.PORT || 3000;
server.listen(PORT, ()=>console.log("Server is running on PORT: "+ PORT));