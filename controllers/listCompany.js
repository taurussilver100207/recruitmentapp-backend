import express from 'express'
import RecruitSession from '../models/ListCompany.js';
import bodyParser from 'body-parser';
import RecruimentApplicant from '../models/Recruitment Applicant.js';
const app = express();

app.use(bodyParser.json());

// xem danh sach cac dot tuyen dung cong ty
export const checkCecruitment = async (req, res) => {
    try {
        const recruitments = await RecruitSession.find()
        if (recruitments) {
            res.json(recruitments)
        } else {
            res.status(404).send({ message: "recruiment is not default!" })
        }
        res.status(200).send(checkCecruitment)
    } catch (error) {
        console.log("error :>>", error);
        res.status(500).send(error)
    }
}

// chi tiet cac dot tuyen dung cong ty
export const detailRecruiment = async (req, res) => {
    try {
        const recruiments = await RecruitSession.findById(req.params.id);
        if (!recruiments) {
            return res.status(404).send({ message: "recruiment is not found!" })
        }
        res.status(201).send(recruiments)
    } catch (error) {
        console.log("error :>>", error);
        res.status(500).send(error)
    }
}

// tao moi cac dot tuyen dung cong ty
export const createRecruiment = async (req, res) => {
    try {
        const createRecruiment = new RecruitSession(req.body)

        await createRecruiment.save();

        res.status(203).send(createRecruiment)
    } catch (error) {
        console.log("error :>>", error);
        res.status(500).send(error)
    }
}

// cap nhạt cac dot tuyen dung cong ty
export const updateRecruiment = async (req, res) => {
    try {
        const updateRecruiments = await RecruitSession.findByIdAndUpdate(req.params.id)
        await updateRecruiments.save();
        res.status(204).send(updateRecruiments)
    } catch (error) {
        console.log("erro :>>", error);
        res.status(500).send(error)
    }
}

// xem danh sach ưng vien trong đợt tuyển dụng
export const candidateRecruiment = async (req, res) => {
    try {
        const candidates = await RecruimentApplicant.find({ recruimentId: req.params.id });
        if (!candidates) {
            res.json(candidates)
        } else {
            return res.status(404).send("recruiment is not found!")
        }
        res.status(200).send(candidates)
    } catch (error) {
        console.log("error :>>", error);
        res.status(500).send(error)
    }
}

// them ung vien theo yeu cau
export const createCandidate = async (req, res) => {
    try {
        const createCandidates = new RecruimentApplicant({ recruimentId: req.params.recruimentId, ...req.body, });

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

