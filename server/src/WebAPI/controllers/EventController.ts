import { NextFunction, Request, Response } from "express";
import { TicketmasterService } from "../../Services/TicketmasterService";

export class EventController {
    public constructor(private ticketmasterService: TicketmasterService) { }

    public searchEvents = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const result = await this.ticketmasterService.searchEvents({
                city: this.getStringQuery(req.query.city),
                countryCode: this.getStringQuery(req.query.countryCode),
                keyword: this.getStringQuery(req.query.keyword),
                category: this.getStringQuery(req.query.category),
                classificationName: this.getStringQuery(req.query.classificationName),
                startDate: this.getStringQuery(req.query.startDate),
                endDate: this.getStringQuery(req.query.endDate),
                startDateTime: this.getStringQuery(req.query.startDateTime),
                endDateTime: this.getStringQuery(req.query.endDateTime),
                page: this.getNumberQuery(req.query.page),
                size: this.getNumberQuery(req.query.size),
                sort: this.getStringQuery(req.query.sort),
            });

            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    };

    private getStringQuery(value: unknown): string | undefined {
        if (typeof value !== "string") {
            return undefined;
        }

        const trimmed = value.trim();

        return trimmed.length > 0 ? trimmed : undefined;
    }

    private getNumberQuery(value: unknown): number | undefined {
        if (typeof value !== "string") {
            return undefined;
        }

        const number = Number(value);

        return Number.isFinite(number) ? number : undefined;
    }
}