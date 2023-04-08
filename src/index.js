const express = require("express");
const app = express();

const crawlRoutes = require("./routes/crawlRoutes");

app.use("/api", crawlRoutes);

const port = 3000;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
