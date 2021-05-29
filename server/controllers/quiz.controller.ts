import db from "../db/models";
import { Request, Response, NextFunction } from "express";

const findById = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const quiz = await db.Quiz.findByPk(parseInt(id));

    return res.json(quiz);
};

const findAll = async (req: Request, res: Response, next: NextFunction) => {
    const { lectureId } = req.params;

    const quiz = await db.Quiz.findAll();

    return res.json(quiz);
};

const findByLectureId = async (req: Request, res: Response, next: NextFunction) => {
    const { lectureId } = req.params;

    const quiz = await db.Quiz.findAll({
        where: {
            lectureId
        }
    });

    return res.json(quiz);
};

const submitResponses = async (req: Request, res: Response, next: NextFunction) => {
    const {
        userId,
        responses
    } = req.body;

    for (let response of responses) {
        await db.QuizQuestionResponse.create({
            quizQuestionId: response.quizQuestionId,
            value: response.value,
            userId: userId
        });
    }

    res.json({
        success: true
    });
};

export default {
    findById,
    findAll,
    findByLectureId,
    submitResponses
};