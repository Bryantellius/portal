import { Request, Response, NextFunction } from "express";
import { CreateToken, ValidToken } from "../utils/security/tokens";
import db from "../db/models";
import { sendEmail } from "../utils/mail/mailgun";
import { hashPassword } from "../utils/security/passwords";

const listRoles = async (req: Request, res: Response, next: NextFunction) => {
    const roles = await db.Role.findAll();

    res.json(roles);
};

const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.body;
    
        const createUserResult: { get: any } = await db.User.create(user);

        const userId = parseInt(createUserResult.get('id'));
        const accessToken = await CreateToken({ userid: parseInt(createUserResult.get('id')) });

        const changePasswordLink = `http://localhost:3000/auth/password-reset?userId=${ userId }&token=${ accessToken }`;
        
        // Production:
        // const link = `https://app.truecoders.io/update/${token}&${result.insertId}`;
    
        // Email user with link to update password
        const sendEmailResult: any = await sendEmail(
            user.email,
            "Create Password",
            changePasswordLink
        );
    
        res.json({
            token: accessToken,
            msg: "User updated!",
            user: userId
        });
    } catch (error) {
        console.log(error);
        res.status(500).json(false);
    }
};

const login = async (req: any, res: Response, next: NextFunction) => {
    try {
        delete req.user.password;
        const token = await CreateToken({ userid: req.user.UserID });

        res.json({
            token,
            user: req.user,
        });
    } catch (error) {
        console.log("Incorrect Log In!");
        res.status(500).json(false);
    }
};

const bulkRegister = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.files) {
            res.json({ msg: "no go bro" });
            return;
        }

        const { roleID, courseID } = req.body;
        const csv = (req.files.csv as any).data.toString().split("\n");
        const columns = csv[0].split(",");

        const subscribeTasks = Promise.all(csv.map(async (record: any, i: number) => {
            if (i === 0) {
                return;
            }
            const user: any = {};
            record.split(",").forEach((col: string, idx: number) => {
                user[columns[idx]] = col;
            });
            
                
            user.roleID = roleID;
            user.password = "temp";
            const createUserResult: any = await db.User.create(user);

            const userId = parseInt(createUserResult.get('id'));

            const classSubscribeResult: any = await db.ClassList.create({
                courseID: courseID,
                userID: userId
            });

            const accessToken = await CreateToken({ userid: userId });

            // Development:
            const link = `http://localhost:3000/auth/reset-password?userId=${ userId }&token=${ accessToken }`;
            // Production:
            // const link = `https://app.truecoders.io/update/${token}&${result.insertId}`;

            // Email user with link to update password
            const emailResult: any = await sendEmail(
                user.email,
                "Create Password",
                link
            );
        }));

        await subscribeTasks;
        res.json({ msg: "Received csv" });
    } catch (error) {
        console.log(error);
        res.status(500).json(false);
    }
}

const startPasswordReset = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email } = req.body;
        const userResult: { get: any } = await db.User.findOne({
            where: {
                email: email
            }
        });

        const userId = parseInt(userResult.get('id'));

        const accessToken = await CreateToken({ userid: userId });

        const link = `http://localhost:3000/auth/reset-password?userId=${ userId }&token=${ accessToken }`;

        // Email user with link to update password
        const emailResult = await sendEmail(
            email,
            "Reset Password",
            link
        );

        res.json({
            accessToken,
            msg: "Password reset link sent successfully",
            user: userResult,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json(false);
    }
  };

  const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
    const {
        password
    } = req.body.user;

    const {
        token
    } = req.body.creds;

    const userId = parseInt(req.body.creds.userId.toString());

    const isAuthenticated = await ValidToken(token, userId);

    if (!isAuthenticated) {
        throw new Error("Invalid token. Please try again later.");
    }

    const userUpdateModel = {
        id: userId,
        password: hashPassword(password)
    };

    const updateResult = await db.User.update(userUpdateModel, {
        where: {
            id: userId
        }
    });

    res.json(updateResult);
  }
  

export default {
    login,
    register,
    bulkRegister,
    resetPassword,
    startPasswordReset,
    listRoles
};