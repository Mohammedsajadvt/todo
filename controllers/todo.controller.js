import Todo from "../models/todo.model.js";
import mongoose from "mongoose";

export const addTodo = async (req, res) => {
  try {
    const { title, time, isToday } = req.body;

    if (!title || !time) {
      return res.status(400).json({
        success: false,
        message: `${!title ? "Title" : "Time"} is required`,
      });
    }

    const newTodo = new Todo({ title, time, isToday });
    const todo = await newTodo.save();

    res.status(201).json({ success: true, data: todo });
  } catch (e) {
    console.error("Error adding todo:", e);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: e.message,
    });
  }
};

export const fetchTodo = async (req, res) => {
  try {
    const todos = await Todo.find({}).lean();
    res.status(200).json({ success: true, data: todos });
  } catch (e) {
    console.error("Error fetching todos:", e);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: e.message,
    });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, time, isToday } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Todo ID is required",
      });
    }

    if (!title || !time) {
      return res.status(400).json({
        success: false,
        message: `${!title ? "Title" : "Time"} is required`,
      });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Todo ID",
      });
    }

    const updatedTodo = await Todo.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedTodo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }

    res.status(200).json({ success: true, data: updatedTodo });
  } catch (e) {
    console.error("Error updating todo:", e);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: e.message,
    });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Todo ID is required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Todo ID",
      });
    }

    const deletedTodo = await Todo.findByIdAndDelete(id).lean();

    if (!deletedTodo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Todo deleted successfully",
      data: deletedTodo,
    });
  } catch (e) {
    console.error("Error deleting todo:", e);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: e.message,
    });
  }
};