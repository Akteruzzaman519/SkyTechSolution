import { Component, OnInit } from '@angular/core';
import { AGGridHelper } from '../../Common/AGGridHelper';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { GridApi, ColDef, ValueFormatterParams, GridReadyEvent } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { EmailGridDto } from 'src/app/Models/EmailGridDto';
import { HttpCommonService } from '../../Common/http-common.service';
import { KeyValueDto } from 'src/app/Models/KeyValueDto';

@Component({
  selector: 'app-assign-to-preferred-module',
  templateUrl: './assign-to-preferred-module.component.html',
  styleUrls: ['./assign-to-preferred-module.component.css']
})
export class AssignToPreferredModuleComponent implements OnInit {


  private asignToAgentGridApi!: GridApi;
  private confirmToAgentGridApi!: GridApi;
  public paginationPageSize = 20;
  public DeafultCol = AGGridHelper.DeafultCol;
  public totalRecord = 0;
  public statusTag: any = "";

  public oEmailGridDto = new EmailGridDto();


  public indicatorName: string = "sequence";
  public searchType: string = "byEmail";
  public relatedModule: string = "back_office";
  public moduleType: string = "";
  public selectModuleType: string = "";
  public emailSearch: string = "";

  public KeyValueInStringDtoList: any[] = []
  public KeyValueInStringList: any[] = []

  // Column Definitions: Defines the columns to be displayed.
  public colDefs: ColDef[] = [
    { valueGetter: "node.rowIndex + 1", headerName: 'SL', width: 100, editable: false, checkboxSelection: true, headerCheckboxSelection: true, },
    { field: 'mailUserName', headerName: 'Email' },
    { field: 'lifecycleName', headerName: 'Name' },
  ];

  public colDefsConfirmAssign: ColDef[] = [
    { valueGetter: "node.rowIndex + 1", headerName: 'SL', width: 100, editable: false, checkboxSelection: false, headerCheckboxSelection: false, showDisabledCheckboxes: false, },
    { field: 'userFullName', headerName: 'Full Name' },
    { field: 'countPendingCurrentTask', headerName: 'Pending Current Task' },
    { field: 'countPendingAllTask', headerName: 'Pending All Task' },
  ];
  constructor(private service: HttpCommonService, private toast: ToastrService,
    private datePipe: DatePipe,
    private route: ActivatedRoute, private router: Router) {
    this.route.url.subscribe(urlSegments => {
      this.statusTag = urlSegments[urlSegments.length - 1];
    });
  }
  ngOnInit(): void {
    this.GetLifecyclesDropdown();
  }


  onGridReadyAsignToAgent(params: GridReadyEvent) {
    params.api.sizeColumnsToFit();
    this.asignToAgentGridApi = params.api;
    this.asignToAgentGridApi.setRowData([]);
  }
  onGridReadyConfirmToAgent(params: GridReadyEvent) {
    params.api.sizeColumnsToFit();
    this.confirmToAgentGridApi = params.api;
    this.confirmToAgentGridApi.setRowData([]);
  }

  onSelectionChanged(event: GridReadyEvent) {
    const selectedRows = AGGridHelper.GetSelectedRows(this.asignToAgentGridApi);
    this.totalRecord = selectedRows.length;
  }

  IndicatorNameChange(event: any) {
    this.GetLifecycles()
  }

  private GetLifecyclesDropdown() {
    this.service.Get('/EmailReport/GetLifecycles/' + this.indicatorName + '/' + this.relatedModule).subscribe((res: any) => {
      this.KeyValueInStringList = res;
    },
      (err: any) => {
        console.log(err);
      })
  }


  private GetLifecycles() {
    this.service.Get('/EmailReport/GetLifecycles/' + this.indicatorName + '/' + this.relatedModule).subscribe((res: any) => {
      this.KeyValueInStringDtoList = res;
    },
      (err: any) => {
        console.log(err);
      })
  }

  GetData() {

    let url = "";
    if (this.searchType == "byEmail") {

      url = "/EmailReport/GetMailBySearch/mail?search=" + this.emailSearch;
    } else if (this.searchType == "byModule") {
      if(this.moduleType==""){
        this.toast.warning("Please select module", "Warning", { progressBar: true });
        return;
      }
      url = "/EmailOperation/GetEmailsByStatusTag/"+this.moduleType+"/0/1/100000";
    }
    else {
      return;
    }

    this.service.Get(url).subscribe((res: any) => {
      debugger

      if (this.searchType == "byModule"){
        this.asignToAgentGridApi.setRowData(res.emailList);

      }

      if (this.searchType == "byEmail"){
        this.asignToAgentGridApi.setRowData(res);
      }

    },
      (err: any) => {
        console.log(err);
      })

  }




  public AssignToAgent() {

    if(this.selectModuleType==""){
      this.toast.warning("Please select an item!!", "Warning", { progressBar: true });
      return;
    }
    var data = AGGridHelper.GetSelectedRows(this.asignToAgentGridApi);
    if (data.length == 0) {
      this.toast.warning("Please select an item!!", "Warning", { progressBar: true });
      return;
    }
    this.GetUsersCurrentWorkloadCount();
    document.getElementById("modalOpen")?.click();

  }

  private GetUsersCurrentWorkloadCount() {
    this.confirmToAgentGridApi.setRowData([]);
    this.service.Get('/EmailOperation/GetUsersCurrentWorkloadCount/' + this.selectModuleType + '/mail_agent').subscribe((res: any) => {
      this.confirmToAgentGridApi.setRowData(res);
    },
      (err: any) => {
        console.log(err);
      })

  }


  public ConfirmAssign() {

    let selectedAgent = AGGridHelper.GetSelectedRow(this.confirmToAgentGridApi);
    if (selectedAgent == null) {
      this.toast.warning("Please select  agent!!", "Warning", { progressBar: true });
      return;
    }
    this.AssignEmailOperation(Number(selectedAgent.userSystemId));

  }

  private AssignEmailOperation(assignedTo: number) {

    let payload: number[] = [];
    var getSelectedRow = AGGridHelper.GetSelectedRows(this.asignToAgentGridApi);
    getSelectedRow.forEach((element: any) => {
      payload.push(element.mailSystemId)
    })
    this.service.Post('/EmailOperation/AssignEmailOperation/' + this.statusTag + '/' + assignedTo, payload, true).subscribe((res: any) => {
      this.toast.success("Agent Email Assign Successfully!!", "success", { progressBar: true });
      document.getElementById("assignToAgentCloseModal")?.click();
      this.totalRecord = 0;
      this.GetData();

    },
      (err: any) => {
        console.log(err);
      })

  }
}