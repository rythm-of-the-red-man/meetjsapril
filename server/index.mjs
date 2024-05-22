import express from "express";
import expressWs from "express-ws";
import cors from "cors";
const app = express();
const port = 65534;
const wsMain = expressWs(app);
let ropeX = 0;
app.use(cors());

app.post("/app/reset", (req, res) => {
  ropeX = 0;
  for (let client of wsMain.getWss().clients) {
    client.send(ropeX);
  }
  res.sendStatus(200);
});

app.get("/app/initial", (req, res) => {
  res.json({ position: ropeX });
});
app.ws("/app/red", function (ws, req) {
  ws.on("message", function (msg) {
    if (ropeX > -20 && ropeX < 20) {
      ropeX += 1;
    }
    for (let client of wsMain.getWss().clients) {
      client.send(ropeX);
    }
  });
});

app.ws("/app/blue", function (ws, req) {
  ws.on("message", function (msg) {
    if (ropeX > -20 && ropeX < 20) {
      ropeX -= 1;
    }

    for (let client of wsMain.getWss().clients) {
      client.send(ropeX);
    }
  });
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
