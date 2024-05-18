import express from 'express'
import RecruitSession from '../models/ListCompany.js';
import bodyParser from 'body-parser';
import RecruimentApplicant from '../models/Recruitment Applicant.js';

const app = express();

app.use(bodyParser.json());


// see the list of company information dots
export const checkRecruitment = async (req, res) => {
    try {
        const recruitments = await RecruitSession.find()
        res.status(200).send(recruitments)
    } catch (error) {
        console.log("error :>>", error);
        res.status(500).send(error)
    }
}

// details of company information points
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

// create a new company content dots
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

// update the company information dots
export const updateRecruiment = async (req, res) => {
    try {
        const updateRecruiments = await RecruitSession.findByIdAndUpdate(req.params.id, req.body, { new: true })

        await updateRecruiments.save();

        res.status(204).send(updateRecruiments)
    } catch (error) {
        console.log("erro :>>", error);
        res.status(500).send(error)
    }
}

//  see the list of candidates in the recruiment round
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

// add candidates as required
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


// delete candidates as required
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


// Update candidate status (qualified, not yet qualified)
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

// Update test time and method for each candidate
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

// Update time and interview method for each the candidate
export const candidates = async (req, res) => {
    try {
        const candidateSession = await RecruimentApplicant.findByIdAndUpdate(req.params.id, {
            ngayphongvan: req.params.ngayphongvan,
            hinhthucphongvan: req.params.hinhthucphongvan
        }, { new: true }
        )
        if (!candidateSession) {
            return res.status(404).send({ message: "candidate does not exit" })
        }

        // nhận email gửi thông báo thoigian và cách thuc phong van
        const emailCandidate = emailInteviewNoticational(candidateSession);
        await emailContext(candidateSession.email, emailCandidate);

        res.json(candidateSession)
    } catch (error) {
        console.log("error :>>", error);
        res.status(500).send(error)
    }
}

// Update result and job acceptance date for each candidate
export const interviewCandidate = async (req, res) => {
    try {
        const interviews = await RecruimentApplicant.findByIdAndUpdate(req.params.id, {
            ketqua: req.params.ketqua,
            ngaynhanviec: req.params.ngaynhanviec
        }, { new: true }
        )

        // nhan email gưi thong bao phong van và ngay nhan viec
        const interviewEmail = emailInteviewNoticational(interviews);
        await interviewJob(interviews.email, interviewEmail)

        res.json(interviews)
    } catch (error) {
        console.log("error :>>", error);
        res.status(500).send(error)
    }
}

// lua chon ung vien de gui thong bao qua email
// export const sendEmailCompanyNotification = async (email, type) => {
//     try {
//         if (!email) {
//             throw new Error("email is not enough!")
//         }
//         let subject, name, html;

//         switch (type) {
//             // gửi email thông báo thời gian  và cách thức làm bài test
//             case "emailNoticeTest":
//                 subject = "Notice about the test";
//                 html = `
//             <p>Chào ${name}</p>
//             <p>Bạn đã được mời tham gia bài test tuyển dụng cho vị trí . Bài test sẽ diễn ra vào lúc [thời gian] ngày , theo hình thức [Hình thức làm bài test].
//             Vui lòng ấn vào tham gia [làm bài test].
//             </p>
//             <p>Chúc bạn may mắn.</p>
//             <p>Nhóm tuyển dụng [Công Ty]</p>
//             `
//                 break;

//             // gửi email kết quả bài test đầu vào và lịch phỏng vấn
//             case "testResult":
//                 subject = "Notification of test results and interview schedule";
//                 html = `
//                 <p>Chào ${name} </P>
//                 <p>Kết quả bài test đầu vào tuyển dụng cho vị trí [Tên vị trí] của bạn như sau :
//                 <br>
//                 - Điểm số : ${enstrancetestscore};
//                 </P>
//                 <p>
//                 Bạn đã được mời tham gia phỏng vấn cho vị trí [Tên vị trí]. Buổi phỏng vấn sẽ diễn ra vào lúc [Thời gian] ngày [Ngày] tại [Địa điểm phỏng vấn].
//                 </p>
//                 <p>Vui lòng xác nhận tham dự phỏng vấn qua email này.</p>
//                 <p>Chúc bạn may mắn!</p>
//                 <p>Trân trọng</p>
//                 <p>Nhóm tuyển dụng [Tên công ty]</p>
//             `
//                 break;

//             //kết thúc phỏng vấn và ngày nhận việc
//             case "endenterviewjob":
//                 subject = "end of interview and job acceptance date";
//                 html = `
//             <p>Chúc mừng bạn ${name} đã ứng tuyển vị trí phỏng vấn thành công</P>
//             <p>Vui lòng xác nhận để được làm việc</P>
//             <p>Trân Trọng</P>
//             `
//                 break;
//             default:
//                 throw new Error("Invailed email enough")
//         };

//         const transporter = nodemailer.createTransport({
//             host: "stmp example.com",
//             port: 800,
//             auth: {
//                 user: process.env.USER_EMAIL,
//                 pass: process.env.PASSWORD_EMAIL,
//             }
//         });

//         const infoNotification = await transporter.sendMail({
//             from: '"Khiem" <Khiem0809@gamil.com>',
//             to: email,
//             subject: subject,
//             html: html
//         });

//         return infoNotification;
//     } catch (error) {
//         console.log("error : >>", error);
//         res.status(500).send(error)
//     }
// }

// export const sendMail = async (req, res) => {
//     try {
//         const { email, type } = req.body;
//         if (!email || !type) {
//             throw new Error("Missing email or type in request body");
//         }
//         const responesides = await sendEmailCompanyNotification(email, type);
//         res.json(responesides)
//     } catch (error) {

//     }
// }

