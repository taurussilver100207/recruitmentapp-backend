import Question from "../models/Question.js";
import Test from "../models/Test.js";
import Answer from "../models/Answer.js";
import CV from "../models/CV.js";

export const joinTest = async (req, res) => {
    try {
        const { testCode } = req.body
        const test = await Test
        .findOne({ testCode: testCode })
        .populate("questions")
        .populate("jobPositions")
        .exec()

        res.status(200).json({ test })
    } catch (err) {
        res.status(404).json({ error: err.message })
    }
}

export const saveAnswer = async (req, res) => {
    try {
        const { cvId, question, answer } = req.body
        const targetQuestion = await Question.findById(question)
        const newAnswer = new Answer({
            question,
            answer,
            isTrue: targetQuestion == targetQuestion.correctOption
        })
        const savedAnswer = await newAnswer.save()
        
        await CV.findByIdAndUpdate(
            cvId, 
            { "$push": { "answers": savedAnswer._id }},
            { "new": true, "upsert": true }
        )

        res.status(200).json({ message: "Automatically saved successfully." })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const submitTest = async (req, res) => {
    try {
        const { cvId } = req.params
        const targetCV = await CV.findById(cvId).populate("answers").exec()

        let score = 0
        targetCV.answers.forEach(answer => {
            answer.populate("question")
            if (answer.isTrue) {
                score += answer.question.score
            }
        })

        targetCV.score = score
        await targetCV.save()

        res.status(200).json({ targetCV })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

