const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    user_id:{
      type : mongoose.Schema.Types.ObjectId,
      required : true,
      ref : "User"
    },
    company: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
    },
    role: {
      type: String,
      required: [true, "Role is required"],
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
     package: {
      type: String,
      trim: true,
    },
    skills:{
      type:Array
    },
    status: {
      type: String,
      enum: ["Applied", "Interview", "Offer", "Rejected"],
      default: "Applied",
    },
  },
  { timestamps: true } 
);

module.exports = mongoose.model("Job", jobSchema);