// server/src/app.ts
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { createServer } from 'http';                       // ← NEW
import { initSocket } from './socket/socket';              // ← NEW
import connectToMongoDB from './config/db';

import messageRoutes from './routes/messageRoutes';
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';

dotenv.config();

const app  = express();
const httpServer = createServer(app);                      // ← NEW
initSocket(httpServer);                                    // ← NEW

const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
};


app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use('/api/messages', messageRoutes);
app.use('/api/users',    userRoutes);
app.use('/api/auth',     authRoutes);

app.get('/', (_, res) => res.send('Server is running!'));

/*  OLD  ➜  app.listen(PORT, ...)
 *  NEW  ➜  httpServer listens (so Socket.IO can hook in) */
httpServer.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server running on port ${PORT}`);
});