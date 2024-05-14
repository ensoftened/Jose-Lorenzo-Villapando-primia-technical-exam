import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import systemUserRoutes from "./routes/systemUser.routes.js";
import positionRoutes from "./routes/position.routes.js";
import positionCandidateRoutes from "./routes/positionCandidate.routes.js";
import createError from "http-errors";
// import notesRoute from "./src/resources/notes/notes.routes.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

//middleware
app.use(
  cors()
  // corsOptions
);
app.use(express.json());

// api routes
app.use("/api/system-user/", systemUserRoutes);
app.use("/api/position/", positionRoutes);
app.use("/api/position-candidate/", positionCandidateRoutes);

app.use(async (req, res, next) => {
  console.log("CREATING. . .");
  next(createError.NotFound("This route does not exist"));
});
app.use((err, req, res, next) => {
  //console.log("ERR!!!", err.message);
  res.status(err.status || 500).json({
    message: err.message,
  });
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
