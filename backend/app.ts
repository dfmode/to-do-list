import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import userRouter from "./routes/routes.js";

const appPort = 3000;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(userRouter);

const server = app.listen(appPort, () => {
    console.log(`Server started on port ${appPort}`);
})
