
import express, { NextFunction, Request, Response } from 'express'
import http from 'http'
import mongoose from 'mongoose'
import cors from 'cors'
import { AllRoutes } from './routes'

export class Application {
    #express = express
    #app = this.#express()
    constructor(PORT: string, DB_URL: string) {
        this.configDatabase(DB_URL)
        this.configApplication()
        this.createServer(PORT)
        this.createRoutes()
        this.errorHandler()
    }
    configApplication() {
        this.#app.use(cors())
        this.#app.use(this.#express.json())
        this.#app.use(this.#express.urlencoded({ extended: true }))
    }

    createServer(PORT: string) {
        const server = http.createServer(this.#app)
        server.listen(PORT, () => console.log(`Server Is Running On Port ${PORT}`))
    }

    configDatabase(DB_URL: string) {
        mongoose
            .connect(DB_URL)
            .then(() => {
                console.log('Connected to DB successfully');
            })
            .catch((err) => {
                throw err;
            });
    }

    errorHandler() {
        this.#app.use((req, res) => {
            return res.status(404).json({
                status: 404,
                success: false,
                message: 'Not found'
            })
        })

        this.#app.use((error: any, req: Request, res: Response) => {
            const status = error?.status || 500
            const message = error?.message || 'internal server error'

            return res.status(status).json({
                status,
                success: false,
                message
            })
        })
    }
    createRoutes() {
        this.#app.get('/', (req, res) => {
            return res.json({
                message: 'Express App Homepage'
            })
        })

        this.#app.use(AllRoutes);
    }
}