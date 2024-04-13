import mongoose, { Schema } from "mongoose";

const taskSchema: Schema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'title required.']
    },
    day: {
        type: Date,
        required: [true, 'gender required.']
    },
    finished: {
        type: Boolean,
        required: true
    },
    todoList: {
        type: Schema.Types.ObjectId,
        ref: 'TodoList',
        required: [true, 'Task requires a TodoList.']
    }
}, { timestamps: true });

const TaskModel = mongoose.model('Task', taskSchema);

export { TaskModel };