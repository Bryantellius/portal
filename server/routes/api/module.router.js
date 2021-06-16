import { Router } from "express";
import moduleController from "../../controllers/module.controller"

const moduleRouter = Router({ mergeParams: true });

moduleRouter.get('/', moduleController.findAll);
moduleRouter.get('/:id', moduleController.findById);

export default moduleRouter;