import { AuthService, Roles } from 'shared/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { HttpCommonService } from 'src/app/Modules/Common/http-common.service';

@Component({
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


    public VLifecycleWorkloadSummaryDto: any;

    constructor(private authService: AuthService ,private service: HttpCommonService) { }

    ngOnInit(): void {
    
    this.GetRequest();
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



    private GetRequest() {

        this.service.Get('/EmailReport/GetLifecycleWorkloadSummary').subscribe((res: any) => {
          this.VLifecycleWorkloadSummaryDto = res;
          console.log("Helo" +res.LifecycleName)
        },
          (err: any) => {
            console.log(err);
          })
    
      }
    










}
