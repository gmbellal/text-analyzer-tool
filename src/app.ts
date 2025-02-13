import express from 'express';
import mongoose from 'mongoose';
import { config } from './config';

const app = express();

app.use(express.json());


app.get('/', (req, res) => {
    res.send('GET request to the homepage')
})

// MongoDB Connection
mongoose.set('strictQuery', false);
mongoose.connect(config.mongoUri).then(() => console.log('Connected to MongoDB')).catch(err => console.log('Error connecting to MongoDB:', err));

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
