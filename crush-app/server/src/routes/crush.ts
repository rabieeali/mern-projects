import { Router } from 'express'
import { CrushController } from '../controllers/crush.controller'

export const crushRouter = Router()

crushRouter.get('/', new CrushController().getCrushes)
crushRouter.get('/:id', new CrushController().getCrushById)
crushRouter.post('/', new CrushController().addCrush)
crushRouter.put('/:id', new CrushController().updateCrush)
crushRouter.delete('/:id', new CrushController().deleteCrush)
