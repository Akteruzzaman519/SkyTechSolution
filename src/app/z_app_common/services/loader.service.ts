import { HttpUrlEncodingCodec } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpRequestInfo } from '../models/http-request-info.model';

@Injectable({
	providedIn: 'root'
})
export class LoaderService {

	private loaderSubject = new Subject<HttpRequestInfo[]>();

	requestList : HttpRequestInfo[] = [];

	loaderState = this.loaderSubject.asObservable();

	urlCodec: HttpUrlEncodingCodec;

	constructor() { 
		this.urlCodec = new HttpUrlEncodingCodec();
	}

	add(req: HttpRequestInfo) {
		if(req.message) {
			req.message = this.urlCodec.decodeValue(req.message);
		}	

		this.requestList.push(req);
		this.loaderSubject.next(this.requestList);
	}

	remove(req: HttpRequestInfo) {
		var index = this.requestList.findIndex(r => r.request_id == req.request_id);
		if(index >= 0) {
			this.requestList.splice(index, 1);
			this.loaderSubject.next(this.requestList);
		}
	}
}
