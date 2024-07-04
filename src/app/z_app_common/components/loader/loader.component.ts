import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderService } from '../../services/loader.service';

@Component({
	selector: 'app-loader',
	templateUrl: './loader.component.html',
	styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit, OnDestroy {

	show = false;
	message = "";
	private subscription: Subscription;

	constructor(private loaderService: LoaderService) { }

	ngOnInit() {
		this.subscription = this.loaderService.loaderState
		.subscribe(requestList => {
			if(requestList.length > 0) {
				this.show = true;
				this.message = requestList[0].message;
			}
			else {
				this.show = false;
			}
		});
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

}
