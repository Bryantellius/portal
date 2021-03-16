import * as express from "express";

const router = express.Router();

router.get("/test", (req, res, next) => {
  try {
    res.status(200).json({ msg: "Hello World!" });
  } catch (error) {
    next(error);
  }
});

export default router;
