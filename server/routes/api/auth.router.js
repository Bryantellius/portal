import express from "express";
import fileUpload from "express-fileupload";
import authController from "../../controllers/auth.controller";

const authRouter = express.Router({ mergeParams: true });
authRouter.use(fileUpload());
authRouter.get('/:sub', authController.findByAuth0Id);
authRouter.post('/', authController.linkAuth0User);
authRouter.put('/:sub', authController.linkAuth0User);

export default authRouter;

