import express from "express";
import { WebSocketServer } from "ws";

const app = express();
const port = 5050;

const server = app.listen(port, () => {
  console.log("Server is running on port", port);
});

const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  console.log("New client connected");

  ws.on("message", (data) => {
    // Convert Buffer data to string
    const clientMessage = data.toString();
    console.log("Data from client:%s", clientMessage);

    let response = "";
    if (clientMessage) {
      response = `You said: "${clientMessage}". Is there anything specific you want to discuss?`;
    }
    ws.send(response);
  });

  ws.on("error", (error) => {
    console.error("WebSocket error:", error.message);
  });

  ws.on("close", (code, reason) => {
    console.log(`Client disconnected with code: ${code}, reason: ${reason}`);
  });

  ws.on("abort", () => {
    console.warn("Connection aborted by the client");
  });
});
