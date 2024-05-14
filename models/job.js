import mongoose from "mongoose";

const jobDescriptionSchema = new mongoose.Schema({
    description: String,
    salary: String,
    skillsAndExperience: String,
    reasonToWorkHere: String,
}, { _id: false });

const jobSchema = new mongoose.Schema(
    {
        jobId: {
            type: String,
            required: true,
        },
        jobName: {
            type: String,
            required: true,
        },
        jobDescription: jobDescriptionSchema,
    },
    { timestamps: true }
);

const jobModel = mongoose.model('Job', jobSchema);
export { jobModel };
