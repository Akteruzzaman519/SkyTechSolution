import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, of, take } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable({
	providedIn: 'root'
})
export abstract class CustomAuthGuard implements CanActivate {

	constructor(public authService: AuthService, public router: Router) { }

	canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

        return this.authService.isLoggedIn
			.pipe(
				take(1),
				map((isLoggedIn: boolean) => {
                    // return true;
					if (!isLoggedIn) {
						this.router.navigate(['/login']);
						return false;
					}
                    else {
                        const targetUrl = this.fixTargetUrl(state.url);

                        if(this.handleRoute(targetUrl)) {
                            return true;
                        }
                        else {                            
                            this.router.navigate(['/unauthorized'], {queryParams: {targetURL: targetUrl}});
                            return false;
                        }
                    }
				})
			);
	}

	private handleRoute(url: string) : boolean {
        console.log(url);
        const menus = this.authService.decodeMenuToken();
        console.log(menus);
        if(!menus)
            return false;

        let matched = false;

        menus.forEach(menu => {

            if(!matched) {
                if(menu.MenuURL == url) {
                    console.log("matched => ", menu);
                    matched = true;
                }
    
                if(menu.SubMenus != null && menu.SubMenus.length > 0 && !matched) {
                    menu.SubMenus.forEach(subMenu => {
                        if(!matched) {
                            if(subMenu.SubMenuURL == url) {
                                console.log("matched Submenu => ", subMenu);
                                matched = true;
                            }                        }
                        
                    });
                }
            }
            
        });

        return matched;
    };

	private fixTargetUrl(url : string) {
		if(url.startsWith('/')) {
			url = url.substr(1, url.length);
		}
		return url;
	}
}