const express = require("express");
const router = express.Router();
const ToDo = require("../models/ToDo");
const requiresAuth = require("../middleware/permissions");
const validateTodoInput = require("../validation/todoValidation");

// @route Get/api/todos

router.get("/test", (req, res) => {
  res.send("Todo Route");
});

router.post("/new", requiresAuth, async (req, res) => {
  try {
    const { isValid, errors } = validateTodoInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newToDo = new ToDo({
      user: req.user._id,
      content: req.body.content,
      complete: false,
    });
    await newToDo.save();

    return res.json(newToDo);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
});

router.get("/current", requiresAuth, async (req, res) => {
  try {
    const toDos = await ToDo.find({
      user: req.user._id,
    });

    return res.json({ toDos: toDos });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
});

router.put("/:toDoId", requiresAuth, async (req, res) => {
  try {
    const toDo = await ToDo.findOne({
      user: req.user._id,
      _id: req.params.toDoId,
    });

    if (!toDo) {
      return res.status(404).json({ error: "item not found" });
    }

    const { isValid, errors } = validateTodoInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const updatedToDo = await ToDo.findOneAndUpdate(
      {
        user: req.user._id,
        _id: req.params.toDoId,
      },
      {
        content: req.body.content,
      },
      {
        new: true,
      }
    );

    return res.json(updatedToDo);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
});

router.delete("/:toDoId", requiresAuth, async (req, res) => {
  try {
    const toDo = await ToDo.findOne({
      user: req.user._id,
      _id: req.params.toDoId,
    });

    if (!toDo) {
      return res.status(404).json({ error: "item not found" });
    }

    await ToDo.findOneAndRemove({
      user: req.user._id,
      _id: req.params.toDoId,
    });

    return res.json({ success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
});

module.exports = router;
