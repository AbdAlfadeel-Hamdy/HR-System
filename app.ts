// Import necessary libraries and modules
import 'express-async-errors';
import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();
import morgan from 'morgan';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { v2 as cloudinary } from 'cloudinary';

// Routers
import employeeRouter from './routes/employeeRouter.js';
import vacationRouter from './routes/vacationRouter.js';
import cancelledRouter from './routes/cancelledRouter.js';
import authRouter from './routes/authRouter.js';

// Public
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

// Middlewares
import errorHandlerMiddleware from './middlewares/errorHandlerMiddleware.js';
import { authenticateUser } from './middlewares/authMiddleware.js';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Resolve the current directory
const __dirname = dirname(fileURLToPath(import.meta.url));

// Enable logging in development environment
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// Serve static files from the 'client/dist' directory
app.use(express.static(path.resolve(__dirname, './../client/dist')));

// Set up middleware for parsing JSON and cookies
app.use(express.json());
app.use(cookieParser());

// Define routes for various modules
app.use('/api/v1/auth', authRouter);
app.use(authenticateUser as any);
app.use('/api/v1/employees', employeeRouter);
app.use('/api/v1/vacations', vacationRouter);
app.use('/api/v1/cancelled', cancelledRouter);

// Serve the main HTML file for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './../client/dist', 'index.html'));
});

// Handle 404 errors
app.use('*', (req, res, next) => {
  res.status(404).json({ message: 'Route not found.' });
});

// Error handling middleware
app.use(errorHandlerMiddleware);

// Set up port and check for MongoDB URL
const port = process.env.PORT || 5100;

if (!process.env.MONGO_URL) {
  console.log('MongoDB URL is not valid.');
  process.exit(1);
}

// Connect to MongoDB and start the server
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server started listening on port ${port}...`);
    });
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
