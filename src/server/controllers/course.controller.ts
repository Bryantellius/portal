import { Request, Response, NextFunction } from "express";
import db from "../db/models";

const findAll = async (req: Request, res: Response, next: NextFunction) => {
    const courses = await db.Course.findAll();

    res.json(courses);
}

export default {
    findAll
};