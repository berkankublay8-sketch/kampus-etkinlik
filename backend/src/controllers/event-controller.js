import mongoose from "mongoose";
import { Event } from "../models/event-model.js";
import { todayStart } from "../utils/date.js";

const eventFields = ["title", "category", "capacity", "date", "time", "location", "description"];
const protectedFields = ["_id", "createdAt", "updatedAt", "__v"];

function notFound(res) {
  return res.status(404).json({ error: { message: "Event not found" } });
}

function badRequest(res, message) {
  return res.status(400).json({ error: { message } });
}

function handleWriteError(error, res, next) {
  if (error.name === "ValidationError" || error.name === "CastError") {
    return badRequest(res, error.message);
  }
  next(error);
}

export async function getEvents(req, res, next) {
  try {
    const { category, search } = req.query;
    if ((category && typeof category !== "string") || (search && typeof search !== "string")) {
      return res.json([]);
    }

    const filter = {};
    if (category) filter.category = category;
    if (search) {
      const literal = search.replace(/[.*+?^\x24{}()|[\]\\]/g, "\\$&");
      filter.title = { $regex: literal, $options: "i" };
    }
    res.json(await Event.find(filter).sort({ date: 1 }));
  } catch (error) {
    next(error);
  }
}

export async function getUpcomingEvents(_req, res, next) {
  try {
    const events = await Event.find({ date: { $gte: todayStart() } }).sort({ date: 1, time: 1 });
    res.json(events);
  } catch (error) {
    next(error);
  }
}

export async function getEventById(req, res, next) {
  try {
    const { id } = req.params;
    const event = mongoose.isValidObjectId(id) ? await Event.findById(id) : null;
    if (!event) return notFound(res);
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
    handleWriteError(error, res, next);
  }
}

export async function updateEvent(req, res, next) {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) return notFound(res);
    const body = req.body ?? {};
    if (typeof body !== "object" || Array.isArray(body)) {
      return badRequest(res, "Body must be a JSON object");
    }

    const keys = Object.keys(body);
    if (!keys.length) return badRequest(res, "Body is empty");

    const protectedKeys = keys.filter((key) => protectedFields.includes(key));
    if (protectedKeys.length) return badRequest(res, protectedKeys.join(", ") + " cannot be changed");
    if (keys.some((key) => !eventFields.includes(key))) return badRequest(res, "Unknown event field");

    const event = await Event.findByIdAndUpdate(id, { $set: body }, {
      returnDocument: "after",
      runValidators: true,
    });
    if (!event) return notFound(res);
    res.json(event);
  } catch (error) {
    handleWriteError(error, res, next);
  }
}

export async function deleteEvent(req, res, next) {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id) || !(await Event.findByIdAndDelete(id))) return notFound(res);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
}
