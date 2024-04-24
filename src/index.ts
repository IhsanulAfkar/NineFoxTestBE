// src/index.ts
import express from 'express';
import prisma from './utils/db';
import cors from 'cors'
import bodyParser from 'body-parser';
import router from './routes';
const app = express();
const port = process.env.PORT || 3000;
app.use(cors())
app.use(bodyParser.json())
app.use(express.json())
app.use(router)
prisma
    .$connect()
    .then(() => {
        console.log('Connected to the database server');
    })
    .catch((error) => {
        console.log('Failed to connect to the database server:', error);
        process.exit(1);
    });


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
export default app