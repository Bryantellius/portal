import { Router } from 'express';
import checkJwt from '../middleware/auth0Jwt';
import authRouter from './api/auth.router';
import lectureRouter from './api/lecture.router';
import quizRouter from './api/quiz.router';
import userRouter from './api/user.router';
import courseRouter from './api/course.router';
import moduleRouter from './api/module.router';
import exerciseRouter from './api/exercise.router';
import videoRouter from './api/video.router';
import path from 'path';

lectureRouter.use(checkJwt);
quizRouter.use(checkJwt);
courseRouter.use(checkJwt);
moduleRouter.use(checkJwt);
exerciseRouter.use(checkJwt);
videoRouter.use(checkJwt);

const router = Router();

router.get('/', (req, res) => res.sendFile(path.join(process.env.PUBLIC_DIR, 'index.html')));

router.use('/api/auth', authRouter);
router.use('/api/user', userRouter);
router.use('/api/lecture', lectureRouter);
router.use('/api/course/:courseId/module', moduleRouter);
router.use('/api/course', courseRouter);
router.use('/api/quiz', quizRouter);
router.use('/api/module', moduleRouter);
router.use('/api/exercise', exerciseRouter);
router.use('/api/video', videoRouter);
router.use('/api/user/:userId/exercise', exerciseRouter);
router.use('/api/user/:userId/quiz', quizRouter);
router.use('/api/user/:userId/course', courseRouter);
router.use('/api/user/:userId/lecture', lectureRouter);
router.use('/api/user/:userId/course', courseRouter);
router.use('/api/course/:courseId/lecture', lectureRouter);
router.use('/api/course/:courseId/module', moduleRouter);
router.use('/api/lecture/:lectureId/quiz', quizRouter);

export default router;
