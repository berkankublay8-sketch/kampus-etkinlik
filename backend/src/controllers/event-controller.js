import mongoose from "mongoose";
import { Event } from "../models/event-model.js";

export async function getEvents(req, res, next) {
  try {
    const { category } = req.query;
    if (category && typeof category !== "string") return res.json([]);
    const filter = category ? { category } : {};
    const events = await Event.find(filter).sort({ date: 1 });
    res.json(events);
  } catch (error) {
    next(error);
  }
}

export async function getEventById(req, res, next) {
  try {
    const { id } = req.params;
    const event = mongoose.isValidObjectId(id) ? await Event.findById(id) : null;
    if (!event) {
      return res.status(404).json({ error: { message: "Event not found" } });
    }
    res.json(event);
  } catch (error) {
    next(error);
  }
}

export async function createEvent(req, res, next) {
  try {
    const { title, category, capacity, date, time, location, description } = req.body ?? {};
    const event = await Event.create({ title, category, capacity, date, time, location, description });
    res.status(201).json(event);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: { message: error.message } });
    }
    next(error);
  }
}
