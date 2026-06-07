import express from 'express';
import dotenv from 'dotenv';
import eventRoutes from './routes/eventRoutes';
import userRoutes from './routes/userRoutes';
import eventsEnrolledRoutes from './routes/eventsEnrolledRoutes';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Swagger definition
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Volunteer Management System API',
        version: '1.0.0',
        description: 'This is the API documentation for the Volunteer Management System.',
    },
    servers: [
        {
            url: '/api',
        },
    ],
};

// Options for swagger-jsdoc
const options = {
    swaggerDefinition,
    apis: ['./src/routes/*.ts'],
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api', eventRoutes); // Event routes
app.use('/api', userRoutes); // User routes
app.use('/api', eventsEnrolledRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
