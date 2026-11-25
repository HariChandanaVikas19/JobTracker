let express = require("express");
const { getJob, getAllJobs, createJob, updateJob, deleteJob } = require("../controllers/jobController");
const validateToken = require("../middleware/TokenValidator");
let router = express.Router();
router.use(validateToken);
//! GET single job
router.route("/:id").get(getJob);
//! GET all jobs
router.route("/").get(getAllJobs);
//! POST the job 
router.route("/").post(createJob);
//! EDIT the job
router.route("/:id").put(updateJob);
//! DELETE the job
router.route("/:id").delete(deleteJob);
module.exports = router;
