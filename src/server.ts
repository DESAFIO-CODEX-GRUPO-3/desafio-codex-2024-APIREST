import express from 'express';
import mongoose from "mongoose";
import { routes } from './routes';
import cors from 'cors';

mongoose.connect('mongodb+srv://dhouglasbn:B5MY7pSLioF8u2PE@cluster-grupo3.1bxpdp3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-grupo3');

const PORT: number = 3333;
const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));