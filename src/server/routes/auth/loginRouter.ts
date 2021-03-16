import * as express from "express";
import * as passport from "passport";
import { CreateToken } from "../../utils/security/tokens";

const router = express.Router();

router.post(
  "/",
  passport.authenticate("local"),
  async (req: any, res: express.Response) => {
    try {
      let token = await CreateToken({ userid: req.user.UserID });
      res.json({
        token,
        role: req.user.Role,
        userid: req.user.UserID,
      });
    } catch (error) {
      console.log("Incorrect Log In!");
      res.status(500).json(false);
    }
  }
);

export default router;
