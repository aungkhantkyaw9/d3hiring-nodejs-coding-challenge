"use strict";

const express = require("express");
const router = express.Router();
const administrativeService = require("../services/administrativeService");

router.post("/register", async (req, res) => {
  const teacherEmail = req.body.teacher ? req.body.teacher : null;
  const studentEmail = req.body.students ? req.body.students : null;

  const result = await administrativeService.register(teacherEmail, studentEmail);

  res.json(result);
});

router.get("/commonstudents", async (req, res) => {
  const teacherEmail = req.query.teacher ? req.query.teacher : null;

  const result = await administrativeService.commonStudents(teacherEmail);
  
  res.json(result);
});

router.post("/suspend", async (req, res) => {
  const studentEmail = req.body.student ? req.body.student : null;

  const result = await administrativeService.suspend(studentEmail);

  res.json(result);
});

router.post("/retrievefornotifications", async (req, res) => {
  const teacherEmail = req.body.teacher ? req.body.teacher : null;
  const notification = req.body.notification ? req.body.notification : null;

  const result = await administrativeService.retrieveForNotifications(teacherEmail, notification);
  
  res.json(result);
});

module.exports = router;
