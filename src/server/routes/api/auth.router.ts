import express from "express";
import fileUpload from "express-fileupload";
import passport from "passport"
import authController from "../../controllers/auth.controller";

const authRouter = express.Router({ mergeParams: true });
authRouter.use(fileUpload());

authRouter.post("/login", passport.authenticate("local"), authController.login);
authRouter.post("/register", authController.register);
authRouter.post("/bulk-register", authController.bulkRegister);
authRouter.post("/forgot-password", authController.startPasswordReset);
authRouter.post("/reset-password", authController.resetPassword);
authRouter.get("/roles", authController.listRoles);

export default authRouter;