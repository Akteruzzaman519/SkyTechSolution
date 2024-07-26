import { AuthService, Roles } from 'shared/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { HttpCommonService } from 'src/app/Modules/Common/http-common.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  public VLifecycleWorkloadSummaryDto: any;

  public lifeCycleColor: LifeCycleColor[] = [
    { border: 'border-primary', background: 'bg-primary', color1: "text-primary", color2: "text-white" },
    { border: 'border-success', background: 'bg-success', color1: "text-success", color2: "text-white" },
    { border: 'border-danger', background: 'bg-danger', color1: "text-danger", color2: "text-white" },
    { border: 'border-warning', background: 'bg-warning', color1: "text-warning", color2: "text-white" },
    { border: 'border-info', background: 'bg-info', color1: "text-info", color2: "text-white" },
    { border: 'border-primary', background: 'bg-primary', color1: "text-primary", color2: "text-white" },
    { border: 'border-success', background: 'bg-success', color1: "text-success", color2: "text-white" },
    { border: 'border-danger', background: 'bg-danger', color1: "text-danger", color2: "text-white" },
    { border: 'border-warning', background: 'bg-warning', color1: "text-warning", color2: "text-white" },
    { border: 'border-info', background: 'bg-info', color1: "text-info", color2: "text-white" },
    { border: 'border-primary', background: 'bg-primary', color1: "text-primary", color2: "text-white" },
    { border: 'border-success', background: 'bg-success', color1: "text-success", color2: "text-white" },
    { border: 'border-danger', background: 'bg-danger', color1: "text-danger", color2: "text-white" },
    { border: 'border-warning', background: 'bg-warning', color1: "text-warning", color2: "text-white" },
    { border: 'border-info', background: 'bg-info', color1: "text-info", color2: "text-white" },
    { border: 'border-primary', background: 'bg-primary', color1: "text-primary", color2: "text-white" },
    { border: 'border-success', background: 'bg-success', color1: "text-success", color2: "text-white" },
    { border: 'border-danger', background: 'bg-danger', color1: "text-danger", color2: "text-white" },
    { border: 'border-warning', background: 'bg-warning', color1: "text-warning", color2: "text-white" },
    { border: 'border-info', background: 'bg-info', color1: "text-info", color2: "text-white" },
  ];
  constructor(private authService: AuthService, private service: HttpCommonService) { }

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
    if (user) {
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
      console.log("Helo" + res.LifecycleName)
    },
      (err: any) => {
        console.log(err);
      })

  }











}

export class LifeCycleColor {

  constructor() {
    this.border = "";
    this.background = "";
    this.color1 = "";
    this.color2 = "";

  }
  public border: string;
  public background: string;
  public color1: string;
  public color2: string;
}
