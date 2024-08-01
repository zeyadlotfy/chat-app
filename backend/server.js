import express from 'express';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';

import authRouter from './routes/auth.routes.js'
import messageRouter from './routes/message.routes.js'
import userRouter from './routes/user.routes.js'

import connectToDB from './db/connectToDB.js';
import { app, server } from './socket/socket.js';


const PORT = process.env.PORT || 5000

dotenv.config()
app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRouter)
app.use('/api/messages', messageRouter)
app.use('/api/users', userRouter)

server.listen(PORT, () => {
    connectToDB()
    console.log(`server running on ${PORT}`)
})