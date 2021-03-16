import * as express from "express";
import db from "../../db/queries/users";
import { CreateToken } from "../../utils/security/tokens";
import { hashPassword } from "../../utils/security/passwords";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    let { password } = req.body;
    req.body.password = hashPassword(password);
    let result: any = await db.insertUser(req.body);
    let token = await CreateToken({ userid: result.insertId });
    res.json({
      token,
      role: "admin",
      user: result.insertId,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(false);
  }
});

export default router;
