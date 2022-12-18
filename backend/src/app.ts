require('dotenv').config();
import express from 'express';
import cors from 'cors';
import config from 'config';
import validateEnv from './utils/validateEnv';
import { AppDataSource } from './utils/data-source';
import { applicationRouter } from './application.router';

// connect to db
AppDataSource.initialize()
  .then(async () => {
    // validate env variables
    validateEnv();

    const app = express();

    app.use(cors());
    app.use(express.json());
    app.use('/applications', applicationRouter);

    const PORT = config.get<number>('port');
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    });
  })
  .catch((error) => console.log(error));