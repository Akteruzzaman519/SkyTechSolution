import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AuthService } from 'shared/auth/auth.service';
import { LoginUser } from 'shared/models/login-user.model';

@Component({
	standalone: true,
	imports: [
		CommonModule,
      FormsModule,
      HttpClientModule,
		ToastrModule
	],
	providers: [AuthService],
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	user: LoginUser = {
		username: "",
		password: "",
		userFcmToken: ""
	};
	show = false;
	eyeSlash = true;
	formSubmitted = false;

	private subscription: Subscription;

	constructor(
		private authService: AuthService,
		private toastr: ToastrService,
		private router: Router
	) {

	}

	ngOnInit(): void {
		// this.authService.isLoggedIn
		// 	.subscribe(state => {
		// 		if (state) {
		// 			console.log(state)
		// 			this.router.navigate(['/home']);
		// 		}
		// 	}).unsubscribe();
	}




	showPassword() {
		this.show = !this.show;
		this.eyeSlash = !this.eyeSlash;
	}


	// Login method.
	// First validate username, password and client id.
	// Then post the log in user object.
	// If login successful, redirect to the home page.
	onLogin() {
		this.formSubmitted = true;
		if (this.isLoginObjectValid()) {
			console.log(this.user);
			// return;

			this.authService.login(this.user)
				.subscribe({
					next: (response) => {
						// console.log(response);
						if (response) {
							this.toastr.success("Successfully logged in", "Done");
							this.router.navigate(['/dashboard']);
						}
						else {
							this.toastr.error("Server error", "Failed");
						}
					},
					error: (error) => {
						console.log(error);
						let errMsg : string = 'Invalid username/password';
						// if(error.hasownProperty('message')) {
						// 	errMsg = error.error.message;
						// }
						this.toastr.error(error.error.message, "Failed");
					}
				});

		}

	}

	private isLoginObjectValid() {
		let errors: string[] = [];

		if (!this.user.username) {
			errors.push("Provide username");
		}
		if (!this.user.password) {
			errors.push("Provide password");
		}

		if (errors.length > 0) {
			let errMsg = errors.join('<br>');
			this.toastr.error(errMsg);
			return false;
		}
		return true;
	}

	ngOnDestroy() {
		// this.subscription.unsubscribe();
	}

}
