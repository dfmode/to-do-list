import express from "express";
import c from "../controllers/controllers.js";

const userRouter = express.Router();
const taskRouter = express.Router();

userRouter.post("/register", c.register);
userRouter.post("/login", c.login);
userRouter.post("/logout", c.logout);

taskRouter.get("/task", c.getAllTasks);
taskRouter.post("/task", c.postTask);
taskRouter.patch("/task/:id", c.patchTask);
taskRouter.delete("/task/:id", c.deleteTask);

export default {userRouter, taskRouter};
