import * as dotenv from 'dotenv'
dotenv.config();
import { Application } from './src/server'
const { PORT, DB_URL } = process.env
new Application(PORT!, DB_URL!);