import mongoose from "mongoose";

const jobSchema = mongoose.Schema(
    {
        jobId: String,
        jobName: String,
        jobDescription: {
            description: String,
            salary: String,
            skillsAndExperience: String,
            reasonToWorkHere: String,
        },
    },
    { timestamps: true }
);

const jobModel = mongoose.model('Job', jobSchema);
export { jobModel };
