import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { LoaderService } from '../services/loader.service';
import { getSelectedLanguageCode } from 'shared/_constants/find-selected-language.function';
import { HttpRequestInfo } from '../models/http-request-info.model';

@Injectable({
	providedIn: 'root'
})
export class LoaderInterceptor implements HttpInterceptor {

	constructor( private loaderService: LoaderService ) { }

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

		let lang = getSelectedLanguageCode();
		req = req.clone({
			setHeaders: {
				'Accept-Language': lang
			}
		});

		
		if(req.url.endsWith(".json")) {
			return next.handle(req);
		}
		else if(req.headers.has('Show-Loader')) {
			req.headers.delete('Show-Loader');

			var requestWrap = new HttpRequestInfo(req.headers.get('Loading-Message') ?? "Loading", req.url);
			this.loaderService.add(requestWrap);

			return next.handle(req)
				.pipe(
					catchError(
						error => {
							return throwError(() => error);
						}
					),
					finalize(() => {
						this.onEnd(requestWrap);
					})
				);
		}
		else {			
			return next.handle(req);
		}
	}

	private onEnd(req: HttpRequestInfo): void {
		this.loaderService.remove(req)
	}
}