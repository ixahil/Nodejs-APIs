import { configDotenv } from "dotenv";
import express from "express";
import { connectDB } from "./config/db.conf.js";
import { authRouter } from "./routes/auth.route.js";
import { userRouter } from "./routes/user.route.js";
import morgan from "morgan";
import { ErrorHandler } from "./middleware/errorHandler.js";
import cookieParser from "cookie-parser";
import { AppError } from "./utils/AppError.js";
import swaggerUi from "swagger-ui-express";
import swaggerOutput from "./utils/swagger-output.json" assert { type: "json" };
import { productRouter } from "./routes/product.routes.js";
import fileUpload from "express-fileupload";
import { mediaRouter } from "./routes/media.route.js";
import { brandRouter } from "./routes/brand.route.js";
import { collectionRouter } from "./routes/collection.route.js";

configDotenv();

const PORT = process.env.PORT;

const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());
app.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp/" }));

// Routes
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerOutput));

app.get("/api/v1", (req, res) => res.send("welcome"));
app.use(
  "/api/v1/",
  authRouter,
  userRouter,
  productRouter,
  mediaRouter,
  brandRouter,
  collectionRouter
);

// Error Handlers Middlewares
app.use((req, res, next) => {
  next(new AppError(404, `Route ${req.originalUrl} not found`));
});

app.use(ErrorHandler);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server started on port ${PORT}`);
  // swaggerDocs(app, PORT);
});
