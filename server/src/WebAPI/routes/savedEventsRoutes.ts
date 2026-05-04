import { Router } from "express";
import { pool } from "../../config/db";

import { SavedEventsRepository } from "../../Database/repositories/SavedEventsRepository";
import { SavedEventsService } from "../../Services/SavedEventsService";
import { SavedEventsController } from "../controllers/SavedEventsController";

const router = Router();

const savedEventsRepository = new SavedEventsRepository(pool);
const savedEventsService = new SavedEventsService(savedEventsRepository);
const savedEventController = new SavedEventsController(savedEventsService);

router.get("/:userId", savedEventController.getSavedEventsByUser);
router.post("/", savedEventController.saveEvent);
router.delete("/:userId/:eventExternalId", savedEventController.removeSavedEvents);

export default router;