export class User {
    public constructor(
		public id: number = 0,
		public name: string = "",
		public lastname: string = "",
		public username: string = "",
		public email: string = "",
		public avatar_url: string | null=null,
		public password_hash: string = ""
    ) { }
}
