import express, { Request, Response } from 'express';
import mongoose, { Model, Schema } from 'mongoose';

mongoose.connect('mongodb+srv://dhouglasbn:B5MY7pSLioF8u2PE@cluster-grupo3.1bxpdp3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-grupo3');

const app = express();
app.use(express.json());

const userSchema: Schema = new mongoose.Schema({
    fullName: String,
    gender: String,
    age: Number,
    email: String,
    password: String
});
const User = mongoose.model('User', userSchema);



app.listen(3333, () => console.log("Server listening on port 3333!"));

app.post('/user', async (request: Request, response: Response) => {
    const { fullName, gender, age, email, password } = request.body;

    try {
        const user = new User({
            fullName: fullName,
            gender: gender,
            age: age,
            email: email,
            password: password
        });

        await user.save();

        console.log("Usuário cadastrado:", user);

        return response.status(200).json(user.toJSON());
    } catch (error) {
        console.error("Erro ao cadastrar usuário:", error);
        return response.status(500).json({ error: "Erro ao cadastrar usuário" });
    }
});
