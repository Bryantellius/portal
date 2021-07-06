import { Router } from 'express';
import moduleController from '../../controllers/module.controller';

const moduleRouter = Router({ mergeParams: true });

moduleRouter.get('', moduleController.findAll);
moduleRouter.get('/', moduleController.findAll);
moduleRouter.get('/:id', moduleController.findById);
moduleRouter.put('/:id', moduleController.upsertModule);
moduleRouter.post('/', moduleController.upsertModule);
export default moduleRouter;