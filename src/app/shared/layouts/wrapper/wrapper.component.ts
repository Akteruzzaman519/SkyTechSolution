import { AfterContentInit, AfterViewInit, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { MenuBarComponent } from '../menu-bar/menu-bar.component';
import { MenuBarV2Component } from '../menu-bar-v2/menu-bar-v.component';

@Component({
	selector: 'app-wrapper',
	templateUrl: './wrapper.component.html',
	styleUrls: ['./wrapper.component.css']
})
export class WrapperComponent implements OnInit, AfterContentInit {

	// @ViewChild('menuBar', { static: true }) menuBar: MenuBarComponent;
	@ViewChild('menuBar', { static: true }) menuBar: MenuBarV2Component;
	@ViewChild('footer', { static: true }) footer: FooterComponent;

	screenHeight = 100;
	screenWidth = 100;
	contentHeight: number;

	@HostListener('window:resize', ['$event'])
	getScreenSize(event: any) {
		this.screenHeight = window.innerHeight;
		this.screenWidth = window.innerWidth;
		this.setContentHeight();
	}

	constructor() {
		this.getScreenSize('');
	}

	ngAfterContentInit(): void {
		this.setContentHeight();
	}

	ngOnInit(): void {
		this.contentHeight = 100;
	}

	private setContentHeight() {
		if (this.menuBar && this.footer) {
			const menuHeight = this.menuBar.navBar.nativeElement.offsetHeight;
			const footerHeight = this.footer.footerL.nativeElement.offsetHeight;
			this.contentHeight = this.screenHeight - (menuHeight + footerHeight) - 1;
		}
	}

}
