import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, of, throwError, tap } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';
import { map } from 'rxjs/internal/operators/map';
import { take } from 'rxjs/internal/operators/take';
import { ILogInUser, LoginUser } from 'shared/models/login-user.model';
import { Menu } from 'shared/models/menu.model';
import { environment } from './../../../environments/environment';


@Injectable({
	providedIn: 'root'
})

export class AuthService {

	private loggedIn = new BehaviorSubject<boolean>(false);


	constructor(
		private router: Router,
		private http: HttpClient
	) {

	}


	login(user: LoginUser) {
		const options = {
			headers: new HttpHeaders({
				'Show-Loader': 'true',
				'Loading-Message': "Logging in"
			})
		};

		const request = {
			username: user.username,
			userPassword: user.password,
			userFcmToken: ''
		};

		// return this.http.post(`${environment.apiBaseUrl}/auth`, request, options);
		return this.http.post(`${environment.apiBaseUrl}/auth/login`, request, options)
			.pipe(
				take(1),
				tap((response: any) => {
					if(response.hasOwnProperty('token')) {
						this.storeLoggedInInformation(response['token']);
					}
					if(response.hasOwnProperty('menuToken')) {
						this.saveMenuToken(response['menuToken']);
					}
				}),
				catchError(error => {
					return throwError(() => error);
				})
			);
	}

	// Log out user.
	// send a logout request to server and
	// if successful, remove token and user from local storage and return true
	// if failed, return false.
	logout(): void {
		this.removeLoggedInInformation();
		this.router.navigate(['/login'])
			.then(() => {
				window.location.reload();
			});
	}



	// get preferredLanguage(): string {
	// 	let lang = getSelectedLanguageCode();
	// 	return lang;
	// }

	// set preferredLanguage(lang: string) {
	// 	localStorage.setItem('preferred-language', lang);
	// }

	// get userLanguageId(): number {
	// 	let langId = getSelectedLanguageId();
	// 	return langId;
	// }

	// Get the user logged in status.
	get isLoggedIn(): Observable<boolean> {
		let status = true;
		let token = localStorage.getItem('access-token');
		if (!token) {
			status = false;
			this.loggedIn.next(status);
		}
		else if (this.isTokenExpired()) {
			status = false;
			this.loggedIn.next(status);
		}

		if (status) {
			this.loggedIn.next(status);
		}
		else {
			this.removeLoggedInInformation();
		}
		//  this.loggedIn.next(status);
		return this.loggedIn.asObservable();
	}

	// Return the current logged in user instance
	// from localstorage after decoding jwt token.
	get currentUser(): ILogInUser | null {
		const helper = new JwtHelperService();
		let token = localStorage.getItem('access-token');
		if (!token)
			return null;

		const decodedToken = helper.decodeToken(token);
		// console.log(decodedToken);

		let decodedObject: ILogInUser = {
			userId: decodedToken['UserSystemId'],
			userName: decodedToken['UserName'],
			userBranchName: decodedToken['UserBranchName'],
			role: decodedToken['UserRoleName'],
			name: decodedToken['UserFullName'],
			language: 2,
			exp: decodedToken['exp'],
		};

		// console.log(decodedObject);
		return decodedObject;
	}

	// Store logged in user data into local storage.
	private storeLoggedInInformation(token: string) {
		localStorage.setItem('access-token', token);
	}

	// Remove logged in user data from local storage.
	removeLoggedInInformation() {
		this.loggedIn.next(false);
		localStorage.removeItem('access-token');
		localStorage.removeItem('menu-token');
	}


	get isAdmin(): boolean {
		return this.userIsInRole("admin");
	}

	// Find out if logged in user has certain authorization.
	userIsInRole(role: string): boolean {

		let user = this.currentUser;
		if (!user)
			return false;

		let roleOfUser = this.currentUser?.role;
		if (!roleOfUser)
			return false;

		return roleOfUser.toLowerCase() === role.toLowerCase();
	}

	// Check if token is expired or not.
	isTokenExpired(): boolean {
		let token = localStorage.getItem('access-token');

		if (!token)
			return true;

		const date = this.getTokenExpirationDate(token);
		// console.warn('Expiration date => ', date);

		if (date === undefined || date === null) {
			return false;
		}
		var access = !((date ? date.valueOf() : 0) > new Date().valueOf());
		return access;
	}

	// Return token expiration date.
	getTokenExpirationDate(token: string): Date | null {
		const decoded = this.currentUser;

		if (!decoded || decoded.exp === undefined) return null;

		const date = new Date(0);
		date.setUTCSeconds(decoded.exp);
		return date;
	}

	getMenu() {
		const savedMenuFromToken = this.decodeMenuToken();
		if (savedMenuFromToken) {
			return of(savedMenuFromToken);
		}
		else {
			return this.http.get<any>(`${environment.apiBaseUrl}/auth/GetUserMenus`)
				.pipe(
					take(1),
					map((response: any) => {
						if (response['data']) {
							this.saveMenuToken(response['data']);
							return this.decodeMenuToken();
						}
						else {
							return null;
						}
					}),
					catchError(error => {
						throw error;
					})
				);
		}

	}

	decodeMenuToken(): Menu[] | null {
		const helper = new JwtHelperService();
		const menuToken = localStorage.getItem('menu-token');
		if (!menuToken)
			return null;

		const decodedMenuToken = helper.decodeToken(menuToken);

		if (decodedMenuToken['UserMenus']) {
			return JSON.parse(decodedMenuToken['UserMenus']);
		}

		return null;
	}

	private saveMenuToken(token: string) {
		localStorage.setItem('menu-token', token);
	}
}

export enum Roles {
	"cwh" = "cwh",
	"hub" = "hub",
	"merchant" = "merchant",
	"hub_user" = "hub_user"
}
