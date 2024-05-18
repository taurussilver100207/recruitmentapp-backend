import CV from '../models/CV.js';
import RecruitmentSession from '../models/RecruitmentSession.js';
import User from '../models/User.js';

// xem danh sach cac dot tuyen dung cong ty
export const getRecruitmentSessions = async (req, res) => {
    try {
        const recruitmentSessions = await RecruitmentSession.find()
        res.status(200).json({ recruitmentSessions })
    } catch (err) {
        res.status(404).json({ error: err.message })
    }
}

// chi tiet cac dot tuyen dung cong ty
export const findRecruitmentSession = async (req, res) => {
    try {
        const recruimentSession = await RecruitmentSession.findById(req.params.id).populate("candidates").exec();

        res.status(201).json({ recruimentSession })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// tao moi cac dot tuyen dung cong ty
export const createRecruitmentSession = async (req, res) => {
    try {
        const newRecruitmentSession = new RecruitmentSession(req.body)

        await newRecruitmentSession.save();

        res.status(200).json({ newRecruitmentSession })
    } catch (err) {
        res.status(500).send({ error: err.message })
    }
}

// cap nhạt cac dot tuyen dung cong ty
export const updateRecruitmentSession = async (req, res) => {
    try {
        const { 
             recruitmentSessionId,
             officer,
             name,
             startDate,
             endDate,
             jobPosition,
             descriptions
        } = req.body
        const updatedRecruitmentSession = await RecruitmentSession.findByIdAndUpdate(
            recruitmentSessionId,
            {
                officer,
                name,
                startDate,
                endDate,
                jobPosition,
                descriptions
            },
            { "new": true, "upsert": true }
        )
        res.status(200).json({ updatedRecruitmentSession })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// them ung vien theo yeu cau
export const addCandidate = async (req, res) => {
    try {
        const createCandidates = new 

        await createCandidates.save();
        res.json(createCandidates)
    } catch (error) {
        console.log("error :>>", error);
        res.status(500).send(error)
    }
}


// xoa ung vien theo dot tuyen dung
export const deleteCandidate = async (req, res) => {
    try {
        const deleteRecruiments = await RecruimentApplicant.findByIdAndDelete({ _id: req.params.id, recruimentId: req.params.recruimentId, })
        if (!deleteRecruiments) {
            return res.status(400).json({ message: "recruiment is not default!" })
        } else {
            res.json({ message: "recruiment is has been deleted" })
        }
        res.status(205).send(deleteRecruiments)
    } catch (error) {
        console.log("error :>>", error);
        res.status(500).send(error)
    }
}


// cập nhật trạng thái ứng vien (duoc tuyen , chua duoc tuyen)
export const updateStatusRecruiment = async (req, res) => {
    try {
        const updateRecruiments = await RecruimentApplicant.findByIdAndUpdate(req.params.id, { ...req.body })
        if (!updateRecruiments) {
            res.json({ message: "recruiment does not exit" })
        }
        res.json(updateRecruiments)
    } catch (error) {
        console.log("error :>>", error);
        res.json(error)
    }
}

// cập nhật thời gian và cach thức làm bài test cho từng ứng viên
export const updateCandidateList = async (req, res) => {
    try {
        const updates = await RecruimentApplicant.findByIdAndUpdate(req.params.id, {
            diemlambaitestdauvao: req.params.diemlambaitestdauvao,
            thoigianlambaitest: req.params.thoigianlambaitest,
            hinhthuclambaitest: req.params.hinhthuclambaitest,
        },
            { new: true }
        )
        if (!updates) {
            return res.json({ message: "candidate does not exit" })
        }
        res.json(updates)
    } catch (error) {
        res.status(500).send(error)
    }
} 

// cap nhat time va cach thuc phong van tung ung vien

