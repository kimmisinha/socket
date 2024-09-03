import express from "express";
import { WebSocketServer } from "ws";

const app = express();
const port = 5050;

// Start the HTTP server
const server = app.listen(port, () => {
  console.log("Server is running on port", port);
});

// Create the WebSocket server using the existing HTTP server
const wss = new WebSocketServer({ server });

// Handle WebSocket connections
wss.on("connection", (ws) => {
  console.log("New client connected");

  ws.on("message", (data) => {
    console.log("Data from client: %s", data); 
    ws.send("Thanks, buddy!"); 
  });

  // Handle errors
  ws.on("error", (error) => {
    console.error("WebSocket error:", error);
  });

  // Handle disconnections
  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

