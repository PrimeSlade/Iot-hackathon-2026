import express, { Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import boxRoutes from "./boxes/box.routes";
import mqtt from "mqtt";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: ["http://localhost:5173", process.env.FRONTEND_URL as string], // Replace with your frontend's origin
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"], // Specify allowed HTTP methods
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);

export const client = mqtt.connect(process.env.MQTT_BROKER_URL as string, {
  username: process.env.MQTT_USERNAME,
  password: process.env.MQTT_PASSWORD,
});

client.on("connect", () => {
  console.log("Connected to HiveMQ Cloud!");
});

client.on("error", (err) => {
  console.error("Connection failed:", err);
});

// 1. OPEN Route (Usage: /open/1 or /open/2)
app.get("/open/:id", (req: Request, res: Response) => {
  const id = req.params.id; // Gets "1" or "2" from the URL

  if (client.connected) {
    // Dynamically sends to "cmd/servo1" or "cmd/servo2"
    client.publish(`cmd/servo${id}`, "OPEN");

    console.log(`📡 Opening Servo ${id}`);
    res.json({ status: "success", servo: id, action: "OPEN", angle: 90 });
  } else {
    res.status(503).json({ status: "error", message: "MQTT not connected" });
  }
});

// 2. RESET Route (Usage: /reset/1 or /reset/2)
app.get("/reset/:id", (req: Request, res: Response) => {
  const id = req.params.id;

  if (client.connected) {
    // Dynamically sends to "cmd/servo1" or "cmd/servo2"
    client.publish(`cmd/servo${id}`, "RESET");

    console.log(`📡 Resetting Servo ${id}`);
    res.json({ status: "success", servo: id, action: "RESET", angle: 0 });
  } else {
    res.status(503).json({ status: "error", message: "MQTT not connected" });
  }
});

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use("/boxes", boxRoutes);

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Server is running!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
