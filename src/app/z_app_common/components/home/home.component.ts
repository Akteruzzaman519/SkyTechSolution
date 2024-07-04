import { AuthService, Roles } from 'shared/auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    constructor(private authService: AuthService) { }

    ngOnInit(): void {
      this.authService.isLoggedIn
        .subscribe(state => {
          if (state) {
            console.log(state)
            this.redirectToRoleBasedUrl();
          }
        }).unsubscribe();
    }

    private redirectToRoleBasedUrl() {
        const user = this.authService.currentUser;
        if(user) {
            switch (user.role) {
                case Roles.cwh:
                    console.log("CWH")
                    break;
                case Roles.hub:
                    console.log("Hub")
                    break;
                case Roles.merchant:
                    console.log("Merchant")
                    break;
                case Roles.hub_user:
                    console.log("Hub User")
                    break;
                default:
                    break;
            }
        }
    }



}
