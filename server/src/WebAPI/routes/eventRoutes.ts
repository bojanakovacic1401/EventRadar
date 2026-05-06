import { Router } from "express";
import { TicketmasterService } from "../../Services/TicketmasterService";
import { EventController } from "../controllers/EventController";

const router = Router();

const ticketmasterService = new TicketmasterService();
const eventController = new EventController(ticketmasterService);

router.get("/search", eventController.searchEvents);

export default router;