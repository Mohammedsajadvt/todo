import express from "express";
import {
  addTodo,
  fetchTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todo.controller.js";

const router = express.Router();

router.route("/").post(addTodo).get(fetchTodo);
router.route("/:id").put(updateTodo).delete(deleteTodo);

export default router;
