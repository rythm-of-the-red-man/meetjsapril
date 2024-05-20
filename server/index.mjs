import express from "express";
import expressWs from "express-ws";

const app = express();
const port = 3000;
const wsMain = expressWs(app);
let ropeX = 0;

app.post("/reset", (req, res) => {
  ropeX = 0;
  for (let client of wsMain.getWss().clients) {
    client.send(ropeX);
  }
});
app.ws("/red", function (ws, req) {
  ws.on("message", function (msg) {
    ropeX += 1;
    ws.send(ropeX);
  });
});

app.ws("/blue", function (ws, req) {
  ws.on("message", function (msg) {
    ropeX -= 1;
    for (let client of wsMain.getWss().clients) {
      client.send(ropeX);
    }
  });
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
