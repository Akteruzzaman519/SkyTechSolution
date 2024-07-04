import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable({
	providedIn: 'root'
})


export class AuthGuard implements CanActivate {

	constructor(
		private authService: AuthService,
		private router: Router
	) { }

	canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
   //  console.log(next);
   //  console.log(state);
    return of(true);
		// return this.authService.isLoggedIn
		// 	.pipe(
		// 		take(1),
		// 		map((isLoggedIn: boolean) => {
		// 			if (!isLoggedIn) {
		// 				this.router.navigate(['/login']);
		// 				return false;
		// 			}
		// 			return true;
		// 		})
		// 	);
	}
}
