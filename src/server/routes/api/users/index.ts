import * as express from "express";
import * as fs from "fs";
import * as path from "path";
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

    let data: any = await users.updateUser(parseInt(id), body);
    res.json(data);
  } catch (error) {
    next(error);
  }
});

export default router;
