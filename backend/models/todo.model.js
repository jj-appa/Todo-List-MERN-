import mongoose from "mongoose";
//Schema/ Model for Todo items

const todoSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Todo = mongoose.model("Todo", todoSchema);

export default Todo;
