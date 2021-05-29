import { Router } from "express";
import moduleController from "../../controllers/module.controller"

const moduleRouter = Router({ mergeParams: true });

moduleRouter.get('/:id', moduleController.findById);
moduleRouter.get('/', moduleController.findAll);

export default moduleRouter;