require("dotenv").config();
require("express-async-errors");

// security packages
const helmet = require("helmet");
const cors = require("cors");

// router
const router = require("./routes/TaskRouter");

// middlewares
const NotFoundMiddleware = require("./middlewares/notFound");
const ErrorHandlerMiddleware = require("./middlewares/errorHandler");

const connectToDB = require("./db/connect");
const express = require("express");
const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

app.get("/", (req, res) => {
  res.status(200).json({ error: false, data: "just random text" });
});

app.use("/api/v1/task", router);

app.use(ErrorHandlerMiddleware);
app.use(NotFoundMiddleware);

const PORT = process.env.PORT || 3000;
const start = async () => {
  await connectToDB(process.env.MONGO_URI)
    .then(() => console.log("DB connected"))
    .catch((err) => console.log(err));
  app.listen(PORT, () =>
    console.log(`server is listening to http://localhost:${PORT}`)
  );
};

start();
