export class HttpRequestInfo {

	request_id: string;

	constructor(public message : string, public url: string) {
		let date = new Date();
		this.request_id = date.getTime().toString();
	}
}