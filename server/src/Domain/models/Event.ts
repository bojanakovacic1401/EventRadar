export class Event {
	public constructor(
		public id: number = 0,
		public event_title: string = "",
		public event_description: string = "",
		public category: string = "",
		public event_date: Date = new Date(),
		public event_location: string = "",
		public event_price: number = 0,
		public event_image_url: string | null = null,
		public event_link: string = ""

	) { }
}