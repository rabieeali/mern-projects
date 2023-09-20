import { Router } from 'express'
import { Variables } from '../constants'
import { crushRouter } from './crush'

export const AllRoutes = Router()

AllRoutes.use(Variables.ROUTE_CRUSHES, crushRouter)