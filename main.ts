// @deno-types="npm:@types/express@4"
import express, { NextFunction, Request, Response } from "express";
import { DataLayerEventType } from "./types/types.ts";

// GOAL: Store events, send back failure or success so FE event buffer service can process
const app = express();
const port = 8000;

app.use(express.json());

const events: DataLayerEventType[] = [];

app.get("/", (_req, res) => {
  res.status(200).send("Welcome to the event backend service!");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

app.post("/events", (_req, res) => {
  try {
    // Log the incoming event for debugging
    console.log("Received event:", _req.body);
    console.log("response", res);

    events.push(_req.body);

    res.status(200).json({
      message: "Events received successfully",
      eventCount: events.length,
    });
  } catch (error) {
    console.error("Error processing event:", error);

    res.status(500).json({
      error: "Failed to process event",
    });
  }
});
