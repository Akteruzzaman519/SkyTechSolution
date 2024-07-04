import { ILogInUser } from '../../models/login-user.model';
import { AuthService } from 'shared/auth/auth.service';
import { Menu } from '../../models/menu.model';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';

@Component({
	selector: 'app-menu-bar-v',
	templateUrl: './menu-bar-v.component.html',
	styleUrls: ['./menu-bar-v.component.css'],
	providers: [{ provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } }]
})
export class MenuBarV2Component implements OnInit {

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




			document.addEventListener("DOMContentLoaded", function(){


				/////// Prevent closing from click inside dropdown
			  document.querySelectorAll('.dropdown-menu').forEach(function(element){
				  element.addEventListener('click', function (e) {
					 e.stopPropagation();
				  });
			  })



			  // make it as accordion for smaller screens
			  if (window.innerWidth < 992) {

				  // close all inner dropdowns when parent is closed
				  document.querySelectorAll('.navbar .dropdown').forEach(function(everydropdown){
					  everydropdown.addEventListener('hidden.bs.dropdown', function () {
						  // after dropdown is hidden, then find all submenus
							 document.querySelectorAll('.submenu').forEach(function(everysubmenu: any){
								 // hide every submenu as well
								 everysubmenu.style.display = 'none';
							 });
					  })
				  });

				  document.querySelectorAll('.dropdown-menu a').forEach(function(element){
					  element.addEventListener('click', function (e) {

							 let nextEl = element.nextElementSibling as any;
							 if(nextEl && nextEl.classList.contains('submenu')) {
								 // prevent opening link if link needs to open dropdown
								 e.preventDefault();
								 console.log(nextEl);
								 if(nextEl.style.display == 'block'){
									 nextEl.style.display = 'none';
								 } else {
									 nextEl.style.display = 'block';
								 }

							 }
					  });
				  })
			  }
			  // end if innerWidth

		  });
	}

	MenuClick(oTempMenu : Menu){
		localStorage.setItem("menuPermission", JSON.stringify(oTempMenu))
	}

	logout() {
		this.authService.logout();
	}

}
