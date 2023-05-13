const Task = require("../models/Task");

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ tittle: -1 });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

exports.createTask = async (req, res) => {
  try {
    const { tittle, process } = req.body;
    const task = await Task.create({ tittle, process });
    res.status(200).json(task);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

// exports.updateTask = async (req, res) => {
//   try {
//     let task = await Task.findById(req.params.id);
//     if (!task) {
//       res.status(400).json({ message: "Not found task" });
//     }
//     task = await Task.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//       runValidators: true,
//     });
//     //add notification
//     const data = {
//       task: task._id,
//       assigner: req.body.user,
//       supervisor: req.body.supervisor,
//       notifyType: "UpdateTask",
//     };
//     const notification = await createNotification(data);
//     res.status(200).json(await getNotification(notification));
//   } catch (err) {
//     console.log(err);
//     res.status(400).json({ message: err });
//   }
// };

exports.deleteTask = async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);
    if (!task) {
      res.status(400).json({ message: "Not found task" });
    }

    await task.remove();
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

exports.updateProgress = async (req, res) => {
  try {
    const { id, process } = req.body;
    let task = await Task.findById(id);
    if (!task) {
      res.status(400).json({ message: "Not found task" });
    }

    task.process = process;

    await task.save();
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};
