import express from "express";
import cors from "cors";
import path from "path";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import Promise from "bluebird";
import auth from "./routes/auth";
import users from "./routes/users";
import posts from "./routes/posts";
import blog from "./routes/blog";
import uploadErrors from "./middlewares/errors";

dotenv.config();

const corsOptions = {
	origin: "*",
	optionsSuccessStatus: 200,
};

const app = express();
app.use(bodyParser.json());
app.use(uploadErrors);
app.use(express.static(path.join(__dirname, "public")));
app.use(cors(corsOptions));
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URL, { useMongoClient: true });

app.use("/api/auth", auth);
app.use("/api/users", users);
app.use("/api/posts", posts);
app.use("/api/blog", blog);

app.get("/*", (req, res) => {
	res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.listen(8080, () => console.log("Running on localhost:8080"));
