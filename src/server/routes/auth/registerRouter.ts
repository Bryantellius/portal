import * as express from "express";
import * as fileUpload from "express-fileupload";
import db from "../../db/queries/users";
import tokens from "../../db/queries/tokens";
import { CreateToken } from "../../utils/security/tokens";
import { hashPassword } from "../../utils/security/passwords";
import { sendEmail } from "../../utils/mail/mailgun";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    req.body.user.password = "temp";
    let result: any = await db.insertUser(req.body.user);
    let classSub: any = await db.insertUserToCourseList({
      CourseID: req.body.classlist.CourseID,
      UserID: result.insertId,
    });
    let token = await CreateToken({ userid: result.insertId });

    // Development:
    const link = `http://localhost:3000/update/${token}&${result.insertId}`;
    // Production:
    // const link = `https://app.truecoders.io/update/${token}&${result.insertId}`;

    // Email user with link to update password
    let emailResult: any = await sendEmail(
      req.body.user.email,
      "Create Password",
      link
    );

    res.json({
      token,
      msg: "User updated!",
      user: result.insertId,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(false);
  }
});

router.use(fileUpload());

router.post("/bulk", async (req, res) => {
  if (!req.files) {
    res.json({ msg: "no go bro" });
    return;
  }
  const { RoleID, CourseID } = req.body;
  const csv = (req.files.csv as any).data.toString().split("\n");
  const columns = csv[0].split(",");
  csv.forEach((record: any, i: number) => {
    if (i === 0) {
      return;
    }
    let user: any = {};
    record.split(",").forEach((col: string, idx: number) => {
      user[columns[idx]] = col;
    });

    try {
      (async () => {
        user.RoleID = RoleID;
        user.password = "temp";
        let result: any = await db.insertUser(user);
        let classSub: any = await db.insertUserToCourseList({
          CourseID: CourseID,
          UserID: result.insertId,
        });
        let token = await CreateToken({ userid: result.insertId });

        // Development:
        const link = `http://localhost:3000/update/${token}&${result.insertId}`;
        // Production:
        // const link = `https://app.truecoders.io/update/${token}&${result.insertId}`;

        // Email user with link to update password
        let emailResult: any = await sendEmail(
          user.Email,
          "Create Password",
          link
        );
      })();
    } catch (error) {
      console.log(error);
      res.status(500).json(false);
    }
  });

  res.json({ msg: "Received csv" });
});

router.post("/reset", async (req, res) => {
  try {
    let [result]: any = await db.findOneUserByEmail(req.body.email);
    let token = await CreateToken({ userid: result.insertId });

    const link = `http://localhost:3000/update/${token}&${result.UserID}`;

    // Email user with link to update password
    let emailResult: any = await sendEmail(
      req.body.email,
      "Reset Password",
      link
    );

    res.json({
      token,
      msg: "User created!",
      user: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(false);
  }
});

router.put("/", async (req, res) => {
  try {
    let inDatabase: any = await tokens.findTokenByVal(req.body.creds.token);
    if (inDatabase.length > 0) {
      delete req.body.user.email;
      let { password } = req.body.user;
      req.body.user.password = hashPassword(password);
      let result: any = await db.updateUser(
        parseInt(req.body.creds.UserID),
        req.body.user
      );
      res.json({
        successful: inDatabase.length > 0,
        msg: "User account created!",
      });
      // Delete token from db
    } else {
      res.json({ msg: "User cannot update information." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(false);
  }
});

export default router;
