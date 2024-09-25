import { AuthService, Roles } from 'shared/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { HttpCommonService } from 'src/app/Modules/Common/http-common.service';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { AGGridHelper } from 'src/app/Modules/Common/AGGridHelper';

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

  private AgentstGridApi!: GridApi;
  private ActivityReportGridApi!: GridApi;
  public paginationPageSize = 20;
  public DeafultCol = AGGridHelper.DeafultCol;
  public KeyValueInStringList: any[] = [];
  public selectModuleType: string = "";
  constructor(private authService: AuthService, private service: HttpCommonService) { }

  ngOnInit(): void {

    this.GetLifecycleWorkloadSummary();
    this.GetLifecyclesDropdown();
    this.authService.isLoggedIn
      .subscribe(state => {
        if (state) {
          console.log(state)
          this.redirectToRoleBasedUrl();
        }
      }).unsubscribe();
  }

  public colDefsAgents: ColDef[] = [
    { valueGetter: "node.rowIndex + 1", headerName: 'SL', width: 100, editable: false, checkboxSelection: false, headerCheckboxSelection: false, showDisabledCheckboxes: false, },
    { field: 'userFullName', headerName: 'Full Name' },
    { field: 'countPendingCurrentTask', headerName: 'Pending Current Task' },
    { field: 'countPendingAllTask', headerName: 'Pending All Task' },
  ];
  public colDefsActivityReport: ColDef[] = [
    { valueGetter: "node.rowIndex + 1", headerName: 'SL', width: 100, editable: false, checkboxSelection: false, headerCheckboxSelection: false, showDisabledCheckboxes: false, },
    { field: 'userFullName', headerName: 'Full Name' },
    { field: 'countPendingCurrentTask', headerName: 'Pending Current Task' },
    { field: 'countPendingAllTask', headerName: 'Pending All Task' },
  ];



  onGridReadyAgents(params: GridReadyEvent) {
    params.api.sizeColumnsToFit();
    this.AgentstGridApi = params.api;
    this.AgentstGridApi.setRowData([]);
  }
  onGridReadyActivityReport(params: GridReadyEvent) {
    params.api.sizeColumnsToFit();
    this.ActivityReportGridApi = params.api;
    this.ActivityReportGridApi.setRowData([]);
  }
  public moduleTypeSelectionChange() {
    this.GetUsersCurrentWorkloadCount();
  }
  private GetUsersCurrentWorkloadCount() {
    this.AgentstGridApi.setRowData([]);
    this.service.Get('/EmailOperation/GetUsersCurrentWorkloadCount/' + this.selectModuleType + '/mail_agent').subscribe((res: any) => {
      this.AgentstGridApi.setRowData(res);
    },
      (err: any) => {
        console.log(err);
      })

  }

  private GetLifecyclesDropdown() {
    this.service.Get('/EmailReport/GetLifecycles/sequence/back_office').subscribe((res: any) => {
      this.KeyValueInStringList = res;
      if (this.KeyValueInStringList.length > 0) {
        this.selectModuleType = this.KeyValueInStringList[0].key;
        this.GetUsersCurrentWorkloadCount();
      }
    },
      (err: any) => {
        console.log(err);
      })
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



  private GetLifecycleWorkloadSummary() {
    this.service.Get('/EmailReport/GetLifecycleWorkloadSummary').subscribe((res: any) => {
      this.VLifecycleWorkloadSummaryDto = res;
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
