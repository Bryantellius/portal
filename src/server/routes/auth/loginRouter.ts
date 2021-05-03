import * as express from "express";
import * as passport from "passport";
import { CreateToken } from "../../utils/security/tokens";

const router = express.Router();

router.post(
  "/",
  passport.authenticate("local"),
  async (req: any, res: express.Response) => {
    try {
      delete req.user.password;
      let token = await CreateToken({ userid: req.user.UserID });
      res.json({
        token,
        user: req.user,
      });
    } catch (error) {
      console.log("Incorrect Log In!");
      res.status(500).json(false);
    }
  }
);

export default router;
