import 'dotenv/config.js';
import express from 'express';
import cors from 'cors';
import { authenticationMiddleware } from './middlewares/auth.middleware.js';
import userRouter from './routes/user.routes.js';
import urlRouter from './routes/url.routes.js';

const app = express();
const PORT = process.env.PORT ?? 8000;

app.use(cors()); // Allow frontend
app.use(express.json());

// Public Routes
app.get('/', (req, res) => res.json({ message: "Server is up" }));
app.use('/user', userRouter); 

// Protected Routes
app.use(authenticationMiddleware); 
app.use(urlRouter);

app.listen(PORT, () => {
    console.log(`Server is up and running on PORT ${PORT}`);
});