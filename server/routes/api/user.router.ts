import express, { Request, Response, NextFunction } from "express";
import fileUpload from "express-fileupload";
import userController from "../../controllers/user.controller";

const userRouter = express.Router({ mergeParams: true });

userRouter.use(fileUpload());

userRouter.get("/:id", userController.findById);

userRouter.put("/:id", userController.updateUser);

userRouter.get('/profile', (req: Request, res: Response, next: NextFunction) => {
  return userController.getSignedInUser(req, res, next);
});

userRouter.post("/assets", userController.uploadAssets);

userRouter.post("/", userController.createUser);

export default userRouter;