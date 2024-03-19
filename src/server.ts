import express from 'express';
import mongoose from "mongoose";
import { routes } from './routes';
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(String(process.env.DATABASE_URL));


const PORT: number = process.env.PORT ? Number(process.env.PORT) : 3333;
const app = express();

app.use(express.json());
app.use(routes);

app.listen({
    host: '0.0.0.0',
    port: PORT
}, () => console.log(`Server listening on port ${PORT}!`));