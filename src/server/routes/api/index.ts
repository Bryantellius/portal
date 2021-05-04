import * as express from "express";
import resourceRouter from "./resources";
import userRouter from "./users";
import adminRouter from "./adminRouter";

const router = express.Router();

router.use("/admin", adminRouter);
router.use("/resources", resourceRouter);
router.use("/users", userRouter);

export default router;
