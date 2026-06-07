const Task = require("../models/Task");
const { protectMiddleware } = require("../middleware/authMiddleware");

// Create task function
exports.createTask = async (req, res, next) => {
  try {
    // 1. Extract ONLY task details from the body (Never accept 'user' from the client!)
    const { title, description, isCompleted } = req.body;

    // 2. Read the system-verified ID from our middleware
    const userId = req.user.id;

    // 3. Validation Checks
    if (!title) {
      return res
        .status(400)
        .json({ success: false, message: "Title is required" });
    }

    // 4. Save to Database (the schema key is 'user')
    const newTask = await Task.create({
      title,
      description,
      isCompleted,
      user: userId, // Maps directly to your schema configuration
    });

    // 5. Send Success Response
    return res.status(201).json({
      success: true,
      message: "Task created successfully",
      task: newTask, // Return the task object so the client can read its new ID
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ============================

// Get all tasks function
exports.getTasks = async (req, res) => {
  try {
    // Query using the correct schema key ('user') and matching middleware value ('req.user.id')
    const tasks = await Task.find({ user: req.user.id });

    return res.status(200).json({
      success: true,
      message: "Tasks fetched successfully",
      tasks,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ============================

// Update task function
exports.updateTask = async (req, res) => {
  try {
    // 1. Locate the task by the URL param ID
    const task = await Task.findById(req.params.id);

    // 2. Validate existence (If no task, send 404)
    if (!task){
      return res.status(404).json({ success: false, message: "Task not found"});
    }

    // 3. Verify Ownership (If string IDs mismatch, send 403)
    if (task.user.toString() !== req.user.id){
      return res.status(403).json({ success: false, message: "Not authorized to update this task"});
    }

    // 4- Update the document (use findByIdAndUpdate or update individual fields)
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    return res.status(200).json({ success: true, message: "Task Updated Successfully!", task: updatedTask});
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message});
  }
  
};

// ============================

// Delete task function
exports.deleteTask = async (req, res) => {
  try{
    // 1. Locate the task by the URL param ID
    const task = await Task.findById(req.params.id);

    // 2. Validate existence (If no task, send 404)
    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found!"});
    }

    // 3. Verify Ownership (If string IDs mismatch, send 403)
    if (task.user.toString() !== req.user.id){
      return res.status(403).json({ success: false, message: "Not authorized to delete this task"})
    }

    // 4. Delete the document (use findByIdAndDelete)
    await Task.findByIdAndDelete(req.params.id);
    // or:
    // await task.deleteOne();
    
    return res.status(200).json({ success: true, message: "Task deleted successfully" })
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}




