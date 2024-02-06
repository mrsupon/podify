import express from "express";
import logger from "morgan";
import cors from "cors";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import "dotenv/config";

import { errorHandler, errorNotFoundHandler } from "./middlewares/apiErrorHandler.js";
import ApiRoute from "./routes/api/api.js";
import Helper from "./utils/helper.js";
import env from "./utils/variables.js";

// Routes
//import { index } from './routes/index.js';
// Create Express server
const app = express();

// Express configuration
app.set("port", env.PORT || 3000);
//const __dirname = dirname(fileURLToPath(import.meta.url));
//app.set('views', path.join(__dirname, '../views'));
//app.set('view engine', 'ejs');
Helper.__dir = dirname(fileURLToPath(import.meta.url));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
console.log(path.resolve("./public"));
app.use(express.static(path.resolve("./public")));
app.use(logger("dev"));

app.use(cors());
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     next();
// });

app.use(ApiRoute);

app.use(errorNotFoundHandler);
app.use(errorHandler);

export { app };
