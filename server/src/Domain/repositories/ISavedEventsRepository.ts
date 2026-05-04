import { SavedEvents } from "../models/SavedEvents"; //tacke su koliko foldera u nazad idem

export type CreateSavedEvent = {
    user_id: number;
    event_external_id: string;
    event_title: string;
    event_category: string;
    event_date: Date;
    event_location: string;
    event_link: string;
};

export interface ISavedEventsRepository {
    create(event: CreateSavedEvent): Promise<SavedEvents>; //create cuva
    //Vraća Promise<SavedEvent> jer radi sa bazom, a baza je asinhrona.
    findByUserId(userId: number): Promise<SavedEvents[]>;
    //[] jer vraca niz svih sacuvanih
    delete(userId: number, eventExternalId: string): Promise<void>, //void jer je prazno na kraju
    exists(userId: number, eventExternalId: string): Promise<boolean>;
    //boolean true ili false, tj proverava jel korisnik vec sacuvao taj dogadjaj
}