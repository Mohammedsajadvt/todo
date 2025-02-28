import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    uppercase: true,
  },
  time: {
    type: String,
    required: true,
  },
  isToday: {
    type: Boolean,
    default: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Todo = mongoose.model('Todo', todoSchema);

export default Todo;
