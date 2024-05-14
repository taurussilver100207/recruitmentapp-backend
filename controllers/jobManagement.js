import { jobModel } from "../models/job.js";

// CREATE JOB
export const createJob = async (req, res, next) => {
    try {
        const { jobId, jobName, jobDescription } = req.body;

        if (!jobId || !jobName || !jobDescription) {
            return res.status(400).json({ error: "jobId, jobName or jobDescription is required." });
        }

        const existingJobs = await jobModel.find({ jobName });

        if (existingJobs.length > 0) {
            return res.status(409).json({ message: "Job name already exists" });
        }

        const newJob = new jobModel({
            jobId,
            jobName,
            jobDescription
        })

        const savedJob = await newJob.save();

        res.status(200).send(savedJob);
    } catch (error) {
        console.error("Error creating job:", error);
        res.status(500).json({ message: "Error creating job" });
    }
    next();
}

// DELETE JOB BY ID
export const deleteJob = async (req, res) => {
    try {
        const { idJob } = req.params;
        const job = await jobModel.findById(idJob);
        if (!job) {
            return res.status(404).json({ message: 'Job not found!' });
        }
        await jobModel.findByIdAndDelete(idJob);
        res.status(200).json({ message: 'Job deleted successfully' });
    } catch (error) {
        console.error('Error deleting job:', error);
        res.status(500).json({ message: 'Error deleting job' });
    }
};

//GET LIST JOBS
export const getListJobs = async (req, res) => {
    try {
        const { $skip, $limit, ...findQuery } = req.query;

        const skip = Number($skip);
        const limit = Number($limit);

        // if (isNaN(skip) || isNaN(limit)) {
        //     return res.status(400).json({ message: 'Invalid skip or limit' });
        // }

        const jobs = await jobModel.find(findQuery)
            .skip(skip * limit)
            .limit(limit);

        const total = await jobModel.countDocuments(findQuery);
        const pages = total > 0 ? Math.ceil(total / limit) : 0;

        res.status(200).send({
            total,
            skip,
            limit,
            pages,
            data: jobs
        });
    } catch (error) {
        console.error('Error retrieving jobs:', error);
        res.status(500).json({ message: 'Error retrieving jobs' });
    }
};


//GET ONE JOB
export const getJob = async (req, res) => {
    try {
        const { idJob } = req.params;
        const job = await jobModel.findById(idJob);

        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        res.status(200).json(job);
    } catch (error) {
        console.error('Error retrieving the job:', error);
        res.status(500).json({ message: 'Error retrieving the job' });
    }
};

// UPDATE JOB
export const updateJob = async (req, res) => {
    const { id } = req.params;
    const { jobId, jobName, jobDescription } = req.body;

    try {
        const updatedJob = await jobModel.findByIdAndUpdate(
            id,
            { $set: { jobId, jobName, jobDescription } },
            { new: true }
        );

        if (!updatedJob) {
            return res.status(404).json({ message: 'Job not found' });
        }

        res.status(200).json(updatedJob);
    } catch (error) {
        console.error('Error updating job:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


export const filterJobs = async (req, res) => {
    try {
        let query = {};
        const { jobId, jobName } = req.query;

        if (jobId) {
            query.jobId = jobId;
        }
        if (jobName) {
            query.jobName = jobName;
        }

        const jobs = await jobModel.find(query);

        if (jobs.length === 0) {
            return res.status(404).send({ message: "No jobs found matching the criteria." });
        }

        res.status(200).send(jobs);
    } catch (error) {
        res.status(500).send({ message: "Server error", error: error.message });
    }
};




