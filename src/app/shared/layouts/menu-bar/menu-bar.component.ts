import { ILogInUser } from './../../models/login-user.model';
import { AuthService } from 'shared/auth/auth.service';
import { Menu } from './../../models/menu.model';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';

@Component({
	selector: 'app-menu-bar',
	templateUrl: './menu-bar.component.html',
	styleUrls: ['./menu-bar.component.css'],
	providers: [{ provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } }]
})
export class MenuBarComponent implements OnInit {

	@ViewChild('navBar', { static: true }) navBar: ElementRef;

	isCollapsed = true;
	menus: Menu[] = [];
	user: ILogInUser;

	constructor(private authService: AuthService) { }

	ngOnInit(): void {

		this.user = this.authService.currentUser ?? new ILogInUser();

		this.authService.getMenu()
			.subscribe({
				next: (response) => {
					console.log(response);
					// this.menus = JSON.parse(response);

					this.menus = response ?? [];
					console.log(this.menus);
					// console.log(this.menus.length);
				},
				error: (error) => {
					console.log(error);
				}
			});
	}

	logout() {
		this.authService.logout();
	}

}
