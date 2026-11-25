const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Job = require("../models/jobModel");

//! Find a job by id and make sure it belongs to the logged-in user.
//! Throws 400 for a bad id, 404 if missing, 403 if it belongs to someone else.
const findOwnedJob = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    throw new Error("Invalid job id");
  }

  const job = await Job.findById(id);

  if (!job) {
    res.status(404);
    throw new Error("Job not found");
  }

  if (job.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("Not authorized to access this job");
  }

  return job;
};

// @desc    Get a single job
// @route   GET /api/jobs/:id
const getJob = asyncHandler(async (req, res) => {
  const job = await findOwnedJob(req, res);
  res.status(200).json(job);
});

// @desc    Get all jobs of the logged-in user
// @route   GET /api/jobs
const getAllJobs = asyncHandler(async (req, res) => {
  const jobs = await Job.find({ user_id: req.user.id });
  res.status(200).json(jobs);
});

// @desc    Create a job
// @route   POST /api/jobs
const createJob = asyncHandler(async (req, res) => {
  const { company, role, location, package: salaryPackage, skills, status } =
    req.body;

  if (!company || !role) {
    res.status(400);
    throw new Error("Company and role are required");
  }

  const job = await Job.create({
    company,
    role,
    location,
    package: salaryPackage,
    skills,
    status,
    user_id: req.user.id,
  });

  res.status(201).json(job);
});

// @desc    Update a job
// @route   PUT /api/jobs/:id
const updateJob = asyncHandler(async (req, res) => {
  await findOwnedJob(req, res);

  // Only allowing these fields to be changed (prevents overwriting user_id etc.)
  const { company, role, location, package: salaryPackage, skills, status } =
    req.body;
  const updates = {
    company,
    role,
    location,
    package: salaryPackage,
    skills,
    status,
  };
  Object.keys(updates).forEach(
    (key) => updates[key] === undefined && delete updates[key]
  );

  const updatedJob = await Job.findByIdAndUpdate(req.params.id, updates, {
    new: true, // returning the updated document, not the old one
    runValidators: true,
  });

  res.status(200).json(updatedJob);
});

// @desc    Delete a job
// @route   DELETE /api/jobs/:id
const deleteJob = asyncHandler(async (req, res) => {
  const job = await findOwnedJob(req, res);
  await job.deleteOne();
  res.status(200).json(job);
});

module.exports = { getJob, getAllJobs, createJob, updateJob, deleteJob };