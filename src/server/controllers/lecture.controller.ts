import db from "../db/models";
import { Request, Response, NextFunction } from "express";
import path from "path";

const { Lecture, LectureGroup, Quiz, QuizQuestion, QuizQuestionOption, Module } = db;

const findAll = async (req: Request, res: Response, next: NextFunction) => {

    const { lectureGroupId } = req.params;

    const findOptions: any = {
        include: { all: true }
    };

    if (lectureGroupId !== undefined) {
        findOptions.where = {
            lectureGroupId: lectureGroupId
        };
    }
    
    const lectures = await db.Lecture.findAll(findOptions);

    res.json(lectures);
}

const findById = async (req: Request, res: Response, next: NextFunction) => {
    const lecture = await Lecture.findByPk(parseInt(req.params.id), {
        include: { all: true }
    });

    res.json(lecture);
}

const findByCurriculumId = async (req: Request, res: Response, next: NextFunction) => {
    const lectureGroups = await LectureGroup.findAll({
        include: [{
            model: Module,
            attributes: [ "curriculumId" ],
            where: {
                curriculumId: req.params.curriculumId
            }
        }, {
            all: true,
            nested: true
        }]
    });

    res.json(lectureGroups);
};

const findByLectureGroupId = async (req: any, res: any) => {
    const lecture = await Lecture.findAll({
        where: {
            lectureGroupId: req.params.lectureGroupId
        },
        include: { all: true }
    });

    res.json(lecture);
};

const getLectureContent = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const lecture = await db.Lecture.findByPk(id);

    const filePath = path.join(process.cwd(), "src/server/lectures", lecture.fileName);
    res.sendFile(filePath);
}

export default {
    findById,
    findByLectureGroupId,
    findByCurriculumId,
    getLectureContent
};1