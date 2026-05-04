export class SavedEvents {
    public constructor(
        public id: number = 0,
        public user_id: number = 0,

        public event_external_id: string = "",
        public event_title: string = "",
        public event_category: string = "",
        public event_date: Date = new Date(),
        public event_location: string = "",
        public event_link: string = ""
    ) { }
}