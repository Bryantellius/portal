import db from "../db/models";
import { Request, Response, NextFunction } from "express";
import path from "path";

const { Lecture, Module } = db;

const findAll = async (req: Request, res: Response, next: NextFunction) => {

    const { lectureId } = req.params;

    let includes: Array<any> = [
        { all: true, nested: true }
    ];

    if (req.params.curriculumId) {
        includes.push({
            model: Module,
            attributes: [ "curriculumId" ],
            where: {
                curriculumId: req.params.curriculumId
            }
        });
    }

    let whereCriteria: any = {};

    if (lectureId !== undefined) {
        whereCriteria.lectureId = req.params.lectureId;
    }

    const findOptions = {
        where: whereCriteria,
        include: includes
    }
    
    const lectures = await Lecture.findAll(findOptions);

    res.json(lectures);
}

const findById = async (req: Request, res: Response, next: NextFunction) => {
    const lecture = await Lecture.findByPk(parseInt(req.params.id), {
        include: { all: true }
    });

    res.json(lecture);
};

const getLectureContent = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const lecture: any = await db.Lecture.findByPk(id);

    const filePath = path.join(process.cwd(), "src/server/lectures", lecture.fileName);
    lecture.id;
    res.sendFile(filePath);
}

export default {
    findAll,
    findById,
    getLectureContent
};