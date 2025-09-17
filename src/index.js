import dotenv from 'dotenv';
dotenv.config({
    path: './.env'
})

import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import authRoutes from '../routes/auth.route.js';
import healthRouters from '../routes/health.route.js';
import fileRoutes from '../routes/file.route.js';

const app = express();
const PORT = process.env.PORT || 3000;

//middleware add 
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_DB_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log('MongoDB Error:', err));


//routes
app.use("/api/auth", authRoutes);
app.use("/api/health", healthRouters);
app.use("/api/files", fileRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'API is running!' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});