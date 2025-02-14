import express from 'express';
import mongoose from 'mongoose';
import { config } from './config';
import { userRoutes } from './routes/userRoutes';
import { authRoutes } from './routes/authRoutes';
import { textRoutes } from './routes/textRoutes';
import { authMiddleware } from './middlewares/authMiddleware';
import { throttlingMiddleware } from './middlewares/throttlingMiddleware';

const app = express();

app.use(express.json());

// Default route for test purpose
app.get('/', (req, res) => {
    res.send('GET request to the homepage')
})

// Routes
app.use('/api/user', throttlingMiddleware, userRoutes);  // Routes for the user APIs
app.use('/api/auth', throttlingMiddleware, authRoutes);  // Routes for the auth APIs
app.use('/api/texts', authMiddleware, throttlingMiddleware, textRoutes);  // Routes for the text APIs :: Protected by authMiddleware


// Extend the Request interface to include the user object
declare module "express-serve-static-core" {
  interface Request {
    user?: any
  }
}


// Export the app object
export { app };

// MongoDB Connection
mongoose.set('strictQuery', false);
mongoose.connect(config.mongoUri).then(() => console.log('Connected to MongoDB')).catch(err => console.log('Error connecting to MongoDB:', err));

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});


