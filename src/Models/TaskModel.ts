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
    user: {
            type: Schema.Types.ObjectId, ref: 'User'
    }
});

const TaskModel = mongoose.model('Task', taskSchema);

export { TaskModel };