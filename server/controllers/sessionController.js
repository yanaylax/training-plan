const asyncHandler = require("express-async-handler");

const Session = require("../models/sessionModel");

const getSessions = asyncHandler(async (req, res) => {
  const sessions = await Session.find({ user: req.user.id });
  res.status(200).json(sessions);
});

const addSession = asyncHandler(async (req, res) => {
  if (!req.body.title) {
    res.status(400);
    throw new Error("Please add text");
  } else if (!req.body.description) {
    res.status(400);
    throw new Error("Please add description");
  }
  const session = await Session.create({
    title: req.body.title,
    description: req.body.description,
    index: req.body.index,
    inPlan: false,
    completed: false,
    user: req.user.id,
  });
  res.status(200).json(session);
});

const updateSession = asyncHandler(async (req, res) => {
  const session = await Session.findById(req.params.id);
  if (!session) {
    res.status(400);
    throw new Error("Session not found");
  }

  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  if (session.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedSession = await Session.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedSession);
});

const deleteSession = asyncHandler(async (req, res) => {
  const session = await Session.findById(req.params.id);
  if (!session) {
    res.status(400);
    throw new Error("Session not found");
  }

  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  if (session.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await session.remove();
  res.status(200).json({
    id: req.params.id,
  });
});

const clearTrainingPlan = asyncHandler(async (req, res) => {
  await Session.updateMany({ user: req.user.id }, { $set: { inPlan: false } });
  const sessions = await Session.find({ user: req.user.id });
  res.status(200).json(sessions);
});

module.exports = {
  getSessions,
  addSession,
  deleteSession,
  updateSession,
  clearTrainingPlan,
};
