import express from "express";
import morgan from "morgan";
import path from "path";
import router from "./routes";
import config from "./config";
import passport from "passport";
import "./middleware/bearerstrategy";
import "./middleware/localstrategy";

const app = express();

app.use(express.static("public"));
app.use(passport.initialize());
app.use(express.json());
app.use(morgan("dev"));

app.use(router);

app.use(
  "*",
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      res.sendFile(path.join(__dirname, "../public/index.html"));
    } catch (error) {
      next(error);
    }
  }
);

app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.log(err);
    res.status(500).json({ name: err.name, msg: err.message });
  }
);

app.listen(config.port, () =>
  console.log("Server listening on port " + config.port)
);
