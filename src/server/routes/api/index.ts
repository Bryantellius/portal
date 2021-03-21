import * as express from "express";
import * as fs from "fs";
import * as path from "path";
import db from "../../db/queries/topics";
import resourceRouter from './resources';
import adminRouter from './adminRouter';

const router = express.Router();

router.use("/admin", adminRouter);
router.use("/resources", resourceRouter);

export default router;
