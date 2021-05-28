import express from "express";
import db from "../../db/models";

const router = express.Router();

router.post(
  "/",
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const lecture = req.body;
      const createLectureResponse = await db.Lecture.create(lecture);
      
      res.json(createLectureResponse);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
