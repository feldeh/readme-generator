import express from "express";
import router from "./routes/crawlRoutes.js";

const app = express();

app.use("/api", router);

const port = 3000;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
