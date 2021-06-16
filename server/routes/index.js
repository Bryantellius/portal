import { Router } from 'express';
import checkJwt from '../middleware/auth0Jwt';
import authRouter from './api/auth.router';
import lectureRouter from './api/lecture.router';
import quizRouter from './api/quiz.router';
import userRouter from './api/user.router';
// import authMiddleware from '../middleware/auth';
import courseRouter from './api/course.router';
import moduleRouter from './api/module.router';
import exerciseRouter from './api/exercise.router';
import videoRouter from './api/video.router';

lectureRouter.use(checkJwt);
quizRouter.use(checkJwt);
userRouter.use(checkJwt);
courseRouter.use(checkJwt);
moduleRouter.use(checkJwt);
exerciseRouter.use(checkJwt);
videoRouter.use(checkJwt);

const router = Router();

// router.use(authMiddleware);
router.use('/api/auth', authRouter);
router.use('/api/user', userRouter);
router.use('/api/lecture', lectureRouter);
router.use('/api/course/:courseId/lecture', lectureRouter);
router.use('/api/course/:courseId/module', moduleRouter);
router.use('/api/quiz', quizRouter);
router.use('/api/lecture/:lectureId/quiz', quizRouter);
router.use('/api/course', courseRouter);
router.use('/api/module', moduleRouter);
router.use('/api/exercise', exerciseRouter);
router.use('./api/video', videoRouter);

export default router;
