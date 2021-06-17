import express, { Request, Response, NextFunction } from 'express';
import fileUpload from 'express-fileupload';
import userController from '../../controllers/user.controller';

const userRouter = express.Router({ mergeParams: true });

userRouter.use(fileUpload());

userRouter.get('/', userController.findAll);

userRouter.post('/', userController.createUser);

userRouter.get('/auth0/:auth0Id', userController.findByAuth0Id);

userRouter.get('/:id', userController.findById);

userRouter.put('/:id', userController.updateUser);

userRouter.get('/profile', userController.getSignedInUser);

userRouter.post('/assets', userController.uploadAssets);

userRouter.post('/link', userController.createOrUpdateAuth0UserLink);
export default userRouter;