import mongoose, { Schema } from "mongoose";

const userSchema: Schema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'fullName required.']
    },
    gender: {
        type: String,
        enum: {
            values: ['M', 'M'],
            message: '{VALUE} is not supported [M|F].'
          },
        required: [true, 'gender required.']
    },
    age: {
        type: Number,
        min: 0,
        required: [true, 'age required.']
    },
    email: {
        type: String,
        required: [true, 'email required.'],
        validate: {
            validator: function(v: string) {
              // Expressão regular para validar o formato do e-mail
              return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
            },
            message: (
                props: { value: String }
            ) => `${props.value} is not a valid email.`
          }
    },
    password: {
        type: String,
        required: [true, 'password required.'],
        validate: {
            validator: (v: String) => { return v.length >= 6 },
            message: () => 'password must have at least 6 characters.'
        }
    },
    todoLists: [
        {
            type: Schema.Types.ObjectId, ref: 'TodoList'
        }
    ]
});

const UserModel = mongoose.model('User', userSchema);

export { UserModel };