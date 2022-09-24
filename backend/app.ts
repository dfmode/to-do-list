import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import routes from "./routes/routes.js";

const appPort = 8080;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(routes.userRouter);
app.use(routes.taskRouter);

const server = app.listen(appPort, () => {
    console.log(`Server started on port ${appPort}`);
});
