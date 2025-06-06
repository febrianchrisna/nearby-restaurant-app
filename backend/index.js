import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import routes from './routes/routes.js';
import { syncDatabase } from './config/database.js';
import './models/associations.js';

dotenv.config();

const app = express();

// Configure CORS for credentials
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:8080',
    'exp://'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(cookieParser());
app.use(express.json());
app.use(routes);

// Sync database before starting server
syncDatabase().then(() => {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Restaurant Finder API running on port ${PORT}`));
});