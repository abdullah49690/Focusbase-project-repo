
const express = require("express");
const router = express.Router();
const { createTask, getTasks, updateTask, deleteTask } = require("../controllers/taskController");
const { protectMiddleware } = require('../middleware/authMiddleware');
const { validateTask } = require('../middleware/validateMiddleware')

// Route configuration:
router.route('/')
    .post(protectMiddleware, validateTask, createTask)
    .get(protectMiddleware, getTasks);

// Dynamic route for individual tasks (using :id)
router.route('/:id')
    .put(protectMiddleware, updateTask)
    .patch(protectMiddleware, updateTask)
    .delete(protectMiddleware, deleteTask);



module.exports = router;

