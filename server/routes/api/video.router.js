import express from 'express';
import videoController from '../../controllers/video.controller';

const router = express.Router({ mergeParams: true });

router.get('/search/:query', videoController.findByTitle);

export default router;