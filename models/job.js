import mongoose from "mongoose";

const jobSchema = mongoose.Schema(
    {
        jobId: {
            type: String,
            require: true,
        },
        jobName: {
            type: String,
            require: true,
        },
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
