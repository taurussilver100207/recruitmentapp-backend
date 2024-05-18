import mongoose from "mongoose";

const jobSchema = mongoose.Schema(
    {
        jobCode: {
            type: String,
            required: true
        },
        jobName: {
            type: String,
            required: true
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
