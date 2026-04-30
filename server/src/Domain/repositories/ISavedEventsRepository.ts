import { SavedEvents } from "../models/SavedEvents"; //tacke su koliko foldera u nazad idem

export interface ISavedEventsRepository {
    create(userId: number, eventId: number): Promise<SavedEvents>; //create cuva
    //Vraća Promise<SavedEvent> jer radi sa bazom, a baza je asinhrona.
    findByUserId(userId: number): Promise<SavedEvents[]>;
    //[] jer vraca niz svih sacuvanih
    delete(userId: number, eventId: number): Promise<void>, //void jer je prazno na kraju
    exists(userId: number, eventId: number): Promise<boolean>;
    //boolean true ili false, tj proverava jel korisnik vec sacuvao taj dogadjaj
}