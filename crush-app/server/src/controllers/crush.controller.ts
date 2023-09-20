import { Request, Response } from 'express';
import { CrushModel } from '../models/crush.model';
import { isValidObjectId, responser } from '../lib';


export class CrushController {

    //@ GET
    async getCrushes(req: Request, res: Response) {
        const crushes = await CrushModel.find()
        return res.status(200).json(responser(200, 'successful', crushes))
    }

    //@ GET/:id
    async getCrushById(req: Request, res: Response) {
        const { id } = req.params
        const isIdValid = isValidObjectId(id)
        if (!isIdValid) return res.status(404).json(responser(404, 'crush not found', ''))
        const crush = await CrushModel.find({ _id: id })
        if (!crush) return res.status(404).json(responser(404, 'crush not found', ''))
        return res.status(200).json(responser(200, 'successful', crush))
    }

    //@ POST
    async addCrush(req: Request, res: Response) {
        const { name, origin, attractiveness } = req.body
        if (!name || !origin || !attractiveness) return res.status(400).json(responser(400, 'all fields are required', ''))
        const foundCrush = await CrushModel.findOne({ name })
        if (foundCrush) return res.status(400).json(responser(400, 'crush already exists', ''))
        if (attractiveness < 1 || attractiveness > 5) return res.status(400).json(responser(400, 'attractiveness should be between 1 and 5', ''))
        const newCrush = await CrushModel.create({ name, origin, attractiveness })
        return res.status(201).json(responser(201, 'crush added successfully', newCrush))
    }

    //@ PUT/:id
    async updateCrush(req: Request, res: Response) {
        const { name, origin, attractiveness } = req.body
        const { id } = req.params
        const isIdValid = isValidObjectId(id)
        if (!isIdValid) return res.status(400).json(responser(404, 'crush not found', ''))
        if (!name || !origin || !attractiveness) return res.status(400).json(responser(400, 'bad request', 'all fields are required'))
        const existingCrush = await CrushModel.findOne({ _id: id });
        if (!existingCrush) return res.status(404).json(responser(404, 'crush not found', ''))
        existingCrush.name = name;
        existingCrush.origin = origin;
        existingCrush.attractiveness = attractiveness;
        const updatedCrush =  await existingCrush.save();
        return res.status(200).json(responser(200, 'crush updated successfully', updatedCrush))
    }

    //@ DELETE/:id
    async deleteCrush(req: Request, res: Response) {
        const { id } = req.params
        const isIdValid = isValidObjectId(id)
        if (!isIdValid) return res.status(400).json(responser(404, 'crush not found', ''))
        const crush = await CrushModel.findOne({ _id: id });
        if (!crush) return res.status(404).json(responser(404, 'crush not found', ''))
        await crush.deleteOne()
        return res.status(200).json(responser(200, 'crush deleted successfully', ''))
    }
}
