import * as express from "express";
import db from "../../db/queries/lectures";

const router = express.Router();

router.post(
  "/",
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      let { body } = req;
      let data = await db.insertLecture(body);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
