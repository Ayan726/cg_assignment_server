const Task = require("../models/TaskSchema");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const createTask = async (req, res) => {
  const { title, description } = req.body;
  const task = await Task.create({ title, description });
  res.status(StatusCodes.OK).json({
    error: false,
    data: { task },
  });
};
const readAllTasks = async (req, res) => {
  const tasks = await Task.find({});
  res.status(StatusCodes.OK).json({
    error: false,
    data: { tasks },
  });
};
const readTask = async (req, res) => {
  const { id: taskId } = req.params;
  if (!taskId) {
    throw new BadRequestError("id not provided!!");
  }
  console.log(req.params);
  const task = await Task.findOne({ _id: taskId });
  if (!task) {
    throw new NotFoundError("task not found!!");
  }
  res.status(StatusCodes.OK).json({
    error: false,
    data: { task },
  });
};
const updateTask = async (req, res) => {
  const { id: taskId } = req.params;
  const { title, description } = req.body;
  if (!title || !description) {
    throw new BadRequestError("please provide title & description!!");
  }
  if (!taskId) {
    throw new BadRequestError("id not provided!!");
  }
  const task = await Task.findOneAndUpdate(
    { _id: taskId },
    { title, description },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!task) {
    throw new NotFoundError("task not found!!");
  }

  res.status(StatusCodes.OK).json({
    error: false,
    data: { task },
  });
};
const deleteTask = async (req, res) => {
  const { id: taskId } = req.params;
  if (!taskId) {
    throw new BadRequestError("id not provided!!");
  }
  const task = await Task.findOneAndDelete({ _id: taskId });
  if (!task) {
    throw new NotFoundError("task not found!!");
  }
  res.status(StatusCodes.OK).json({
    error: false,
    data: { task },
  });
};

module.exports = {
  createTask,
  readTask,
  readAllTasks,
  updateTask,
  deleteTask,
};
