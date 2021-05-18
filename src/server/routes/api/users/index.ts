import * as express from "express";
import * as fileUpload from "express-fileupload";
import { writeFile } from "fs";
import { extname, join } from "path";
import users from "../../../db/queries/users";

const router = express.Router();

router.get("/:id", async (req, res, next) => {
  try {
    let { id } = req.params;
    let data: any = await users.getOneUserById(parseInt(id));
    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.put("/update/:id", async (req, res, next) => {
  try {
    let { id } = req.params;
    let { body } = req;

    if (body.AvatarUrl) {
      body.AvatarUrl = body.AvatarUrl + extname(body.fileName);
      delete body.fileName;
    }

    let data: any = await users.updateUser(parseInt(id), body);
    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.use(fileUpload());

router.post(
  "/update/assets",
  async (req: any, res: express.Response, next: express.NextFunction) => {
    try {
      if (!req.files) {
        res.json({ msg: "no go bro" });
        return;
      }

      console.log(`req.files > ${req.files}`);
      let newImage: any = req.files.image;
      let id: any = req.body.id;
      let path: string = join(
        __dirname,
        `../public/assets/img/${id}${extname(newImage.name)}`
      );

      let buffer = Buffer.from(newImage.data, "base64");

      writeFile(path, buffer, (err: Error) => {
        if (err) {
          next(err);
        }
        res.send({ msg: "File Uploaded" });
      });
    } catch (err) {
      next(err);
    }
  }
);

export default router;
