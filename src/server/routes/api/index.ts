import * as express from "express";
import * as fs from "fs";
import * as path from "path";
import db from "../../db/queries/topics";
import resourceRouter from './resources';
import adminRouter from './adminRouter';

const router = express.Router();

router.get("/lectures/:id?", (req, res, next) => {
  try {
    let filePath = path.join(__dirname, "../src/server/lectures/test.md");
    let readStream = fs.createReadStream(filePath);
    readStream.pipe(res);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/topics/:id?",
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    let id: number = parseInt(req.params.id);
    let data: any;
    try {
      if (id) {
        data = await db.getOneTopic(id);
      } else {
        data = await db.getAllTopics();
      }

      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
);

router.use("/admin", adminRouter);
router.use("/resources", resourceRouter);

export default router;
