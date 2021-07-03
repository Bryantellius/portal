import express from 'express';
import fileUpload from 'express-fileupload';
import userController from '../../controllers/user.controller';
import user from '../../db/models/user';

const userRouter = express.Router({ mergeParams: true });

userRouter.use(fileUpload());

userRouter.get('/', userController.findAll);

userRouter.get('/:id', userController.findById);

userRouter.get('/auth0/:auth0Id', userController.findByAuth0Id);

userRouter.post('/', userController.createUser);

userRouter.put('/:id', userController.updateUser);

userRouter.delete('/:id', userController.deleteUser);

userRouter.get('/profile', userController.getSignedInUser);

export default userRouter;