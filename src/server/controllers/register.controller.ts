import db from "../db/models";
import { Request, Response } from "express";
import { CreateToken } from "../utils/security/tokens";

const registerUser = async (req: Request, res: Response) => {
    const user: any = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        roleId: req.body.roleId,
        avatarUrl: req.body.avatarUrl,
        password: "temp"
    };

    const createResult: any = await db.User.create(user);

    const subscribeResult: any = await db.ClassList.create({
        courseID: req.body.classList.courseID,
        userID: createResult.get('id'),
    });

    const accessToken = await CreateToken({ userid: subscribeResult.get('id') });
}