export class SavedEvents {
    public constructor(
        public id: number,
        public user_id: number,
        public event_external_id: string,
        public event_title: string,
        public event_category: string | null,
        public event_date: string | null,
        public event_time: string | null,
        public event_venue: string | null,
        public event_city: string | null,
        public event_country: string | null,
        public event_image_url: string | null,
        public event_link: string | null,
        public event_price_min: number | null,
        public event_price_max: number | null,
        public event_currency: string | null
    ) { }
}