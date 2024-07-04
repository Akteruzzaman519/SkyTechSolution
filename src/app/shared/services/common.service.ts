import { HttpClient, HttpUrlEncodingCodec } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable()
export class CommonService {

	readonly urlCodec: HttpUrlEncodingCodec;
	readonly apiBaseUrl: string;
	readonly isDevelopment = false;

	constructor(
		public http: HttpClient
	) {
		this.urlCodec = new HttpUrlEncodingCodec();
		this.apiBaseUrl = environment.apiBaseUrl;
	}





	objectToUrlEncodedString(obj: any): string {
		let searchString: string[] = [];
		for (const prop in obj) {
			if (!obj.hasOwnProperty(prop)) {
				continue;
			}
			searchString.push(`${prop}=${this.urlCodec.encodeValue(obj[prop])}`);
		}
		return searchString.join('&');
	}
}
