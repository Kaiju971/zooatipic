import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import usersRoutes from "./routes";

const app = express();
const port = 4000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.json());

// CORS implemented so that we don't get errors when trying to access the server from a different server location

app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "POST, GET, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type,Authorization,x-access-token"
  );
  next();
});

app.use("/api/", usersRoutes);

app.listen(port, () => {
  console.log(`App running on port ${port},http://localhost:${port}.`);
});
