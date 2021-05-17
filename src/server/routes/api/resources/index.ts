import * as express from "express";
import * as fs from "fs";
import * as path from "path";
import lectures from "../../../db/queries/lectures";
import topics from "../../../db/queries/topics";
import modules from "../../../db/queries/modules";

const router = express.Router();

router.get("/lectures/:id?", async (req, res, next) => {
  try {
    let { id } = req.params;
    let data: any = await lectures.getOneLectureByTopicID(parseInt(id));
    let filePath = path.join(__dirname, data[0].FilePath);
    res.sendFile(filePath);
  } catch (error) {
    next(error);
  }
});

router.get("/lectures-info/:id?", async (req, res, next) => {
  try {
    let { id } = req.params;
    let data: any = await lectures.getOneLectureByTopicID(parseInt(id));
    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/modules/:id?",
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    let id: number = parseInt(req.params.id);
    let data: any;
    try {
      if (id) {
        data = await modules.getAllModulesByCurriculum(id);
      } else {
        data = await modules.getAllModules();
      }

      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/topics/:id?",
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    // let TopicID: number = parseInt(req.params.TopicID);
    let id: number = parseInt(req.params.id);
    let data: any;
    try {
      // if (id) {
      //   data = await topics.getOneTopic(id);
      // } else {
      data = await topics.getTopicsByCurriculum(id);
      // }

      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
