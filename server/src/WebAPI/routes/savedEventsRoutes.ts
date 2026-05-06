import { Router } from "express";
import { pool } from "../../config/db";
import { SavedEventsRepository } from "../../Database/repositories/SavedEventsRepository";
import { SavedEventsService } from "../../Services/SavedEventsService";
import { SavedEventsController } from "../controllers/SavedEventsController";
import { authenticate } from "../../middleware/authMiddleware";

const router = Router();

const savedEventsRepository = new SavedEventsRepository(pool);
const savedEventsService = new SavedEventsService(savedEventsRepository);
const savedEventsController = new SavedEventsController(savedEventsService);

router.get("/me", authenticate, savedEventsController.getMySavedEvents);
router.post("/", authenticate, savedEventsController.saveEvent);
router.delete(
    "/:eventExternalId",
    authenticate,
    savedEventsController.removeSavedEvent
);

export default router;