import mongoose, { Schema } from "mongoose";

const todoListSchema: Schema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required.']
    },
    tasks: [{
        type: Schema.Types.ObjectId,
        ref: 'Task',
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'TodoList requires an User.']
}
}, { timestamps: true });

const TodoListModel = mongoose.model('TodoList', todoListSchema);

export { TodoListModel };