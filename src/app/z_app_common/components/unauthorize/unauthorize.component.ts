import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AuthService } from 'shared/auth/auth.service';

@Component({
	standalone: true,
	imports: [
		RouterModule,
		ToastrModule
	],
	providers: [AuthService],
	templateUrl: './unauthorize.component.html',
	styleUrls: ['./unauthorize.component.css']
})
export class UnauthorizeComponent implements OnInit {

	targetUrl = "";

	constructor(
		private authService: AuthService,
		private toastrService: ToastrService,
		private route: ActivatedRoute
	) { }

	ngOnInit() {
		this.route.queryParams
			.subscribe(params => {
				this.targetUrl = params['targetURL'];
			});
	}

	onHelpClick() {
		this.toastrService.warning('Not implemented');
	}


	onReturnToLogin() {
		this.authService.logout();
	}

}
