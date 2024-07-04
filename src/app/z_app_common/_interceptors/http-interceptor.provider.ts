import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthenticationInterceptor } from "./authentication.interceptor";
import { LoaderInterceptor } from "./loader.interceptor";

export const HttpInterceptorsProvider = [
	{ provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true },
	{ provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
]
